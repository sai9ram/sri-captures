export interface SiteFooterProps {
  currentPage: "home" | "story" | "services" | "gallery" | "contact" | "quote";
  onNavigateHome: () => void;
  onNavigateStory: () => void;
  onNavigateServices: () => void;
  onNavigateGallery: () => void;
  onNavigateContact: () => void;
  onNavigateQuote: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export default function SiteFooter({
  currentPage,
  onNavigateHome,
  onNavigateStory,
  onNavigateServices,
  onNavigateGallery,
  onNavigateContact,
  onNavigateQuote,
  onNavigateSection,
}: SiteFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="album-footer" role="contentinfo" aria-label="Sri Captures Footer">
      <div className="album-footer__border" aria-hidden="true" />

      <svg className="footer-flower" viewBox="0 0 220 150" aria-hidden="true">
        <path d="M110 145C108 103 111 69 111 29M111 70C80 67 62 49 53 29C78 27 101 40 111 62M111 88C139 83 158 65 168 43C142 43 121 56 111 79M111 39C99 28 98 12 110 4C123 13 123 28 111 39Z" />
      </svg>

      <div className="album-footer__logo-wrap">
        <img
          src="/images/Sricaptures Logo .jpg"
          alt="Sri Captures Logo"
          className="album-footer__logo"
        />
      </div>

      <h2>
        Love. People. Moments. <em>Forever.</em>
      </h2>

      <nav className="social-links" aria-label="Social links">
        <a
          href="https://instagram.com/sri_capture9?srtk=MW5ndWRmeDF5dW85bw%3D%3D&utm_source=qr"
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>
        <a
          href="https://wa.me/918142490545"
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp
        </a>
        <a href="tel:+918142490545">
          +91 81424 90545
        </a>
        <a href="mailto:sricapture929@gmail.com">
          sricapture929@gmail.com
        </a>
      </nav>

      <nav className="footer-nav" aria-label="Footer navigation">
        <button
          className={currentPage === "home" ? "is-active" : ""}
          onClick={onNavigateHome}
        >
          Home
        </button>
        <button
          className={currentPage === "story" ? "is-active" : ""}
          onClick={onNavigateStory}
        >
          Our Story
        </button>
        <button onClick={onNavigateServices} className={currentPage === "services" ? "is-active" : ""}>Services</button>
        <button onClick={onNavigateGallery} className={currentPage === "gallery" ? "is-active" : ""}>Gallery</button>
        <button onClick={onNavigateContact} className={currentPage === "contact" ? "is-active" : ""}>Contact</button>
        <button onClick={onNavigateQuote} className={currentPage === "quote" ? "is-active" : ""}>Get a Quote</button>
      </nav>

      <p className="album-footer__closing">Until the next story...</p>

      <button
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to the beginning"
      >
        ↑ Back to the beginning
      </button>

      <p className="album-footer__legal">
        © {currentYear} Sri Captures — All stories reserved
      </p>
    </footer>
  );
}
