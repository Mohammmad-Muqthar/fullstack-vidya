import { useState } from "react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import "./TheWay.css";


/* =========================================================
   TEMP / FAKE DATA
========================================================= */

const wayItems = [
  {
    id: "academics",
    navLabel: "Academics",
    title: "Academics",

    description:
      "A rigorous, student-centered academic experience that challenges, supports, and inspires every learner to achieve their fullest potential every day.",

    button: "ACADEMICS AT VIDYA",

    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=2000&q=90",

    caption:
      "Learning Without Limits",
  },

  {
    id: "arts",
    navLabel: "Arts",
    title: "Arts",

    description:
      "From music and theatre to visual arts and creative expression, students have the freedom to discover ideas, develop confidence, and share their imagination.",

    button: "ARTS AT VIDYA",

    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=2000&q=90",

    caption:
      "Creativity Finds Its Voice",
  },

  {
    id: "athletics",
    navLabel: "Athletics",
    title: "Athletics",

    description:
      "Where competitive excellence, character, teamwork, and community come together to prepare students for challenges both on and beyond the field.",

    button: "ATHLETICS AT VIDYA",

    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=2000&q=90",

    caption:
      "Strength. Character. Teamwork.",
  },

  {
    id: "clubs",
    navLabel: "Clubs & Activities",
    title: "Clubs & Activities",

    description:
      "A wide range of clubs, activities, experiences, and student-led opportunities encourages every learner to discover new interests and pursue their passions.",

    button: "EXPLORE CLUBS",

    image:
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=2000&q=90",

    caption:
      "Discover Your Passion",
  },
];


/* =========================================================
   ARROWS
========================================================= */

function ArrowUp() {
  return (
    <svg
      viewBox="0 0 30 30"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M15 25V5"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
      />

      <path
        d="M8.5 11.5L15 5L21.5 11.5"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


function ArrowDown() {
  return (
    <svg
      viewBox="0 0 30 30"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M15 5V25"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
      />

      <path
        d="M8.5 18.5L15 25L21.5 18.5"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


/* =========================================================
   SLIDE ANIMATION
========================================================= */

const slideVariants = {
  enter: (direction) => ({
    y:
      direction > 0
        ? "100%"
        : "-100%",

    opacity: 1,
  }),

  center: {
    y: "0%",
    opacity: 1,
  },

  exit: (direction) => ({
    y:
      direction > 0
        ? "-100%"
        : "100%",

    opacity: 1,
  }),
};


/* =========================================================
   COMPONENT
========================================================= */

export default function TheWay() {
  const reduceMotion =
    useReducedMotion();

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);

  const [
    direction,
    setDirection,
  ] = useState(1);

  const activeItem =
    wayItems[activeIndex];


  /* =========================================================
     CHANGE ITEM
  ========================================================= */

  const goToItem = (
    nextIndex
  ) => {
    if (
      nextIndex ===
      activeIndex
    ) {
      return;
    }

    setDirection(
      nextIndex >
        activeIndex
        ? 1
        : -1
    );

    setActiveIndex(
      nextIndex
    );
  };


  /* =========================================================
     PREVIOUS
  ========================================================= */

  const previousSlide =
    () => {
      if (
        activeIndex === 0
      ) {
        return;
      }

      setDirection(-1);

      setActiveIndex(
        (current) =>
          current - 1
      );
    };


  /* =========================================================
     NEXT
  ========================================================= */

  const nextSlide =
    () => {
      if (
        activeIndex ===
        wayItems.length - 1
      ) {
        return;
      }

      setDirection(1);

      setActiveIndex(
        (current) =>
          current + 1
      );
    };


  return (
    <section
      className="raya-way"
      id="the-way"
      aria-labelledby="raya-way-title"
    >

      {/* =====================================================
          SECTION HEADING
      ====================================================== */}

      <div className="raya-way-heading-wrap">

        <h2
          className="raya-way-heading"
          id="raya-way-title"
        >
          The Vidya Way
        </h2>

      </div>


      {/* =====================================================
          MAIN EXPERIENCE
      ====================================================== */}

      <div className="raya-way-shell">

        {/* ===================================================
            LEFT SIDEBAR
        ==================================================== */}

        <aside className="raya-way-sidebar">

          <nav
            className="raya-way-nav"
            aria-label="The Vidya Way sections"
          >

            {wayItems.map(
              (
                item,
                index
              ) => {
                const isActive =
                  index ===
                  activeIndex;

                return (
                  <button
                    type="button"
                    key={
                      item.id
                    }
                    className={[
                      "raya-way-nav-item",

                      isActive
                        ? "is-active"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() =>
                      goToItem(
                        index
                      )
                    }
                  >

                    <span
                      className="raya-way-nav-dot"
                      aria-hidden="true"
                    />

                    <span className="raya-way-nav-text">
                      {
                        item.navLabel
                      }
                    </span>

                  </button>
                );
              }
            )}

          </nav>


          {/* =================================================
              CONTROLS
          ================================================== */}

          <div className="raya-way-controls">

            <button
              type="button"
              className="raya-way-control"
              onClick={
                previousSlide
              }
              disabled={
                activeIndex === 0
              }
              aria-label="Previous section"
            >
              <ArrowUp />
            </button>


            <button
              type="button"
              className="raya-way-control"
              onClick={
                nextSlide
              }
              disabled={
                activeIndex ===
                wayItems.length - 1
              }
              aria-label="Next section"
            >
              <ArrowDown />
            </button>

          </div>

        </aside>


        {/* ===================================================
            STAGE
        ==================================================== */}

        <div className="raya-way-stage">

          <AnimatePresence
            initial={false}
            custom={
              direction
            }
            mode="sync"
          >

            <motion.div
              key={
                activeItem.id
              }
              custom={
                direction
              }
              variants={
                slideVariants
              }
              initial={
                reduceMotion
                  ? false
                  : "enter"
              }
              animate="center"
              exit={
                reduceMotion
                  ? undefined
                  : "exit"
              }
              transition={{
                duration:
                  reduceMotion
                    ? 0
                    : 0.72,

                ease: [
                  0.76,
                  0,
                  0.24,
                  1,
                ],
              }}
              className="raya-way-slide"
            >

              {/* =============================================
                  IMAGE
              ============================================== */}

              <motion.div
                className="raya-way-image-wrap"
                initial={
                  reduceMotion
                    ? false
                    : {
                        scale:
                          1.025,
                      }
                }
                animate={{
                  scale: 1,
                }}
                transition={{
                  duration:
                    reduceMotion
                      ? 0
                      : 1,

                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
              >

                <img
                  src={
                    activeItem.image
                  }
                  alt={
                    activeItem.title
                  }
                  className="raya-way-image"
                  draggable="false"
                />


                <div
                  className="raya-way-image-shade"
                  aria-hidden="true"
                />


                <motion.div
                  className="raya-way-image-caption"
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 18,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration:
                      reduceMotion
                        ? 0
                        : 0.5,

                    delay:
                      reduceMotion
                        ? 0
                        : 0.28,

                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                >
                  {
                    activeItem.caption
                  }
                </motion.div>

              </motion.div>


              {/* =============================================
                  CONTENT CARD
              ============================================== */}

              <motion.div
                className="raya-way-content-card"
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 22,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration:
                    reduceMotion
                      ? 0
                      : 0.5,

                  delay:
                    reduceMotion
                      ? 0
                      : 0.13,

                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
              >

                <h3 className="raya-way-content-title">
                  {
                    activeItem.title
                  }
                </h3>


                <p className="raya-way-content-description">
                  {
                    activeItem.description
                  }
                </p>


                <button
                  type="button"
                  className="raya-way-content-button"
                >
                  {
                    activeItem.button
                  }
                </button>

              </motion.div>

            </motion.div>

          </AnimatePresence>

        </div>

      </div>

    </section>
  );
}