import {
  useLayoutEffect,
  useRef,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Footer.css";


gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   SCHOOL DETAILS

   Replace these with actual details when ready.
========================================================= */

const SCHOOL = {
  locationLine1:
    "Kundapura, Karnataka, India",

  locationLine2:
    "Learning today. Leading tomorrow.",

  phone:
    "+91 00000 00000",

  email:
    "admissions@vidyaacademy.edu",

  /*
    Add only digits.

    Example:
    919876543210

    If left empty, button still stays visible
    and sends the user to the enquiry section.
  */

  whatsapp:
    "",
};


/* =========================================================
   FOOTER LINKS
========================================================= */

const footerColumns = [
  {
    title: "School",

    links: [
      {
        label: "About us",
        href: "#about",
      },

      {
        label: "Campus",
        href: "#about",
      },

      {
        label: "Experience",
        href: "#life-at-school",
      },

      {
        label: "Programmes",
        href: "#academic-programs",
      },

      {
        label: "The Vidya Way",
        href: "#the-way",
      },

      {
        label: "Quick facts",
        href: "#quick-facts",
      },
    ],
  },

  {
    title: "Admissions",

    links: [
      {
        label: "Admission enquiry",
        href: "#faq",
      },

      {
        label: "Contact admissions",
        href: "#faq",
      },

      {
        label: "FAQs",
        href: "#faq",
      },

      {
        label: "Fees & finance",
        href: "#faq",
      },
    ],
  },

  {
    title: "Connect",

    links: [
      {
        label: "Instagram",
        href: "#footer",
      },

      {
        label: "LinkedIn",
        href: "#footer",
      },

      {
        label: "YouTube",
        href: "#footer",
      },

      {
        label: "Parent login",
        href: "#footer",
      },

      {
        label: "Careers",
        href: "#footer",
      },
    ],
  },
];


/* =========================================================
   WHATSAPP ICON
========================================================= */

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20.5 11.65a8.48 8.48 0 0 1-12.55 7.43L3 20.45l1.34-4.82a8.47 8.47 0 1 1 16.16-3.98Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M8.16 7.72c.25-.43.52-.44.76-.45h.45c.18 0 .37.07.47.33l.82 1.98c.1.24.08.43-.06.63l-.62.82c-.12.16-.12.3-.03.47.37.74.94 1.39 1.61 1.91.66.51 1.36.87 2.12 1.08.2.06.35 0 .48-.16l.77-.93c.16-.2.36-.25.59-.16l1.93.87c.26.12.39.27.41.48.04.44-.16 1.17-.48 1.58-.45.6-1.21.99-2.05.99-1.05 0-2.87-.55-4.87-2.24-1.63-1.38-2.83-3.03-3.33-4.4-.37-.93-.28-1.89.03-2.8Z"
        fill="currentColor"
      />
    </svg>
  );
}


/* =========================================================
   DECORATIVE WAVE
========================================================= */

function FooterWave() {
  return (
    <svg
      className="vidya-footer-wave-svg"
      viewBox="0 0 1600 260"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        className="vidya-footer-wave-path"
        pathLength="1"
        d="
          M 15 114

          C 55 107,
            71 108,
            78 177

          C 84 237,
            111 226,
            149 161

          C 190 91,
            221 61,
            286 58

          C 323 56,
            325 86,
            325 145

          C 325 210,
            343 232,
            383 174

          C 432 101,
            457 59,
            520 58

          C 558 58,
            560 85,
            560 145

          C 560 214,
            580 232,
            620 174

          C 668 100,
            693 58,
            758 58

          C 796 58,
            798 84,
            798 145

          C 798 214,
            819 232,
            857 175

          C 905 102,
            931 58,
            996 58

          C 1034 58,
            1036 84,
            1036 145

          C 1036 214,
            1057 232,
            1095 175

          C 1143 102,
            1169 58,
            1234 58

          C 1272 58,
            1274 84,
            1274 145

          C 1274 214,
            1295 231,
            1333 175

          C 1382 102,
            1408 58,
            1476 58

          L 1585 58
        "
        fill="none"
        stroke="currentColor"
        strokeWidth="94"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


/* =========================================================
   FOOTER
========================================================= */

export default function Footer() {
  const footerRef =
    useRef(null);


  useLayoutEffect(() => {
    const footer =
      footerRef.current;

    if (!footer) {
      return undefined;
    }


    const faq =
      document.querySelector(
        "#faq"
      );

    const faqList =
      document.querySelector(
        ".vidya-faq-list"
      );


    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;


    let resizeObserver;

    let refreshTimer;


    const ctx =
      gsap.context(() => {

        /* ===================================================
           FAQ / FOOTER SLIDE-OVER

           FAQ holds while footer moves up over it.
        =================================================== */

        if (
          faq &&
          !reducedMotion
        ) {
          ScrollTrigger.create({
            trigger: faq,

            start:
              "bottom bottom",

            endTrigger:
              footer,

            end:
              "bottom bottom",

            pin:
              true,

            pinSpacing:
              false,

            anticipatePin:
              1,

            invalidateOnRefresh:
              true,
          });
        }


        if (reducedMotion) {
          return;
        }


        /* ===================================================
           FOOTER BODY SLIDES FROM BELOW
        =================================================== */

        gsap.fromTo(
          footer,

          {
            yPercent:
              8,
          },

          {
            yPercent:
              0,

            ease:
              "none",

            scrollTrigger: {
              trigger:
                footer,

              start:
                "top bottom",

              end:
                "top 70%",

              scrub:
                0.9,

              invalidateOnRefresh:
                true,
            },
          }
        );


        /* ===================================================
           LEFT INFO
        =================================================== */

        gsap.fromTo(
          ".vidya-footer-info",

          {
            y:
              50,

            opacity:
              0,
          },

          {
            y:
              0,

            opacity:
              1,

            ease:
              "power2.out",

            scrollTrigger: {
              trigger:
                ".vidya-footer-top",

              start:
                "top 91%",

              end:
                "top 66%",

              scrub:
                0.7,
            },
          }
        );


        /* ===================================================
           COLUMN HEADINGS
        =================================================== */

        gsap.fromTo(
          ".vidya-footer-column h3",

          {
            y:
              24,

            opacity:
              0,
          },

          {
            y:
              0,

            opacity:
              1,

            stagger:
              0.08,

            ease:
              "none",

            scrollTrigger: {
              trigger:
                ".vidya-footer-navigation",

              start:
                "top 92%",

              end:
                "top 67%",

              scrub:
                0.65,
            },
          }
        );


        /* ===================================================
           LINKS STAGGER
        =================================================== */

        gsap.fromTo(
          ".vidya-footer-column li",

          {
            y:
              18,

            opacity:
              0,
          },

          {
            y:
              0,

            opacity:
              1,

            stagger:
              0.035,

            ease:
              "none",

            scrollTrigger: {
              trigger:
                ".vidya-footer-navigation",

              start:
                "top 88%",

              end:
                "top 60%",

              scrub:
                0.7,
            },
          }
        );


        /* ===================================================
           WHATSAPP BUTTON
        =================================================== */

        gsap.fromTo(
          ".vidya-footer-whatsapp",

          {
            y:
              20,

            opacity:
              0,

            scale:
              0.94,
          },

          {
            y:
              0,

            opacity:
              1,

            scale:
              1,

            ease:
              "none",

            scrollTrigger: {
              trigger:
                ".vidya-footer-whatsapp",

              start:
                "top 96%",

              end:
                "top 79%",

              scrub:
                0.45,
            },
          }
        );


        /* ===================================================
           WORDMARK

           Slides upward and slightly expands.
        =================================================== */

        gsap.fromTo(
          ".vidya-footer-large-name",

          {
            y:
              115,

            opacity:
              0,

            scale:
              0.92,

            letterSpacing:
              "0.12em",
          },

          {
            y:
              0,

            opacity:
              1,

            scale:
              1,

            letterSpacing:
              "0.052em",

            ease:
              "none",

            scrollTrigger: {
              trigger:
                ".vidya-footer-brand",

              start:
                "top 100%",

              end:
                "top 65%",

              scrub:
                0.9,

              invalidateOnRefresh:
                true,
            },
          }
        );


        /* ===================================================
           WAVE REVEAL
        =================================================== */

        gsap.fromTo(
          ".vidya-footer-wave-inner",

          {
            y:
              90,

            opacity:
              0,

            scaleX:
              0.9,
          },

          {
            y:
              0,

            opacity:
              1,

            scaleX:
              1,

            transformOrigin:
              "50% 50%",

            ease:
              "none",

            scrollTrigger: {
              trigger:
                ".vidya-footer-wave",

              start:
                "top 100%",

              end:
                "top 67%",

              scrub:
                0.85,
            },
          }
        );


        /* ===================================================
           WAVE DRAW MOTION
        =================================================== */

        gsap.fromTo(
          ".vidya-footer-wave-path",

          {
            strokeDasharray:
              "1",

            strokeDashoffset:
              "1",
          },

          {
            strokeDashoffset:
              "0",

            ease:
              "none",

            scrollTrigger: {
              trigger:
                ".vidya-footer-wave",

              start:
                "top 96%",

              end:
                "top 58%",

              scrub:
                1,
            },
          }
        );


        /* ===================================================
           BOTTOM LINE + COPYRIGHT
        =================================================== */

        gsap.fromTo(
          ".vidya-footer-bottom",

          {
            y:
              28,

            opacity:
              0,
          },

          {
            y:
              0,

            opacity:
              1,

            ease:
              "none",

            scrollTrigger: {
              trigger:
                ".vidya-footer-bottom",

              start:
                "top 100%",

              end:
                "top 84%",

              scrub:
                0.55,
            },
          }
        );

      }, footer);


    /* =====================================================
       REFRESH WHEN FAQ CHANGES HEIGHT
    ===================================================== */

    if (
      faqList &&
      typeof ResizeObserver !==
        "undefined"
    ) {
      resizeObserver =
        new ResizeObserver(() => {
          window.clearTimeout(
            refreshTimer
          );

          refreshTimer =
            window.setTimeout(() => {
              ScrollTrigger.refresh();
            }, 360);
        });


      resizeObserver.observe(
        faqList
      );
    }


    const handleResize = () => {
      window.clearTimeout(
        refreshTimer
      );

      refreshTimer =
        window.setTimeout(() => {
          ScrollTrigger.refresh();
        }, 180);
    };


    window.addEventListener(
      "resize",
      handleResize
    );


    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });


    return () => {
      window.clearTimeout(
        refreshTimer
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

      resizeObserver?.disconnect();

      ctx.revert();
    };

  }, []);


  /* =======================================================
     WHATSAPP

     Always render button.
  ======================================================= */

  const whatsappNumber =
    SCHOOL.whatsapp.replace(
      /\D/g,
      ""
    );


  const whatsappHref =
    whatsappNumber
      ? `https://wa.me/${whatsappNumber}`
      : "#faq";


  const hasWhatsapp =
    Boolean(
      whatsappNumber
    );


  return (
    <footer
      className="vidya-footer"
      id="footer"
      ref={footerRef}
    >

      <div className="vidya-footer-container">

        {/* ===================================================
            TOP
        ==================================================== */}

        <div className="vidya-footer-top">

          {/* =================================================
              LEFT SIDE
          ================================================== */}

          <div className="vidya-footer-info">

            <p className="vidya-footer-intro">
              Vidya Academy.
              <br />
              Learn. Grow. Lead.
            </p>


            <address className="vidya-footer-address">

              <span>
                {SCHOOL.locationLine1}
              </span>

              <span>
                {SCHOOL.locationLine2}
              </span>

            </address>


            <div className="vidya-footer-contact">

              {SCHOOL.phone && (
                <a
                  href={`tel:${SCHOOL.phone.replace(
                    /[^\d+]/g,
                    ""
                  )}`}
                >
                  {SCHOOL.phone}
                </a>
              )}


              {SCHOOL.email && (
                <a
                  href={`mailto:${SCHOOL.email}`}
                >
                  {SCHOOL.email}
                </a>
              )}

            </div>


            {/* ===============================================
                ALWAYS VISIBLE WHATSAPP BUTTON
            =============================================== */}

            <a
              className="vidya-footer-whatsapp"
              href={whatsappHref}
              target={
                hasWhatsapp
                  ? "_blank"
                  : undefined
              }
              rel={
                hasWhatsapp
                  ? "noopener noreferrer"
                  : undefined
              }
              aria-label={
                hasWhatsapp
                  ? "Chat with Vidya Academy on WhatsApp"
                  : "Go to admissions enquiry"
              }
            >

              <WhatsAppIcon />

              <span>
                Chat on WhatsApp
              </span>

            </a>

          </div>


          {/* =================================================
              NAVIGATION
          ================================================== */}

          <nav
            className="vidya-footer-navigation"
            aria-label="Footer navigation"
          >

            {footerColumns.map(
              (column) => (
                <div
                  className="vidya-footer-column"
                  key={
                    column.title
                  }
                >

                  <h3>
                    {column.title}
                  </h3>


                  <ul>

                    {column.links.map(
                      (link) => (
                        <li
                          key={`${column.title}-${link.label}`}
                        >
                          <a
                            href={
                              link.href
                            }
                          >
                            {
                              link.label
                            }
                          </a>
                        </li>
                      )
                    )}

                  </ul>

                </div>
              )
            )}

          </nav>

        </div>


        {/* ===================================================
            LARGE WORDMARK
        ==================================================== */}

        <div className="vidya-footer-brand">

          <h2 className="vidya-footer-large-name">
            VIDYA ACADEMY
          </h2>

        </div>


        {/* ===================================================
            LARGE FLOWING GRAPHIC
        ==================================================== */}

        <div className="vidya-footer-wave">

          <div className="vidya-footer-wave-inner">
            <FooterWave />
          </div>

        </div>


        {/* ===================================================
            BOTTOM
        ==================================================== */}

        <div className="vidya-footer-bottom">

          <p>
            © {new Date().getFullYear()} Vidya Academy.
            All rights reserved.
          </p>


          <p>
            Kundapura, Karnataka, India
          </p>

        </div>

      </div>

    </footer>
  );
}