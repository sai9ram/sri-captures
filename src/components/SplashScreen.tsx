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

  // Default to sound active (auto play sound)
  const [isMuted, setIsMuted] = useState(false);
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

  // Dismiss handler
  const dismissSplash = () => {
    if (hasDismissedRef.current) return;
    hasDismissedRef.current = true;
    setIsExiting(true);

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

  // Autoplay with SOUND attempt
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Configure for unmuted audio autoplay
    video.muted = false;
    video.volume = 1.0;

    let cleanupListeners: (() => void) | null = null;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Unmuted autoplay succeeded
          setIsMuted(false);
        })
        .catch(() => {
          // If browser policy blocks unmuted autoplay without prior gesture,
          // play muted so playback starts instantly, and immediately hook up
          // one-shot tap/click/touch anywhere to unmute audio seamlessly.
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});

          const unlockAudio = () => {
            if (video && !hasDismissedRef.current) {
              video.muted = false;
              setIsMuted(false);
            }
            if (cleanupListeners) cleanupListeners();
          };

          const handlePointer = () => unlockAudio();
          const handleTouch = () => unlockAudio();
          const handleClick = () => unlockAudio();
          const handleKey = () => unlockAudio();

          window.addEventListener("pointerdown", handlePointer, { once: true, passive: true });
          window.addEventListener("touchstart", handleTouch, { once: true, passive: true });
          window.addEventListener("click", handleClick, { once: true, passive: true });
          window.addEventListener("keydown", handleKey, { once: true, passive: true });

          cleanupListeners = () => {
            window.removeEventListener("pointerdown", handlePointer);
            window.removeEventListener("touchstart", handleTouch);
            window.removeEventListener("click", handleClick);
            window.removeEventListener("keydown", handleKey);
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
    if (video && video.duration) {
      const pct = (video.currentTime / video.duration) * 100;
      setProgress(pct);
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      const newMuted = !video.muted;
      video.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  // Clicking anywhere on splash screen unlocks sound if muted
  const handleContainerClick = () => {
    const video = videoRef.current;
    if (video && video.muted) {
      video.muted = false;
      setIsMuted(false);
    }
  };

  const videoSrc = isMobile
    ? "/videos/mobile-splash.mp4"
    : "/videos/desktop-splash.mp4";

  return (
    <aside
      className={`splash-screen ${isExiting ? "splash-screen--exiting" : ""}`}
      role="region"
      aria-label="Welcome splash screen video"
      onClick={handleContainerClick}
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

      {/* Top Controls Header */}
      <div className="splash-screen__controls">
        <button
          type="button"
          onClick={toggleSound}
          className={`splash-screen__btn splash-screen__btn--sound ${
            isMuted ? "splash-screen__btn--pulse" : ""
          }`}
          aria-label={isMuted ? "Unmute splash audio" : "Mute splash audio"}
        >
          {isMuted ? (
            <>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
              <span>Tap for Sound</span>
            </>
          ) : (
            <>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
              <span>Sound Auto On</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            dismissSplash();
          }}
          className="splash-screen__btn splash-screen__btn--skip"
          aria-label="Skip splash screen"
        >
          <span>Skip Intro</span>
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
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Elegant Hairline Progress Bar */}
      <div className="splash-screen__progress-track" aria-hidden="true">
        <div
          className="splash-screen__progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>
    </aside>
  );
}
