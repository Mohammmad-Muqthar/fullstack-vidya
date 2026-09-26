import { motion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
} from "react";

import "./Hero.css";

const HERO_VIDEO = "/videos/hero-school.mp4";

function Hero({
  onVideoReady,
  showContent = true,
}) {
  const videoRef = useRef(null);
  const readyRef = useRef(false);

  /* =========================================================
     VIDEO READY + PLAY
  ========================================================= */

  const startVideo = useCallback(async () => {
    const video = videoRef.current;

    if (!video) return;

    try {
      /*
        Explicitly force muted inline playback.
        This is important for production autoplay.
      */

      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.autoplay = true;

      /*
        Actually start the video.
      */

      await video.play();

      console.log(
        "VIDYA HERO VIDEO PLAYING"
      );

      /*
        Only tell IntroReveal that the video
        is ready AFTER play() succeeds.
      */

      if (!readyRef.current) {
        readyRef.current = true;
        onVideoReady?.();
      }
    } catch (error) {
      console.error(
        "VIDYA HERO VIDEO PLAY FAILED:",
        error
      );
    }
  }, [onVideoReady]);


  /* =========================================================
     VIDEO EVENTS
  ========================================================= */

  const handleLoadedData = () => {
    console.log(
      "VIDYA HERO VIDEO LOADED"
    );

    startVideo();
  };

  const handleCanPlay = () => {
    console.log(
      "VIDYA HERO VIDEO CAN PLAY"
    );

    startVideo();
  };

  const handlePlay = () => {
    console.log(
      "VIDYA HERO VIDEO PLAY EVENT"
    );

    if (!readyRef.current) {
      readyRef.current = true;
      onVideoReady?.();
    }
  };


  /* =========================================================
     INITIAL PLAY ATTEMPT
  ========================================================= */

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    /*
      Try immediately.
    */

    startVideo();

    /*
      Try again when browser has loaded enough
      video data.
    */

    video.addEventListener(
      "loadeddata",
      startVideo
    );

    video.addEventListener(
      "canplay",
      startVideo
    );

    return () => {
      video.removeEventListener(
        "loadeddata",
        startVideo
      );

      video.removeEventListener(
        "canplay",
        startVideo
      );
    };
  }, [startVideo]);


  return (
    <section className="vidya-hero">

      {/* =====================================================
          BACKGROUND VIDEO
      ====================================================== */}

      <div className="vidya-hero-video-box">

        <video
          ref={videoRef}
          className="vidya-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"

          onLoadedData={
            handleLoadedData
          }

          onCanPlay={
            handleCanPlay
          }

          onPlay={
            handlePlay
          }
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