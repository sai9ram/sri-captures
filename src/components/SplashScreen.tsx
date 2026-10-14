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

  const [hasStarted, setHasStarted] = useState(false);
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

  // Lock body scroll
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Dismiss handler
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

  // User activates experience with 100% volume audio
  const startExperience = () => {
    setHasStarted(true);
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      try {
        video.volume = 1.0;
      } catch {
        // iOS volume guard
      }
      video.currentTime = 0;
      video.play().catch(() => {
        // Fallback if needed
        video.muted = true;
        video.play().catch(() => {});
      });
    }

    // Safety timeout once video starts: 7.5s for desktop, 5.5s for mobile
    const maxDuration = isMobile ? 5500 : 7500;
    setTimeout(() => {
      dismissSplash();
    }, maxDuration);
  };

  // Progress update without React re-renders
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
      {/* Background Video Player */}
      <div
        className={`splash-screen__video-wrapper ${
          hasStarted ? "splash-screen__video-wrapper--active" : ""
        }`}
      >
        <video
          ref={videoRef}
          key={videoSrc}
          className="splash-screen__video"
          src={videoSrc}
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onEnded={dismissSplash}
        />
      </div>

      {/* Cinematic Vignette */}
      <div className="splash-screen__vignette" aria-hidden="true" />

      {/* Option 2: Luxury "Enter Experience" Cover Curtain */}
      {!hasStarted && (
        <div className="splash-cover" onClick={startExperience}>
          <div className="splash-cover__content">
            <div className="splash-cover__emblem-wrap">
              <img
                src="/images/Sricaptures Logo .jpg"
                alt="Sri Captures Logo"
                className="splash-cover__emblem"
              />
            </div>

            <div className="splash-cover__titles">
              <span className="splash-cover__eyebrow">Sri Captures Cinema</span>
              <h1 className="splash-cover__headline">Cinematic Wedding Stories</h1>
              <p className="splash-cover__subtitle">Every moment. Every emotion. Captured forever.</p>
            </div>

            <div className="splash-cover__actions">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  startExperience();
                }}
                className="splash-cover__btn-enter"
                aria-label="Enter cinematic experience with sound"
              >
                <span className="splash-cover__btn-spark">✦</span>
                <span>Enter Experience</span>
                <span className="splash-cover__btn-audio">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                  Sound 100%
                </span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  dismissSplash();
                }}
                className="splash-cover__link-skip"
                aria-label="Skip intro and go directly to website"
              >
                Skip to Website →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Header with Brand Tag & Skip Button (Visible during video playback) */}
      {hasStarted && (
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
      )}

      {/* Hairline Gold Progress Bar */}
      {hasStarted && (
        <div className="splash-screen__progress-track" aria-hidden="true">
          <div
            ref={progressBarRef}
            className="splash-screen__progress-bar"
            style={{ width: "0%" }}
          />
        </div>
      )}
    </aside>
  );
}
