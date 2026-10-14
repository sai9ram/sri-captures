import { useState, useEffect } from "react";

export interface SiteHeaderProps {
  currentPage: "home" | "story" | "services" | "gallery" | "contact" | "quote";
  onNavigateHome: () => void;
  onNavigateStory: () => void;
  onNavigateServices: () => void;
  onNavigateGallery: () => void;
  onNavigateContact: () => void;
  onNavigateQuote: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenInquire: () => void;
}

export default function SiteHeader({
  currentPage,
  onNavigateHome,
  onNavigateStory,
  onNavigateServices,
  onNavigateGallery,
  onNavigateContact,
  onNavigateQuote,
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
            <img
              src="/images/Sricaptures Logo .jpg"
              alt="Sri Captures Logo"
              className="universal-wordmark__logo"
            />
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
              className={`universal-nav__item ${
                currentPage === "services" ? "is-active" : ""
              }`}
              onClick={() => handleNavClick(onNavigateServices)}
            >
              Services
            </button>
            <button
              className={`universal-nav__item ${
                currentPage === "gallery" ? "is-active" : ""
              }`}
              onClick={() => handleNavClick(onNavigateGallery)}
            >
              Gallery
            </button>
            <button
              className={`universal-nav__item ${
                currentPage === "contact" ? "is-active" : ""
              }`}
              onClick={() => handleNavClick(onNavigateContact)}
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
                onNavigateQuote();
              }}
              aria-label="Build your wedding photography quote"
            >
              <span>Build Your Quote</span>
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
              <div className="universal-mobile-menu__brand-grp">
                <img
                  src="/images/Sricaptures Logo .jpg"
                  alt="Sri Captures Logo"
                  className="universal-mobile-menu__logo"
                />
              </div>
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
                { label: "Services", action: onNavigateServices, active: currentPage === "services" },
                { label: "Gallery", action: onNavigateGallery, active: currentPage === "gallery" },
                { label: "Contact", action: onNavigateContact, active: currentPage === "contact" },
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
                  onNavigateQuote();
                }}
              >
                Build Your Quote <span>↗</span>
              </button>
              <div className="universal-mobile-menu__direct" style={{ display: "flex", flexDirection: "column", gap: "6px", margin: "14px 0 8px", fontSize: "12px" }}>
                <a href="tel:+918142490545" style={{ color: "inherit", textDecoration: "none", opacity: 0.85 }}>
                  📞 +91 81424 90545
                </a>
                <a href="https://wa.me/918142490545" target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none", opacity: 0.85 }}>
                  💬 WhatsApp: +91 81424 90545
                </a>
                <a href="mailto:sricapture929@gmail.com" style={{ color: "inherit", textDecoration: "none", opacity: 0.85 }}>
                  ✉️ sricapture929@gmail.com
                </a>
                <a href="https://instagram.com/sri_capture9?srtk=MW5ndWRmeDF5dW85bw%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none", opacity: 0.85 }}>
                  📷 Instagram: @sri_capture9
                </a>
              </div>
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
