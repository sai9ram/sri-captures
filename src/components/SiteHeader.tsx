import { useState, useEffect } from "react";

export interface SiteHeaderProps {
  currentPage: "home" | "story";
  onNavigateHome: () => void;
  onNavigateStory: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenInquire: () => void;
}

export default function SiteHeader({
  currentPage,
  onNavigateHome,
  onNavigateStory,
  onNavigateSection,
  onOpenInquire,
}: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleWordmarkClick = () => {
    if (currentPage === "story") {
      onNavigateHome();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const handleNavClick = (action: () => void) => {
    action();
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`universal-header universal-header--${currentPage} ${
          isScrolled ? "is-scrolled" : ""
        }`}
        role="banner"
      >
        <div className="universal-header__inner">
          {/* Brand Wordmark (Consistent across all pages) */}
          <button
            className="universal-wordmark"
            onClick={handleWordmarkClick}
            aria-label="SRI CAPTURES - Return to home"
          >
            <span className="universal-wordmark__main">SRI</span>
            <span className="universal-wordmark__sub">CAPTURES</span>
          </button>

          {/* Desktop & Tablet Navigation */}
          <nav className="universal-nav" aria-label="Main Navigation">
            <button
              className={`universal-nav__item ${
                currentPage === "home" ? "is-active" : ""
              }`}
              onClick={() => handleNavClick(onNavigateHome)}
            >
              Home
            </button>
            <button
              className={`universal-nav__item ${
                currentPage === "story" ? "is-active" : ""
              }`}
              onClick={() => handleNavClick(onNavigateStory)}
            >
              Our Story
            </button>
            <button
              className="universal-nav__item"
              onClick={() => handleNavClick(() => onNavigateSection("services"))}
            >
              Services
            </button>
            <button
              className="universal-nav__item"
              onClick={() => handleNavClick(() => onNavigateSection("gallery"))}
            >
              Gallery
            </button>
            <button
              className="universal-nav__item"
              onClick={() => handleNavClick(() => onNavigateSection("contact"))}
            >
              Contact
            </button>
          </nav>

          {/* Right Header Actions */}
          <div className="universal-header__actions">
            <button
              className="universal-inquire-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquire();
              }}
              aria-label="Begin your wedding inquiry"
            >
              <span>Inquire</span>
              <span className="universal-inquire-btn__arrow" aria-hidden="true">
                ↗
              </span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              className={`universal-menu-toggle ${
                mobileMenuOpen ? "is-open" : ""
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Universal Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className={`universal-mobile-menu universal-mobile-menu--${currentPage}`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div className="universal-mobile-menu__backdrop" onClick={() => setMobileMenuOpen(false)} />
          <div className="universal-mobile-menu__panel">
            <div className="universal-mobile-menu__header">
              <span className="universal-mobile-menu__brand">SRI CAPTURES</span>
              <button
                className="universal-mobile-menu__close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <nav className="universal-mobile-menu__nav">
              {[
                { label: "Home", action: onNavigateHome, active: currentPage === "home" },
                { label: "Our Story", action: onNavigateStory, active: currentPage === "story" },
                { label: "Services", action: () => onNavigateSection("services") },
                { label: "Gallery", action: () => onNavigateSection("gallery") },
                { label: "Contact", action: () => onNavigateSection("contact") },
              ].map((item, idx) => (
                <button
                  key={item.label}
                  className={`universal-mobile-menu__link ${
                    item.active ? "is-active" : ""
                  }`}
                  onClick={() => handleNavClick(item.action)}
                >
                  <small>0{idx + 1}</small>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="universal-mobile-menu__footer">
              <button
                className="universal-mobile-menu__cta"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquire();
                }}
              >
                Begin Your Story <span>↗</span>
              </button>
              <p className="universal-mobile-menu__note">
                Wedding stories · India &amp; Worldwide
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
