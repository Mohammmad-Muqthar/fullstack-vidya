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
  const retryTimerRef = useRef(null);

  /* =========================================================
     MARK VIDEO READY
  ========================================================= */

  const markVideoReady = useCallback(() => {
    if (readyRef.current) return;

    readyRef.current = true;

    console.log("VIDYA HERO VIDEO READY");

    onVideoReady?.();
  }, [onVideoReady]);


  /* =========================================================
     START VIDEO
  ========================================================= */

  const startVideo = useCallback(async () => {
    const video = videoRef.current;

    if (!video) return;

    try {
      /*
        Force autoplay-safe settings.
      */

      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.autoplay = true;

      /*
        Make sure browser has a frame available.
      */

      if (video.readyState < 2) {
        return;
      }

      /*
        ACTUALLY START PLAYBACK.
      */

      const playPromise = video.play();

      if (playPromise !== undefined) {
        await playPromise;
      }

      console.log(
        "VIDYA HERO VIDEO PLAYING"
      );

      markVideoReady();

    } catch (error) {
      console.log(
        "Hero video waiting for playback...",
        error
      );

      /*
        Retry shortly.
        This helps slower Netlify connections.
      */

      if (!readyRef.current) {
        clearTimeout(retryTimerRef.current);

        retryTimerRef.current =
          window.setTimeout(() => {
            startVideo();
          }, 300);
      }
    }
  }, [markVideoReady]);


  /* =========================================================
     VIDEO LOADED
  ========================================================= */

  const handleLoadedData = () => {
    console.log(
      "VIDYA HERO VIDEO LOADED DATA"
    );

    startVideo();
  };


  /* =========================================================
     VIDEO CAN PLAY
  ========================================================= */

  const handleCanPlay = () => {
    console.log(
      "VIDYA HERO VIDEO CAN PLAY"
    );

    startVideo();
  };


  /* =========================================================
     VIDEO PLAY EVENT
  ========================================================= */

  const handlePlay = () => {
    console.log(
      "VIDYA HERO VIDEO PLAY EVENT"
    );

    markVideoReady();
  };


  /* =========================================================
     VIDEO WAITING
  ========================================================= */

  const handleWaiting = () => {
    console.log(
      "VIDYA HERO VIDEO BUFFERING"
    );
  };


  /* =========================================================
     VIDEO ERROR
  ========================================================= */

  const handleVideoError = () => {
    const video = videoRef.current;

    if (!video) return;

    console.error(
      "VIDYA HERO VIDEO ERROR",
      video.error
    );
  };


  /* =========================================================
     INITIAL VIDEO START
  ========================================================= */

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    /*
      Force autoplay-safe properties.
    */

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.autoplay = true;

    /*
      Browser gets an immediate attempt.
    */

    startVideo();

    /*
      Additional attempts after media loading.
    */

    video.addEventListener(
      "loadeddata",
      startVideo
    );

    video.addEventListener(
      "canplay",
      startVideo
    );

    video.addEventListener(
      "loadedmetadata",
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

      video.removeEventListener(
        "loadedmetadata",
        startVideo
      );

      clearTimeout(
        retryTimerRef.current
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

          /*
            AUTOPLAY
          */

          autoPlay

          /*
            REQUIRED FOR AUTOPLAY
          */

          muted

          /*
            REPEAT
          */

          loop

          /*
            MOBILE INLINE PLAYBACK
          */

          playsInline

          /*
            Tell browser to load video early.
          */

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

          onWaiting={
            handleWaiting
          }

          onError={
            handleVideoError
          }
        >

          <source
            src={HERO_VIDEO}
            type="video/mp4"
          />

          Your browser does not support video.
        </video>


        {/* =================================================
            DARK OVERLAY
        ================================================== */}

        <motion.div
          className="vidya-hero-overlay"

          initial={false}

          animate={{
            opacity: showContent
              ? 1
              : 0,
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
            LEFT DESCRIPTION
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