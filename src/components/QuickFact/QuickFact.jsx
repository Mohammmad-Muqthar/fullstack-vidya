import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import "./QuickFact.css";

/* =========================================================
   QUICK FACTS — CONTENT
========================================================= */

const facts = [
  {
    id: 1,
    title: "1:12 - Student–teacher ratio",
    description:
      "A cap of 24 per class and two sections per grade. Small enough that no one stays anonymous.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=85",
    alt: "Students learning together in a bright classroom",
  },
  {
    id: 2,
    title: "9 - Acres of campus",
    description:
      "Every building curved, every line deliberate. The campus is part of the education, not just where it happens.",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=85",
    alt: "School campus surrounded by green spaces",
  },
  {
    id: 3,
    title: "29+ Sports offered",
    description:
      "From the skatepark to the 25-metre pool to the track. Movement is part of the day, not an add-on.",
    image:
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1000&q=85",
    alt: "Indoor swimming pool",
  },
  {
    id: 4,
    title: "450-seat auditorium",
    description:
      "A space for performances, presentations, celebrations, and sharing ideas with the school community.",
    image:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1000&q=85",
    alt: "Auditorium with seating and a stage",
  },
  {
    id: 5,
    title: "Spaces for creativity",
    description:
      "Dedicated environments where students can explore visual arts, music, performance, and new ideas.",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=85",
    alt: "Art materials in a creative learning space",
  },
  {
    id: 6,
    title: "Learning through discovery",
    description:
      "Classrooms and learning spaces designed to encourage questions, experimentation, and collaboration.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=85",
    alt: "Students learning together in a classroom",
  },
  {
    id: 7,
    title: "A connected school community",
    description:
      "Opportunities for students to participate, make friends, and develop a sense of belonging.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=85",
    alt: "Students and friends spending time together",
  },
];

const AUTOPLAY_INTERVAL = 3500;
const INTERACTION_PAUSE = 5000;

/* =========================================================
   COMPONENT
========================================================= */

export default function QuickFact() {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);

  /* Carousel */

  const [activePage, setActivePage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const pauseUntilRef = useRef(0);
  const isHoveringRef = useRef(false);
  const isDraggingRef = useRef(false);

  /* Dragging */

  const dragRef = useRef({
    pointerId: null,
    startX: 0,
    startScrollLeft: 0,
  });

  const [isDragging, setIsDragging] = useState(false);

  /* Custom cursor */

  const cursorOuterRef = useRef(null);

  const cursorPositionRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    initialized: false,
  });

  const cursorFrameRef = useRef(null);
  const cursorVisibleRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorScrolling, setCursorScrolling] = useState(false);

  /* =========================================================
     CAROUSEL MEASUREMENTS
  ========================================================= */

  const getCardStep = useCallback(() => {
    const slider = sliderRef.current;

    if (!slider) return 0;

    const firstCard = slider.querySelector(
      ".quick-fact-card"
    );

    if (!firstCard) return 0;

    const styles = window.getComputedStyle(slider);

    const gap = parseFloat(styles.columnGap) || 0;

    return firstCard.offsetWidth + gap;
  }, []);

  const updateSlider = useCallback(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    const step = getCardStep();

    if (!step) return;

    const maxScroll = Math.max(
      0,
      slider.scrollWidth - slider.clientWidth
    );

    const totalPages = Math.max(
      1,
      Math.ceil(maxScroll / step) + 1
    );

    const atEnd =
      slider.scrollLeft >= maxScroll - 2;

    const currentPage = atEnd
      ? totalPages - 1
      : Math.min(
          totalPages - 1,
          Math.round(slider.scrollLeft / step)
        );

    setPageCount(totalPages);
    setActivePage(currentPage);
  }, [getCardStep]);

  const goToPage = useCallback(
    (page, instant = false) => {
      const slider = sliderRef.current;

      if (!slider) return;

      const step = getCardStep();

      if (!step) return;

      const maxScroll = Math.max(
        0,
        slider.scrollWidth - slider.clientWidth
      );

      const lastPage = Math.max(
        0,
        Math.ceil(maxScroll / step)
      );

      const targetPage = Math.max(
        0,
        Math.min(page, lastPage)
      );

      const targetLeft =
        targetPage === lastPage
          ? maxScroll
          : Math.min(targetPage * step, maxScroll);

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      slider.scrollTo({
        left: targetLeft,
        behavior:
          instant || reducedMotion ? "auto" : "smooth",
      });

      if (instant) {
        updateSlider();
      }
    },
    [getCardStep, updateSlider]
  );

  /* =========================================================
     AUTOPLAY PAUSE
  ========================================================= */

  const pauseAutoplayBriefly = useCallback(() => {
    pauseUntilRef.current =
      Date.now() + INTERACTION_PAUSE;
  }, []);

  /* =========================================================
     CUSTOM CURSOR POSITION

     The outer element follows the mouse smoothly.
     The inner circle handles its own scale animation.
  ========================================================= */

  const updateCursorTarget = useCallback(
    (clientX, clientY) => {
      const section = sectionRef.current;

      if (!section) return;

      const bounds = section.getBoundingClientRect();

      const x = clientX - bounds.left;
      const y = clientY - bounds.top;

      const position = cursorPositionRef.current;

      position.targetX = x;
      position.targetY = y;

      if (!position.initialized) {
        position.x = x;
        position.y = y;
        position.initialized = true;

        if (cursorOuterRef.current) {
          cursorOuterRef.current.style.transform =
            `translate3d(${x}px, ${y}px, 0)`;
        }
      }
    },
    []
  );

  /* Smooth cursor follower */

  useEffect(() => {
    if (!cursorVisible) return;

    let running = true;

    const animateCursor = () => {
      if (!running) return;

      const cursor = cursorOuterRef.current;
      const position = cursorPositionRef.current;

      if (cursor && position.initialized) {
        const ease = 0.22;

        position.x +=
          (position.targetX - position.x) * ease;

        position.y +=
          (position.targetY - position.y) * ease;

        cursor.style.transform = `translate3d(
          ${position.x}px,
          ${position.y}px,
          0
        )`;
      }

      cursorFrameRef.current =
        window.requestAnimationFrame(animateCursor);
    };

    cursorFrameRef.current =
      window.requestAnimationFrame(animateCursor);

    return () => {
      running = false;

      if (cursorFrameRef.current !== null) {
        window.cancelAnimationFrame(
          cursorFrameRef.current
        );

        cursorFrameRef.current = null;
      }
    };
  }, [cursorVisible]);

  /* =========================================================
     POINTER ENTER / LEAVE
  ========================================================= */

  function handlePointerEnter(event) {
    if (event.pointerType !== "mouse") return;

    isHoveringRef.current = true;
    cursorVisibleRef.current = true;

    cursorPositionRef.current.initialized = false;

    updateCursorTarget(
      event.clientX,
      event.clientY
    );

    setCursorVisible(true);
  }

  function handlePointerLeave(event) {
    if (event.pointerType !== "mouse") return;

    isHoveringRef.current = false;
    cursorVisibleRef.current = false;

    setCursorVisible(false);
    setCursorScrolling(false);

    pauseAutoplayBriefly();

    if (scrollTimeoutRef.current) {
      window.clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = null;
    }
  }

  /* =========================================================
     POINTER DOWN — START DRAGGING
  ========================================================= */

  function handlePointerDown(event) {
    pauseAutoplayBriefly();

    /* Touch devices use native horizontal swiping. */

    if (
      event.pointerType !== "mouse" ||
      event.button !== 0
    ) {
      return;
    }

    const slider = sliderRef.current;

    if (!slider) return;

    event.preventDefault();

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: slider.scrollLeft,
    };

    isDraggingRef.current = true;

    setIsDragging(true);
    setCursorScrolling(false);

    slider.setPointerCapture(event.pointerId);
  }

  /* =========================================================
     POINTER MOVE — DRAG + CURSOR MOVEMENT
  ========================================================= */

  function handlePointerMove(event) {
    if (event.pointerType !== "mouse") return;

    updateCursorTarget(
      event.clientX,
      event.clientY
    );

    if (!isDraggingRef.current) return;

    const slider = sliderRef.current;

    if (!slider) return;

    if (
      dragRef.current.pointerId !== event.pointerId
    ) {
      return;
    }

    const distance =
      event.clientX - dragRef.current.startX;

    slider.scrollLeft =
      dragRef.current.startScrollLeft - distance;
  }

  /* =========================================================
     POINTER UP / CANCEL — END DRAG
  ========================================================= */

  function endDragging(event) {
    if (!isDraggingRef.current) return;

    const slider = sliderRef.current;

    if (
      dragRef.current.pointerId !== event.pointerId
    ) {
      return;
    }

    isDraggingRef.current = false;

    setIsDragging(false);

    dragRef.current.pointerId = null;

    pauseAutoplayBriefly();

    if (
      slider &&
      slider.hasPointerCapture(event.pointerId)
    ) {
      slider.releasePointerCapture(event.pointerId);
    }

    window.requestAnimationFrame(updateSlider);
  }

  /* =========================================================
     SCROLL — PAGINATION + CURSOR SHRINK
  ========================================================= */

  function handleScroll() {
    updateSlider();

    if (
      !cursorVisibleRef.current ||
      isDraggingRef.current
    ) {
      return;
    }

    setCursorScrolling(true);

    if (scrollTimeoutRef.current) {
      window.clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = window.setTimeout(
      () => {
        setCursorScrolling(false);
        scrollTimeoutRef.current = null;
      },
      180
    );
  }

  /* =========================================================
     RESIZE
  ========================================================= */

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    updateSlider();

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateSlider)
        : null;

    if (observer) {
      observer.observe(slider);

      const firstCard = slider.querySelector(
        ".quick-fact-card"
      );

      if (firstCard) {
        observer.observe(firstCard);
      }
    }

    window.addEventListener("resize", updateSlider);

    return () => {
      observer?.disconnect();

      window.removeEventListener(
        "resize",
        updateSlider
      );
    };
  }, [updateSlider]);

  /* =========================================================
     AUTOPLAY

     Pauses:
     - while hovering over the carousel
     - while dragging
     - briefly after clicking pagination or swiping
  ========================================================= */

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    const interval = window.setInterval(() => {
      const slider = sliderRef.current;

      if (!slider || document.hidden) return;

      if (
        isHoveringRef.current ||
        isDraggingRef.current ||
        Date.now() < pauseUntilRef.current
      ) {
        return;
      }

      const step = getCardStep();

      if (!step) return;

      const maxScroll = Math.max(
        0,
        slider.scrollWidth - slider.clientWidth
      );

      if (maxScroll <= 2) return;

      if (slider.scrollLeft >= maxScroll - 2) {
        goToPage(0, true);
        return;
      }

      const nextPage =
        Math.round(slider.scrollLeft / step) + 1;

      goToPage(nextPage);
    }, AUTOPLAY_INTERVAL);

    return () => {
      window.clearInterval(interval);
    };
  }, [getCardStep, goToPage]);

  /* =========================================================
     CLEANUP
  ========================================================= */

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  /* =========================================================
     JSX
  ========================================================= */

  return (
    <section
      className="quick-fact-section"
      id="quick-facts"
      ref={sectionRef}
      aria-labelledby="quick-fact-heading"
    >
      {/* HEADING — NO TOP ARROW BUTTONS */}

      <div className="quick-fact-header">
        <h2 id="quick-fact-heading">
          Quick facts about Vidya Academy
        </h2>
      </div>

      {/* HORIZONTAL DRAG / SWIPE CAROUSEL */}

      <div
        className={`quick-fact-slider ${
          isDragging ? "is-dragging" : ""
        }`}
        id="quick-fact-slider"
        ref={sliderRef}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Quick facts about Vidya Academy"
        onScroll={handleScroll}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDragging}
        onPointerCancel={endDragging}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            pauseAutoplayBriefly();
            goToPage(activePage + 1);
          }

          if (event.key === "ArrowLeft") {
            event.preventDefault();
            pauseAutoplayBriefly();
            goToPage(activePage - 1);
          }
        }}
      >
        {facts.map((fact) => (
          <article
            className="quick-fact-card"
            key={fact.id}
          >
            <div className="quick-fact-image">
              <img
                src={fact.image}
                alt={fact.alt}
                loading="lazy"
                draggable="false"
              />
            </div>

            <div className="quick-fact-content">
              <h3>{fact.title}</h3>

              <p>{fact.description}</p>
            </div>
          </article>
        ))}
      </div>

      {/* CUSTOM DRAG CURSOR — DESKTOP ONLY */}

      <div
        ref={cursorOuterRef}
        className={`quick-fact-cursor ${
          cursorVisible ? "is-visible" : ""
        } ${
          isDragging ? "is-dragging" : ""
        } ${
          cursorScrolling ? "is-scrolling" : ""
        }`}
        aria-hidden="true"
      >
        <span className="quick-fact-cursor-circle">
          <span className="quick-fact-cursor-text">
            DRAG
          </span>
        </span>
      </div>

      {/* BOTTOM PAGINATION */}

      <div className="quick-fact-bottom">
        <div
          className="quick-fact-pagination"
          aria-label="Quick facts pagination"
        >
          {Array.from(
            { length: pageCount },
            (_, index) => (
              <button
                key={index}
                type="button"
                className={`quick-fact-dot ${
                  activePage === index ? "active" : ""
                }`}
                onClick={() => {
                  pauseAutoplayBriefly();
                  goToPage(index);
                }}
                aria-label={`Go to quick facts slide ${
                  index + 1
                }`}
                aria-current={
                  activePage === index
                    ? "true"
                    : undefined
                }
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}