import { useEffect, useRef, useState } from "react";

interface SplashScreenProps {
  onComplete?: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const hasDismissedRef = useRef(false);

  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return (
        window.innerWidth <= 768 ||
        (window.matchMedia("(max-width: 768px)").matches &&
          window.innerHeight > window.innerWidth)
      );
    }
    return false;
  });

  const [isExiting, setIsExiting] = useState(false);

  // Device check
  useEffect(() => {
    const handleResize = () => {
      const mobileCheck =
        window.innerWidth <= 768 ||
        (window.matchMedia("(max-width: 768px)").matches &&
          window.innerHeight > window.innerWidth);
      setIsMobile(mobileCheck);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  // Smooth dismiss handler with audio fadeout
  const dismissSplash = () => {
    if (hasDismissedRef.current) return;
    hasDismissedRef.current = true;
    setIsExiting(true);

    const video = videoRef.current;
    if (video) {
      try {
        const fadeInterval = setInterval(() => {
          if (video.volume > 0.15) {
            video.volume = Math.max(0, video.volume - 0.2);
          } else {
            video.volume = 0;
            clearInterval(fadeInterval);
          }
        }, 50);
      } catch {
        // Ignore iOS volume read-only restrictions
      }
    }

    setTimeout(() => {
      document.body.style.overflow = "";
      if (onComplete) onComplete();
    }, 700);
  };

  // Lock body scroll
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Clean, automatic 100% volume playback in both mobile and desktop
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Automatic unmute with 100% volume
    video.muted = false;
    try {
      video.volume = 1.0;
    } catch {
      // iOS volume guard
    }

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Playing with sound at 100% volume
          video.muted = false;
        })
        .catch(() => {
          // If browser blocks unmuted cold-start, start video and auto-unmute on any passive interaction
          video.muted = true;
          video.play().catch(() => {});

          const autoUnmute = () => {
            if (video && !hasDismissedRef.current) {
              video.muted = false;
              try {
                video.volume = 1.0;
              } catch {
                // iOS volume guard
              }
              if (video.paused) {
                video.play().catch(() => {});
              }
            }
          };

          window.addEventListener("mousemove", autoUnmute, { once: true, passive: true });
          window.addEventListener("pointerdown", autoUnmute, { once: true, passive: true });
          window.addEventListener("touchstart", autoUnmute, { once: true, passive: true });
          window.addEventListener("click", autoUnmute, { once: true, passive: true });
          window.addEventListener("scroll", autoUnmute, { once: true, passive: true });
          window.addEventListener("wheel", autoUnmute, { once: true, passive: true });
          window.addEventListener("keydown", autoUnmute, { once: true, passive: true });
        });
    }

    // Safety timeout: 7.5s for desktop, 5.5s for mobile
    const maxDuration = isMobile ? 5500 : 7500;
    const safetyTimer = setTimeout(() => {
      dismissSplash();
    }, maxDuration);

    return () => {
      clearTimeout(safetyTimer);
    };
  }, [isMobile]);

  // Update progress bar without causing React re-renders
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    if (progressBarRef.current) {
      const pct = (video.currentTime / video.duration) * 100;
      progressBarRef.current.style.width = `${pct}%`;
    }

    // Crossfade 0.5s before end
    if (video.duration > 1 && video.currentTime >= video.duration - 0.5) {
      dismissSplash();
    }
  };

  const videoSrc = isMobile
    ? "/videos/mobile-splash.mp4"
    : "/videos/desktop-splash.mp4";

  return (
    <aside
      className={`splash-screen ${isExiting ? "splash-screen--exiting" : ""}`}
      role="region"
      aria-label="Welcome cinematic splash screen"
    >
      <div className="splash-screen__video-wrapper">
        <video
          ref={videoRef}
          key={videoSrc}
          className="splash-screen__video"
          src={videoSrc}
          autoPlay
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onEnded={dismissSplash}
        />
      </div>

      {/* Cinematic Vignette */}
      <div className="splash-screen__vignette" aria-hidden="true" />

      {/* Top Header with Brand Tag & Skip Button */}
      <div className="splash-screen__controls">
        <div className="splash-screen__brand">
          <span className="splash-screen__brand-tag">Sri Captures</span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            dismissSplash();
          }}
          className="splash-screen__btn splash-screen__btn--skip"
          aria-label="Skip splash screen"
        >
          <span>Skip</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Hairline Gold Progress Bar */}
      <div className="splash-screen__progress-track" aria-hidden="true">
        <div
          ref={progressBarRef}
          className="splash-screen__progress-bar"
          style={{ width: "0%" }}
        />
      </div>
    </aside>
  );
}
