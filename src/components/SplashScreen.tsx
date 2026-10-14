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

  // Dismiss handler
  const dismissSplash = () => {
    if (hasDismissedRef.current) return;
    hasDismissedRef.current = true;
    setIsExiting(true);

    const video = videoRef.current;
    if (video) {
      try {
        const startVol = video.volume;
        const fadeInterval = setInterval(() => {
          if (video.volume > 0.1) {
            video.volume = Math.max(0, video.volume - 0.2);
          } else {
            video.volume = 0;
            clearInterval(fadeInterval);
          }
        }, 50);
      } catch {
        // Ignore
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

  // Helper to unmute cleanly
  const unmuteAudio = () => {
    const video = videoRef.current;
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

  // Autoplay & Sound logic
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 1. Try unmuted auto-play first
    video.muted = false;
    video.volume = 1.0;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Unmuted autoplay succeeded! Music is playing.
          video.muted = false;
          video.volume = 1.0;
        })
        .catch(() => {
          // Browser autoplay policy required muted start:
          // Immediately start video muted so visuals never hitch
          video.muted = true;
          video.play().catch(() => {});
        });
    }

    // 2. Unmute on ANY user gesture (tap, touch, click, scroll, key)
    const handleGesture = () => {
      unmuteAudio();
    };

    window.addEventListener("pointerdown", handleGesture, { passive: true, capture: true });
    window.addEventListener("touchstart", handleGesture, { passive: true, capture: true });
    window.addEventListener("click", handleGesture, { passive: true, capture: true });
    window.addEventListener("keydown", handleGesture, { passive: true, capture: true });
    window.addEventListener("wheel", handleGesture, { passive: true, capture: true });

    // Safety timeout: 7.5s for desktop, 5.5s for mobile
    const maxDuration = isMobile ? 5500 : 7500;
    const safetyTimer = setTimeout(() => {
      dismissSplash();
    }, maxDuration);

    return () => {
      clearTimeout(safetyTimer);
      window.removeEventListener("pointerdown", handleGesture, { capture: true });
      window.removeEventListener("touchstart", handleGesture, { capture: true });
      window.removeEventListener("click", handleGesture, { capture: true });
      window.removeEventListener("keydown", handleGesture, { capture: true });
      window.removeEventListener("wheel", handleGesture, { capture: true });
    };
  }, [isMobile]);

  // Update progress bar without causing React re-renders (prevents React from re-muting DOM)
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
      onClick={unmuteAudio}
      onTouchStart={unmuteAudio}
      onPointerDown={unmuteAudio}
    >
      <div className="splash-screen__video-wrapper">
        <video
          ref={videoRef}
          key={videoSrc}
          className="splash-screen__video"
          src={videoSrc}
          autoPlay
          defaultMuted={false}
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

      {/* Delicate Gold Hairline Progress Bar (Direct DOM update - zero re-renders) */}
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
