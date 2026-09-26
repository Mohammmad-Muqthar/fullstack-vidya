import { motion } from "framer-motion";
import { useRef } from "react";

import "./Hero.css";

const HERO_VIDEO = "/videos/hero-school.mp4";

function Hero({
  onVideoReady,
  showContent = true,
}) {
  const readyRef = useRef(false);

  /* =========================================================
     VIDEO READY
  ========================================================= */

  const handleVideoReady = () => {
    if (readyRef.current) return;

    readyRef.current = true;

    onVideoReady?.();
  };

  return (
    <section className="vidya-hero">

      {/* =====================================================
          BACKGROUND VIDEO
      ====================================================== */}

      <div className="vidya-hero-video-box">

        <video
          className="vidya-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={handleVideoReady}
          onCanPlay={handleVideoReady}
        >
          <source
            src={HERO_VIDEO}
            type="video/mp4"
          />

          Your browser does not support video.
        </video>


        {/* DARK OVERLAY */}

        <motion.div
          className="vidya-hero-overlay"
          initial={false}
          animate={{
            opacity: showContent ? 1 : 0,
          }}
          transition={{
            duration: 0.32,

            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        />

      </div>


      {/* =====================================================
          BOTTOM CONTENT
      ====================================================== */}

      <motion.div
        className="vidya-hero-bottom"
        initial={false}
        animate={
          showContent
            ? {
                opacity: 1,
                y: 0,
              }
            : {
                opacity: 0,
                y: 26,
              }
        }
        transition={{
          /*
            MUCH FASTER.

            No long delay after intro.
          */

          duration: 0.48,

          delay:
            showContent
              ? 0.01
              : 0,

          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
      >

        {/* ===================================================
            LEFT TEXT
        ==================================================== */}

        <motion.div
          className="vidya-hero-description"
          initial={false}
          animate={
            showContent
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {
                  opacity: 0,
                  y: 13,
                }
          }
          transition={{
            duration: 0.42,

            delay:
              showContent
                ? 0.03
                : 0,

            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        >

          <p>
            Vidya Academy inspires transformative
            learning through meaningful relationships,
            academic excellence and unique opportunities.
            Every student is encouraged to explore,
            question and discover their individual
            strengths.
          </p>

        </motion.div>


        {/* ===================================================
            LARGE WORD
        ==================================================== */}

        <motion.div
          className="vidya-hero-word-area"
          initial={false}
          animate={
            showContent
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {
                  opacity: 0,
                  y: 35,
                }
          }
          transition={{
            duration: 0.5,

            delay:
              showContent
                ? 0.02
                : 0,

            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        >

          <h1 className="vidya-hero-big-word">
            KNOWN
          </h1>

        </motion.div>

      </motion.div>

    </section>
  );
}

export default Hero;