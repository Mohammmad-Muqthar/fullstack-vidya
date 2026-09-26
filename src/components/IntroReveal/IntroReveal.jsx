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
     START AFTER VIDEO READY

     Wait two browser frames so that the first
     actual video frame is painted before zoom.
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
     SAFETY START

     Never stay stuck if a browser does not
     report video-ready correctly.
  ========================================================= */

  useEffect(() => {
    if (started) return;

    const timer =
      window.setTimeout(() => {
        setStarted(true);
      }, 1600);

    return () => {
      window.clearTimeout(timer);
    };
  }, [started]);


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

  /*
    Same width you already liked.
  */

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

      {/* =====================================================
          FIXED FULLSCREEN SVG

          IMPORTANT:

          SVG never zooms.
          White rectangle never zooms.

          ONLY black WE BELIEVE text inside
          the mask enlarges.

          Black = transparent.

          Therefore:
          VIDEO SPACE is what enlarges.
      ====================================================== */}

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

            {/* WHITE = KEEP WHITE */}

            <rect
              x="0"
              y="0"
              width={viewWidth}
              height={viewHeight}
              fill="white"
            />


            {/* ===============================================
                BLACK = TRANSPARENT / VIDEO

                THIS GROUP ALONE ZOOMS.
            ================================================ */}

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


        {/* ===================================================
            WHITE COVER

            FIXED at 100vw x 100vh.

            It never transforms.
        ==================================================== */}

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