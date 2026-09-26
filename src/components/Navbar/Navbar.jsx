import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import "./Navbar.css";


/* =========================================================
   LOGO
========================================================= */

const logoUrl =
  "/images/brand/logo.png";


/* =========================================================
   NAVIGATION LINKS
========================================================= */

const navLinks = [
  {
    label: "Home",
    href: "#home",
  },

  {
    label: "About Us",
    href: "#about",
  },

  {
    label: "Programs",
    href: "#programs",
  },

  {
    label: "Life at School",
    href: "#life-at-school",
  },

  {
    label: "FAQs",
    href: "#faq",
  },
];


/* =========================================================
   NAVBAR VISIBLE TIME

   When scrolling upward after Hero,
   navbar remains visible for 3 seconds.
========================================================= */

const NAVBAR_VISIBLE_TIME = 3000;


/* =========================================================
   COMPONENT
========================================================= */

export default function Navbar() {
  const reduceMotion =
    useReducedMotion();


  /* =========================================================
     STATE
  ========================================================= */

  const [
    menuOpen,
    setMenuOpen,
  ] = useState(false);


  const [
    navVisible,
    setNavVisible,
  ] = useState(true);


  const [
    isAtTop,
    setIsAtTop,
  ] = useState(true);


  /* =========================================================
     REFS
  ========================================================= */

  const lastScrollY =
    useRef(0);


  const hideTimer =
    useRef(null);


  const ticking =
    useRef(false);


  /* =========================================================
     CLEAR TIMER
  ========================================================= */

  const clearNavbarTimer = () => {
    if (hideTimer.current) {
      window.clearTimeout(
        hideTimer.current
      );

      hideTimer.current = null;
    }
  };


  /* =========================================================
     SHOW NAVBAR TEMPORARILY
  ========================================================= */

  const showNavbarTemporarily = () => {
    clearNavbarTimer();

    setNavVisible(true);

    hideTimer.current =
      window.setTimeout(() => {
        setNavVisible(false);

        hideTimer.current = null;
      }, NAVBAR_VISIBLE_TIME);
  };


  /* =========================================================
     SCROLL BEHAVIOUR
  ========================================================= */

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) {
        return;
      }

      ticking.current = true;


      window.requestAnimationFrame(() => {
        const currentScrollY =
          window.scrollY;


        /*
          Hero is full screen,
          so viewport height represents
          the Hero boundary.
        */

        const heroHeight =
          window.innerHeight;


        const heroEnd =
          heroHeight + 20;


        /* =====================================================
           TOP OF PAGE
        ====================================================== */

        if (currentScrollY <= 20) {
          clearNavbarTimer();

          setNavVisible(true);

          setIsAtTop(true);

          lastScrollY.current =
            currentScrollY;

          ticking.current = false;

          return;
        }


        setIsAtTop(false);


        /* =====================================================
           SCROLL DOWN
        ====================================================== */

        if (
          currentScrollY >
          lastScrollY.current + 3
        ) {
          clearNavbarTimer();

          setNavVisible(false);


          if (menuOpen) {
            setMenuOpen(false);
          }
        }


        /* =====================================================
           SCROLL UP
        ====================================================== */

        else if (
          currentScrollY <
          lastScrollY.current - 3
        ) {
          /*
            Navbar only appears after
            leaving Hero.
          */

          if (
            currentScrollY >
            heroEnd
          ) {
            showNavbarTemporarily();
          }

          else {
            clearNavbarTimer();

            setNavVisible(false);
          }
        }


        lastScrollY.current =
          currentScrollY;

        ticking.current = false;
      });
    };


    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );


    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      clearNavbarTimer();
    };
  }, [menuOpen]);


  /* =========================================================
     ESCAPE KEY
  ========================================================= */

  useEffect(() => {
    const handleEscape = (
      event
    ) => {
      if (
        event.key === "Escape"
      ) {
        setMenuOpen(false);
      }
    };


    window.addEventListener(
      "keydown",
      handleEscape
    );


    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);


  /* =========================================================
     MOBILE BODY LOCK
  ========================================================= */

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add(
        "vidya-menu-open"
      );
    }

    else {
      document.body.classList.remove(
        "vidya-menu-open"
      );
    }


    return () => {
      document.body.classList.remove(
        "vidya-menu-open"
      );
    };
  }, [menuOpen]);


  /* =========================================================
     CLOSE MENU
  ========================================================= */

  const closeMenu = () => {
    setMenuOpen(false);
  };


  /* =========================================================
     NAVBAR CLASSES
  ========================================================= */

  const navbarClass = [
    "raya-navbar",

    isAtTop
      ? "is-top"
      : "is-scrolled",

    navVisible
      ? "is-visible"
      : "is-hidden",
  ]
    .filter(Boolean)
    .join(" ");


  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <motion.header
      className={navbarClass}

      initial={
        reduceMotion
          ? false
          : {
              y: -20,
              opacity: 0,
            }
      }

      animate={{
        y: navVisible
          ? 0
          : -110,

        opacity: navVisible
          ? 1
          : 0,
      }}

      transition={{
        duration:
          reduceMotion
            ? 0
            : 0.45,

        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
    >

      <div className="raya-navbar-container">

        {/* ===================================================
            LOGO
        ==================================================== */}

        <a
          href="#home"
          className="raya-navbar-logo"
          aria-label="Vidya Academy - Home"
          onClick={closeMenu}
        >
          <img
            src={logoUrl}
            alt="Vidya Academy"
            className="raya-navbar-logo-image"
          />
        </a>


        {/* ===================================================
            NAVIGATION
        ==================================================== */}

        <nav
          className={`raya-navbar-menu ${
            menuOpen
              ? "is-open"
              : ""
          }`}
          id="vidya-navbar-menu"
          aria-label="Main navigation"
        >

          <div className="raya-navbar-links">

            {navLinks.map(
              (link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="raya-navbar-link"
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              )
            )}

          </div>


          {/* MOBILE CONTACT */}

          <a
            href="#faq"
            className="
              raya-navbar-contact-btn
              raya-navbar-mobile-contact
            "
            onClick={closeMenu}
          >

            <span className="raya-contact-text">
              Contact Us
            </span>

            <span
              className="raya-contact-arrow"
              aria-hidden="true"
            >
              ↗
            </span>

          </a>

        </nav>


        {/* ===================================================
            DESKTOP CONTACT
        ==================================================== */}

        <a
          href="#faq"
          className="
            raya-navbar-contact-btn
            raya-navbar-desktop-contact
          "
          onClick={closeMenu}
        >

          <span className="raya-contact-text">
            Contact Us
          </span>

          <span
            className="raya-contact-arrow"
            aria-hidden="true"
          >
            ↗
          </span>

        </a>


        {/* ===================================================
            MOBILE TOGGLE
        ==================================================== */}

        <button
          type="button"
          className={`raya-navbar-toggle ${
            menuOpen
              ? "is-active"
              : ""
          }`}
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-controls="vidya-navbar-menu"
          aria-expanded={menuOpen}
          onClick={() =>
            setMenuOpen(
              (current) =>
                !current
            )
          }
        >

          <span className="raya-navbar-toggle-line" />

          <span className="raya-navbar-toggle-line" />

          <span className="raya-navbar-toggle-line" />

        </button>

      </div>

    </motion.header>
  );
}