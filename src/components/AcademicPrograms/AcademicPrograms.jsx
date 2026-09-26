import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./AcademicPrograms.css";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   VIDYA ACADEMY — ACADEMIC PROGRAMMES
========================================================= */

const programs = [
  {
    id: 1,
    title: "Early Years",
    age: "Ages 3 — 5",
    description:
      "A joyful beginning where children learn through play, curiosity and discovery.",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: 2,
    title: "Primary Years",
    age: "Grades 1 — 5",
    description:
      "Building strong foundations through exploration, creativity and meaningful learning.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: 3,
    title: "Middle Years",
    age: "Grades 6 — 8",
    description:
      "Encouraging independent thinking, confidence and deeper understanding.",
    image:
      "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: 4,
    title: "Senior Years",
    age: "Grades 9 — 12",
    description:
      "Preparing students with knowledge, confidence and skills for the future.",
    image:
      "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1800&q=90",
  },
];

export default function AcademicPrograms() {
  const [activeCard, setActiveCard] = useState(null);
  const sectionRef = useRef(null);

  /* =======================================================
     SCROLL-TRIGGERED ANIMATIONS
  ======================================================= */

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".academic-heading",
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".academic-heading",
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".academic-card",
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".academic-cards",
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* =======================================================
     KEYBOARD CARD INTERACTION
  ======================================================= */

  function handleCardKeyDown(event, id) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      setActiveCard((current) =>
        current === id ? null : id
      );
    }
  }

  return (
    <section
      className="academic-programs-section"
      id="programs"
      aria-labelledby="academic-programs-title"
      ref={sectionRef}
    >
      {/* =================================================
          SMOOTH GREEN CURVES

          Each line starts at the exact position where
          its corresponding About line ends.

          Instead of abruptly turning left, the lines
          continue along the same direction before
          gradually flowing toward the left side.
      ================================================= */}

      {/* <svg
        className="academic-background-lines"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      > */}
        {/* FIRST LINE — WIDE, NATURAL SWEEP */}

        {/* <path
          d="
            M 820 0
            C 910 300, 760 610, 150 900
          "
        /> */}

        {/* SECOND LINE — GENTLE CENTRAL CURVE */}

        {/* <path
          d="
            M 1080 0
            C 1185 190, 940 570, 345 900
          "
        /> */}

        {/* THIRD LINE — SOFT ARC TOWARD THE LEFT */}

        {/* <path
          d="
            M 1280 0
            C 1345 165, 1200 570, 540 900
          "
        />
      </svg> */}

      {/* =================================================
          SECTION CONTENT
      ================================================= */}

      <div className="academic-programs-container">
        {/* SECTION HEADING */}

        <div className="academic-heading">
          <h2 id="academic-programs-title">
            Academic programmes
          </h2>
        </div>

        {/* INTERACTIVE PROGRAMME CARDS */}

        <div className="academic-cards">
          {programs.map((program) => {
            const isActive = activeCard === program.id;

            return (
              <article
                key={program.id}
                className={`academic-card ${
                  isActive ? "active" : ""
                }`}
                tabIndex={0}
                role="button"
                aria-expanded={isActive}
                aria-label={`${program.title}, ${program.age}. ${program.description}`}
                onMouseEnter={() =>
                  setActiveCard(program.id)
                }
                onMouseLeave={() =>
                  setActiveCard(null)
                }
                onClick={() =>
                  setActiveCard((current) =>
                    current === program.id
                      ? null
                      : program.id
                  )
                }
                onFocus={() =>
                  setActiveCard(program.id)
                }
                onBlur={(event) => {
                  if (
                    !event.currentTarget.contains(
                      event.relatedTarget
                    )
                  ) {
                    setActiveCard((current) =>
                      current === program.id ? null : current
                    );
                  }
                }}
                onKeyDown={(event) =>
                  handleCardKeyDown(event, program.id)
                }
              >
                {/* BACKGROUND IMAGE */}

                <img
                  src={program.image}
                  alt=""
                  className="academic-card-image"
                  loading="lazy"
                />

                {/* DARK IMAGE GRADIENT */}

                <div
                  className="academic-card-overlay"
                  aria-hidden="true"
                />

                {/* CARD CONTENT */}

                <div className="academic-card-content">
                  <span className="academic-card-age">
                    {program.age}
                  </span>

                  <h3 className="academic-card-title">
                    {program.title}
                  </h3>

                  <div className="academic-card-details">
                    <p>{program.description}</p>

                    <span
                      className="academic-card-arrow"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}