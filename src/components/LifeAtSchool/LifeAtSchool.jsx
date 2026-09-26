import { useEffect, useRef, useState } from "react";
import "./LifeAtSchool.css";

/* =========================================================
   VIDYA ACADEMY — LIFE AT SCHOOL
========================================================= */

const lifeAtSchool = [
  {
    id: "sports",
    title: "Sports & Athletics",
    description:
      "Through sports and physical activity, students discover teamwork, resilience, discipline, and the confidence to take on new challenges.",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1400&q=85",
    alt: "School campus building and surrounding grounds",
  },
  {
    id: "academics",
    title: "Academics",
    description:
      "Learning goes beyond textbooks as students explore ideas, ask questions, develop strong foundations, and discover their individual strengths.",
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1400&q=85",
    alt: "Educational campus building",
  },
  {
    id: "arts",
    title: "Arts & Creativity",
    description:
      "Creative experiences encourage students to explore their imagination, express ideas, and develop new ways of seeing the world.",
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1400&q=85",
    alt: "Academic campus architecture",
  },
  {
    id: "innovation",
    title: "Innovation",
    description:
      "Curiosity and hands-on exploration help students think independently, solve problems, and bring their ideas to life.",
    image:
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1400&q=85",
    alt: "School-style educational building",
  },
  {
    id: "belonging",
    title: "Community & Belonging",
    description:
      "School life is shaped by friendships, shared experiences, collaboration, and a welcoming environment where students feel connected.",
    image:
      "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1400&q=85",
    alt: "Campus buildings and outdoor spaces",
  },
  {
    id: "wellbeing",
    title: "Wellbeing",
    description:
      "A balanced school experience creates space for personal growth, positive relationships, physical activity, and emotional wellbeing.",
    image:
      "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1400&q=85",
    alt: "Educational campus environment",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function LifeAtSchool() {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const sliderShellRef = useRef(null);
  const cursorFollowerRef = useRef(null);

  const cursorFrameRef = useRef(null);
  const scrollTimerRef = useRef(null);

  /* =========================================================
     DRAG STATE
  ========================================================= */

  const dragRef = useRef({
    pressed: false,
    dragging: false,
    pointerId: null,
    startX: 0,
    startScrollLeft: 0,
  });

  /* =========================================================
     CURSOR POSITION

     Stored in refs so moving the mouse does not
     rerender the cards.
  ========================================================= */

  const cursorPositionRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    initialized: false,
  });

  const [sectionInView, setSectionInView] =
    useState(false);

  const [cursorVisible, setCursorVisible] =
    useState(false);

  const [isPressed, setIsPressed] =
    useState(false);

  const [isScrolling, setIsScrolling] =
    useState(false);

  /* =========================================================
     SMOOTH CURSOR FOLLOWING
  ========================================================= */

  function animateCursorPosition() {
    const cursor = cursorFollowerRef.current;
    const position = cursorPositionRef.current;

    if (!cursor) {
      cursorFrameRef.current = null;
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ease = reducedMotion ? 1 : 0.22;

    position.x +=
      (position.targetX - position.x) * ease;

    position.y +=
      (position.targetY - position.y) * ease;

    cursor.style.transform = `translate3d(
      ${position.x}px,
      ${position.y}px,
      0
    )`;

    const remainingX = Math.abs(
      position.targetX - position.x
    );

    const remainingY = Math.abs(
      position.targetY - position.y
    );

    if (remainingX > 0.15 || remainingY > 0.15) {
      cursorFrameRef.current =
        window.requestAnimationFrame(
          animateCursorPosition
        );
    } else {
      cursorFrameRef.current = null;
    }
  }

  /* =========================================================
     UPDATE CURSOR TARGET
  ========================================================= */

  function updateCursorTarget(event, immediate = false) {
    const shell = sliderShellRef.current;
    const cursor = cursorFollowerRef.current;

    if (!shell || !cursor) return;

    const bounds = shell.getBoundingClientRect();

    const targetX = event.clientX - bounds.left;
    const targetY = event.clientY - bounds.top;

    const position = cursorPositionRef.current;

    position.targetX = targetX;
    position.targetY = targetY;

    if (immediate || !position.initialized) {
      position.x = targetX;
      position.y = targetY;

      position.initialized = true;

      cursor.style.transform = `translate3d(
        ${targetX}px,
        ${targetY}px,
        0
      )`;

      return;
    }

    if (cursorFrameRef.current === null) {
      cursorFrameRef.current =
        window.requestAnimationFrame(
          animateCursorPosition
        );
    }
  }

  /* =========================================================
     POINTER ENTER
  ========================================================= */

  function handlePointerEnter(event) {
    if (event.pointerType !== "mouse") return;

    updateCursorTarget(event, true);

    setCursorVisible(true);
  }

  /* =========================================================
     POINTER LEAVE
  ========================================================= */

  function handlePointerLeave(event) {
    if (event.pointerType !== "mouse") return;

    if (!dragRef.current.pressed) {
      setCursorVisible(false);
    }
  }

  /* =========================================================
     CHECK WHETHER POINTER IS INSIDE SLIDER
  ========================================================= */

  function pointerInsideSlider(event) {
    const slider = sliderRef.current;

    if (!slider) return false;

    const bounds = slider.getBoundingClientRect();

    return (
      event.clientX >= bounds.left &&
      event.clientX <= bounds.right &&
      event.clientY >= bounds.top &&
      event.clientY <= bounds.bottom
    );
  }

  /* =========================================================
     POINTER DOWN — START DRAG
  ========================================================= */

  function handlePointerDown(event) {
    if (
      event.pointerType !== "mouse" ||
      event.button !== 0
    ) {
      return;
    }

    const slider = sliderRef.current;

    if (!slider) return;

    dragRef.current = {
      pressed: true,
      dragging: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: slider.scrollLeft,
    };

    updateCursorTarget(event);

    setCursorVisible(true);
    setIsPressed(true);

    slider.classList.add("is-pressing");

    slider.setPointerCapture(event.pointerId);
  }

  /* =========================================================
     POINTER MOVE — CURSOR + HORIZONTAL DRAG
  ========================================================= */

  function handlePointerMove(event) {
    if (event.pointerType === "mouse") {
      updateCursorTarget(event);

      if (dragRef.current.pressed) {
        setCursorVisible(
          pointerInsideSlider(event)
        );
      }
    }

    const slider = sliderRef.current;
    const drag = dragRef.current;

    if (
      !slider ||
      !drag.pressed ||
      drag.pointerId !== event.pointerId
    ) {
      return;
    }

    const distance =
      event.clientX - drag.startX;

    if (
      !drag.dragging &&
      Math.abs(distance) > 5
    ) {
      drag.dragging = true;

      slider.classList.add("is-dragging");
    }

    if (!drag.dragging) return;

    slider.scrollLeft =
      drag.startScrollLeft - distance;
  }

  /* =========================================================
     FINISH DRAG

     Restore the full DRAG circle when the mouse
     button is released.
  ========================================================= */

  function finishDrag(event) {
    const slider = sliderRef.current;
    const drag = dragRef.current;

    if (
      !slider ||
      !drag.pressed ||
      drag.pointerId !== event.pointerId
    ) {
      return;
    }

    dragRef.current = {
      pressed: false,
      dragging: false,
      pointerId: null,
      startX: 0,
      startScrollLeft: 0,
    };

    slider.classList.remove(
      "is-pressing",
      "is-dragging"
    );

    setIsPressed(false);

    setCursorVisible(
      event.pointerType === "mouse" &&
        pointerInsideSlider(event)
    );

    if (
      slider.hasPointerCapture(event.pointerId)
    ) {
      slider.releasePointerCapture(
        event.pointerId
      );
    }
  }

  /* =========================================================
     HORIZONTAL SCROLLING

     Shrink the cursor while the carousel moves.
  ========================================================= */

  function handleSliderScroll() {
    setIsScrolling(true);

    if (scrollTimerRef.current) {
      window.clearTimeout(
        scrollTimerRef.current
      );
    }

    scrollTimerRef.current = window.setTimeout(
      () => {
        setIsScrolling(false);
        scrollTimerRef.current = null;
      },
      200
    );
  }

  /* =========================================================
     SECTION VISIBILITY — CARD ENTRANCE ANIMATION
  ========================================================= */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    if (
      typeof IntersectionObserver === "undefined"
    ) {
      setSectionInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSectionInView(
          entry.isIntersecting
        );
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  /* =========================================================
     CLEANUP
  ========================================================= */

  useEffect(() => {
    return () => {
      if (cursorFrameRef.current !== null) {
        window.cancelAnimationFrame(
          cursorFrameRef.current
        );
      }

      if (scrollTimerRef.current) {
        window.clearTimeout(
          scrollTimerRef.current
        );
      }
    };
  }, []);

  /* =========================================================
     JSX
  ========================================================= */

  return (
    <section
      className={`raya-life ${
        sectionInView ? "is-in-view" : ""
      }`}
      id="life-at-school"
      ref={sectionRef}
      aria-labelledby="raya-life-heading"
    >
      {/* ===============================================
          HEADING ONLY

          NO TOP ARROW BUTTONS
          NO DRAG INSTRUCTION BOX
      =============================================== */}

      <div className="raya-life-header">
        <h2 id="raya-life-heading">
          Life at Vidya Academy
        </h2>
      </div>

      {/* ===============================================
          SLIDER + CUSTOM DRAG CURSOR
      =============================================== */}

      <div
        className="raya-life-slider-shell"
        ref={sliderShellRef}
      >
        {/* ROUND DRAG CURSOR */}

        <div
          ref={cursorFollowerRef}
          className={`raya-life-cursor-follower ${
            cursorVisible ? "is-visible" : ""
          } ${
            isPressed ? "is-pressed" : ""
          } ${
            isScrolling ? "is-scrolling" : ""
          }`}
          aria-hidden="true"
        >
          <div className="raya-life-cursor-circle">
            <span className="raya-life-cursor-label">
              DRAG
            </span>
          </div>
        </div>

        {/* HORIZONTAL IMAGE CARDS */}

        <div
          className="raya-life-slider"
          id="raya-life-slider"
          ref={sliderRef}
          role="region"
          tabIndex={0}
          aria-label="Vidya Academy school life activities. Drag with a mouse or swipe horizontally to view more cards."
          onScroll={handleSliderScroll}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onLostPointerCapture={finishDrag}
        >
          {lifeAtSchool.map((item) => (
            <article
              className="raya-life-card"
              key={item.id}
            >
              <img
                className="raya-life-image"
                src={item.image}
                alt={item.alt}
                loading="lazy"
                draggable={false}
              />

              <div
                className="raya-life-overlay"
                aria-hidden="true"
              />

              <div className="raya-life-card-content">
                <h3>{item.title}</h3>

                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}