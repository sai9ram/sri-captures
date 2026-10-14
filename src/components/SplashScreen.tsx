import { useEffect, useRef, useState } from "react";

interface SplashScreenProps {
  onComplete?: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
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
  const [progress, setProgress] = useState(0);
  const hasDismissedRef = useRef(false);

  // Responsive device check
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

  // Smooth dismiss handler
  const dismissSplash = () => {
    if (hasDismissedRef.current) return;
    hasDismissedRef.current = true;
    setIsExiting(true);

    const video = videoRef.current;
    if (video) {
      try {
        // Fade out audio before removing
        const startVol = video.volume;
        const fadeInterval = setInterval(() => {
          if (video.volume > 0.1) {
            video.volume = Math.max(0, video.volume - 0.15);
          } else {
            video.volume = 0;
            clearInterval(fadeInterval);
          }
        }, 50);
      } catch {
        // Ignore audio fade errors
      }
    }

    setTimeout(() => {
      document.body.style.overflow = "";
      if (onComplete) onComplete();
    }, 700);
  };

  // Lock body scroll during splash
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Video Autoplay & Audio Management
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start with muted playback guaranteed to play on all mobile & desktop browsers
    video.muted = true;
    video.playsInline = true;

    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Video is successfully playing!
          // Attempt to unmute sound automatically:
          try {
            video.muted = false;
            video.volume = 1.0;
            if (video.paused) {
              // If unmuting caused a pause due to browser restriction, resume muted
              video.muted = true;
              video.play().catch(() => {});
            }
          } catch {
            video.muted = true;
            video.play().catch(() => {});
          }
        })
        .catch(() => {
          // Autoplay fallback retry
          video.muted = true;
          video.play().catch(() => {});
        });
    }

    // Immediate sound unlock on ANY user touch, click, or key anywhere on screen
    const unlockSound = () => {
      if (video && !hasDismissedRef.current) {
        try {
          video.muted = false;
          video.volume = 1.0;
          if (video.paused) {
            video.play().catch(() => {});
          }
        } catch {
          // Ignore
        }
      }
    };

    window.addEventListener("pointerdown", unlockSound, { passive: true });
    window.addEventListener("touchstart", unlockSound, { passive: true });
    window.addEventListener("click", unlockSound, { passive: true });
    window.addEventListener("keydown", unlockSound, { passive: true });

    // Safety timeout: 7.5s for desktop, 5.5s for mobile
    const maxDuration = isMobile ? 5500 : 7500;
    const safetyTimer = setTimeout(() => {
      dismissSplash();
    }, maxDuration);

    return () => {
      clearTimeout(safetyTimer);
      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("touchstart", unlockSound);
      window.removeEventListener("click", unlockSound);
      window.removeEventListener("keydown", unlockSound);
    };
  }, [isMobile]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const pct = (video.currentTime / video.duration) * 100;
    setProgress(pct);

    // Crossfade 0.5s before end to ensure smooth visual transition
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
      onClick={() => {
        // Unmute on direct screen tap if browser held sound
        const video = videoRef.current;
        if (video) {
          video.muted = false;
          video.volume = 1.0;
          if (video.paused) {
            video.play().catch(() => {});
          }
        }
      }}
    >
      <div className="splash-screen__video-wrapper">
        <video
          ref={videoRef}
          key={videoSrc}
          className="splash-screen__video"
          src={videoSrc}
          autoPlay
          muted
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onEnded={dismissSplash}
        />
      </div>

      {/* Cinematic Vignette Overlay */}
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

      {/* Delicate Gold Hairline Progress Bar */}
      <div className="splash-screen__progress-track" aria-hidden="true">
        <div
          className="splash-screen__progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>
    </aside>
  );
}
