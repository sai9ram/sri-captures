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

  const [isEntered, setIsEntered] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const hasDismissedRef = useRef(false);

  // Check device viewport
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

  // Smooth audio fade helpers
  const fadeInAudio = (video: HTMLVideoElement, durationMs = 800) => {
    video.muted = false;
    video.volume = 0;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(elapsed / durationMs, 1);
      video.volume = pct;
      if (pct < 1 && !hasDismissedRef.current) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  const fadeOutAudio = (video: HTMLVideoElement, durationMs = 600) => {
    const startVolume = video.volume;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(elapsed / durationMs, 1);
      video.volume = Math.max(0, startVolume * (1 - pct));
      if (pct < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  // Smooth dismiss handler with audio fadeout
  const dismissSplash = () => {
    if (hasDismissedRef.current) return;
    hasDismissedRef.current = true;
    setIsExiting(true);

    const video = videoRef.current;
    if (video) {
      fadeOutAudio(video, 600);
    }

    setTimeout(() => {
      document.body.style.overflow = "";
      if (onComplete) onComplete();
    }, 750);
  };

  // Lock body scroll during splash
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Trigger smooth entrance on mount
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setIsEntered(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // Automatic unmuted playback with smooth audio fade
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cleanupListeners: (() => void) | null = null;

    // Attempt direct unmuted playback first
    video.muted = false;
    video.volume = 0;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Direct unmuted autoplay succeeded: smoothly ramp up volume
          fadeInAudio(video, 800);
        })
        .catch(() => {
          // Browser strict policy blocked immediate unmuted play:
          // Start video muted instantly so the visual presentation never lags
          video.muted = true;
          video.play().catch(() => {});

          // Unlock sound automatically on the very first micro-interaction
          const unlockSound = () => {
            if (video && !hasDismissedRef.current) {
              fadeInAudio(video, 600);
            }
            if (cleanupListeners) cleanupListeners();
          };

          window.addEventListener("pointerdown", unlockSound, { once: true, passive: true });
          window.addEventListener("touchstart", unlockSound, { once: true, passive: true });
          window.addEventListener("click", unlockSound, { once: true, passive: true });
          window.addEventListener("wheel", unlockSound, { once: true, passive: true });
          window.addEventListener("keydown", unlockSound, { once: true, passive: true });

          cleanupListeners = () => {
            window.removeEventListener("pointerdown", unlockSound);
            window.removeEventListener("touchstart", unlockSound);
            window.removeEventListener("click", unlockSound);
            window.removeEventListener("wheel", unlockSound);
            window.removeEventListener("keydown", unlockSound);
          };
        });
    }

    // Safety fallback timeout
    const safetyTimer = setTimeout(() => {
      dismissSplash();
    }, 8500);

    return () => {
      clearTimeout(safetyTimer);
      if (cleanupListeners) cleanupListeners();
    };
  }, [isMobile]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const pct = (video.currentTime / video.duration) * 100;
    setProgress(pct);

    // Smoothly initiate crossfade 0.6s before video ends to avoid sudden cut
    if (video.duration > 1 && video.currentTime >= video.duration - 0.6) {
      dismissSplash();
    }
  };

  const videoSrc = isMobile
    ? "/videos/mobile-splash.mp4"
    : "/videos/desktop-splash.mp4";

  return (
    <aside
      className={`splash-screen ${isEntered ? "splash-screen--entered" : ""} ${
        isExiting ? "splash-screen--exiting" : ""
      }`}
      role="region"
      aria-label="Welcome cinematic splash screen"
      onClick={() => {
        // Tapping screen automatically ensures sound is active with smooth fade
        const video = videoRef.current;
        if (video && video.muted) {
          fadeInAudio(video, 500);
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
          muted={false}
          playsInline
          // @ts-expect-error webkit-playsinline for iOS Safari
          webkit-playsinline="true"
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onEnded={dismissSplash}
          onError={dismissSplash}
        >
          <source
            src={
              isMobile
                ? "/videos/mobile-splash.mp4"
                : "/videos/desktop-splash.mp4"
            }
            type="video/mp4"
          />
        </video>
      </div>

      {/* Cinematic Vignette Overlay */}
      <div className="splash-screen__vignette" aria-hidden="true" />

      {/* Top Header with Discreet Skip Button */}
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
