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
        // iOS volume guard
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

  // Automatic 100% Volume Unmute Helper
  const autoUnmute100 = () => {
    const video = videoRef.current;
    if (!video || hasDismissedRef.current) return;

    try {
      video.muted = false;
      try {
        video.volume = 1.0;
      } catch {
        // iOS read-only volume handled safely
      }
      if (video.paused) {
        video.play().catch(() => {});
      }
    } catch {
      // Ignore
    }
  };

  // Automatic Audio & Video Playback (Without Manual Tap Options)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 1. Initial attempt: auto unmuted with 100% volume
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
          // Unmuted 100% audio started automatically!
          video.muted = false;
          try {
            video.volume = 1.0;
          } catch {}
        })
        .catch(() => {
          // If browser policy temporarily pauses unmuted start:
          // Start video visual immediately
          video.muted = true;
          video.play().catch(() => {});

          // Automatically retry unmuting at 100% volume
          const interval = setInterval(() => {
            if (video && !hasDismissedRef.current) {
              autoUnmute100();
              if (!video.muted) {
                clearInterval(interval);
              }
            }
          }, 350);

          setTimeout(() => clearInterval(interval), 4000);
        });
    }

    // 2. Automatically unmute at 100% volume on any background ambient event (no buttons)
    const handleAmbientEvent = () => {
      autoUnmute100();
    };

    window.addEventListener("pointerdown", handleAmbientEvent, { passive: true, capture: true });
    window.addEventListener("touchstart", handleAmbientEvent, { passive: true, capture: true });
    window.addEventListener("pointermove", handleAmbientEvent, { passive: true, capture: true });
    window.addEventListener("mousemove", handleAmbientEvent, { passive: true, capture: true });
    window.addEventListener("click", handleAmbientEvent, { passive: true, capture: true });
    window.addEventListener("keydown", handleAmbientEvent, { passive: true, capture: true });
    window.addEventListener("wheel", handleAmbientEvent, { passive: true, capture: true });
    window.addEventListener("scroll", handleAmbientEvent, { passive: true, capture: true });

    // Safety timeout: 7.5s for desktop, 5.5s for mobile
    const maxDuration = isMobile ? 5500 : 7500;
    const safetyTimer = setTimeout(() => {
      dismissSplash();
    }, maxDuration);

    return () => {
      clearTimeout(safetyTimer);
      window.removeEventListener("pointerdown", handleAmbientEvent, { capture: true });
      window.removeEventListener("touchstart", handleAmbientEvent, { capture: true });
      window.removeEventListener("pointermove", handleAmbientEvent, { capture: true });
      window.removeEventListener("mousemove", handleAmbientEvent, { capture: true });
      window.removeEventListener("click", handleAmbientEvent, { capture: true });
      window.removeEventListener("keydown", handleAmbientEvent, { capture: true });
      window.removeEventListener("wheel", handleAmbientEvent, { capture: true });
      window.removeEventListener("scroll", handleAmbientEvent, { capture: true });
    };
  }, [isMobile]);

  // Update progress bar directly without React re-render
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
      onClick={autoUnmute100}
      onTouchStart={autoUnmute100}
      onPointerDown={autoUnmute100}
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
          ref={progressBarRef}
          className="splash-screen__progress-bar"
          style={{ width: "0%" }}
        />
      </div>
    </aside>
  );
}
