import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { createPortal } from "react-dom";

import "./IntroReveal.css";

function IntroReveal({
  ready = false,
  onComplete,
}) {
  const [started, setStarted] =
    useState(false);

  const [isMobile, setIsMobile] =
    useState(false);

  const completedRef =
    useRef(false);

  const previousOverflowRef =
    useRef("");


  /* =========================================================
     RESPONSIVE
  ========================================================= */

  useEffect(() => {
    const media =
      window.matchMedia(
        "(max-width: 768px)"
      );

    const update = () => {
      setIsMobile(media.matches);
    };

    update();

    media.addEventListener(
      "change",
      update
    );

    return () => {
      media.removeEventListener(
        "change",
        update
      );
    };
  }, []);


  /* =========================================================
     LOCK PAGE
  ========================================================= */

  useEffect(() => {
    previousOverflowRef.current =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    document.body.classList.add(
      "wb-page-intro-active"
    );

    return () => {
      document.body.style.overflow =
        previousOverflowRef.current;

      document.body.classList.remove(
        "wb-page-intro-active"
      );
    };
  }, []);


  /* =========================================================
     START ONLY AFTER REAL VIDEO PLAYBACK
  ========================================================= */

  useEffect(() => {
    if (!ready || started) {
      return;
    }

    let frame1;
    let frame2;

    frame1 =
      requestAnimationFrame(() => {
        frame2 =
          requestAnimationFrame(() => {
            setStarted(true);
          });
      });

    return () => {
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);
    };
  }, [ready, started]);


  /* =========================================================
     COMPLETE
  ========================================================= */

  const completeIntro =
    useCallback(() => {
      if (
        completedRef.current
      ) {
        return;
      }

      completedRef.current = true;

      document.body.classList.remove(
        "wb-page-intro-active"
      );

      document.body.style.overflow =
        previousOverflowRef.current || "";

      onComplete?.();
    }, [onComplete]);


  /* =========================================================
     BACKUP COMPLETION
  ========================================================= */

  useEffect(() => {
    if (!started) return;

    const timer =
      window.setTimeout(
        completeIntro,
        2500
      );

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    started,
    completeIntro,
  ]);


  /* =========================================================
     MAIN ZOOM END
  ========================================================= */

  const handleZoomEnd = (
    event
  ) => {
    if (
      event.animationName ===
      "wbVideoOpeningZoom"
    ) {
      completeIntro();
    }
  };


  if (
    typeof document === "undefined"
  ) {
    return null;
  }


  /* =========================================================
     SVG VALUES
  ========================================================= */

  const viewWidth =
    isMobile
      ? 1000
      : 1920;

  const viewHeight =
    isMobile
      ? 1600
      : 1080;

  const centerX =
    viewWidth / 2;

  const centerY =
    viewHeight / 2;

  const textWidth =
    isMobile
      ? 840
      : 1380;

  const fontSize =
    isMobile
      ? 132
      : 210;


  return createPortal(
    <div
      className={[
        "wb-intro",

        started
          ? "wb-intro--started"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >

      <svg
        className="wb-intro-svg"
        viewBox={
          `0 0 ${viewWidth} ${viewHeight}`
        }
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >

        <defs>

          <mask
            id="wb-video-opening-mask"
            x="0"
            y="0"
            width={viewWidth}
            height={viewHeight}
            maskUnits="userSpaceOnUse"
          >

            <rect
              x="0"
              y="0"
              width={viewWidth}
              height={viewHeight}
              fill="white"
            />

            <g
              className="wb-video-opening"
              onAnimationEnd={
                handleZoomEnd
              }
            >

              <text
                className="wb-intro-text"
                x={centerX}
                y={centerY}
                textAnchor="middle"
                dominantBaseline="central"
                fill="black"
                fontSize={fontSize}
                textLength={textWidth}
                lengthAdjust="spacingAndGlyphs"
              >
                WE BELIEVE
              </text>

            </g>

          </mask>

        </defs>


        <rect
          className="wb-white-cover"
          x="0"
          y="0"
          width={viewWidth}
          height={viewHeight}
          fill="#ffffff"
          mask="url(#wb-video-opening-mask)"
        />

      </svg>

    </div>,
    document.body
  );
}

export default IntroReveal;