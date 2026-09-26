import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";

import "./About.css";

const ABOUT = {
  heading: "Our Learning Philosophy",

  paragraph1:
    "At Vidya Academy, we believe that education is more than the lessons taught in a classroom. Every child brings unique interests, abilities, and ideas to school, and our approach encourages them to explore these qualities with curiosity and confidence. We focus on building strong academic foundations while creating meaningful opportunities for students to question, discover, and understand the world around them.",

  paragraph2:
    "Learning at Vidya Academy is designed to be engaging, purposeful, and connected to everyday life. Through classroom discussions, practical activities, creative experiences, and collaborative projects, students are encouraged to participate actively in their own learning. We value the process of learning as much as the outcome, helping children develop independent thinking, problem-solving skills, and the confidence to express their ideas.",

  image: "/images/vidya-about-campus.png",

  fallbackImage:
    "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1400&q=90",
};

const EASE = [0.22, 1, 0.36, 1];

export default function About() {
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  const reduceMotion = useReducedMotion();

  const [imageSrc, setImageSrc] = useState(ABOUT.image);

  /* Replay the effects when the user scrolls away and returns. */
  const imageInView = useInView(imageRef, {
    once: false,
    amount: 0.2,
  });

  const contentInView = useInView(contentRef, {
    once: false,
    amount: 0.15,
  });

  const showImage = reduceMotion || imageInView;
  const showContent = reduceMotion || contentInView;

  const handleImageError = () => {
    if (imageSrc !== ABOUT.fallbackImage) {
      setImageSrc(ABOUT.fallbackImage);
    }
  };

  return (
    <section
      className="raya-about"
      id="about"
      aria-labelledby="raya-about-title"
    >
      {/* ================================================
          THREE GENTLE GREEN BACKGROUND CURVES
          These continue into Academic Programmes.
      ================================================= */}

      {/* <svg
        className="raya-about-background-lines"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      > */}
        {/* Broad arc from upper-left toward the centre */}
        {/* <path
          d="
            M -180 80
            C 300 100, 640 300, 820 900
          "
        /> */}

        {/* Gentle diagonal sweep through the centre */}
        {/* <path
          d="
            M 180 -100
            C 640 180, 870 520, 1080 900
          "
        /> */}

        {/* Large arc entering from the right */}
        {/* <path
          d="
            M 1530 80
            C 1130 220, 1150 570, 1280 900
          "
        />
      </svg> */}

      {/* ================================================
          MAIN CONTENT
      ================================================= */}

      <div className="raya-about-container">
        {/* LEFT — CAMPUS IMAGE */}

        <div
          ref={imageRef}
          className="raya-about-image-area"
        >
          <motion.div
            className="raya-about-image"
            initial={false}
            animate={
              showImage
                ? {
                    opacity: 1,
                    y: 0,
                    clipPath: "inset(0 0% 0 0)",
                  }
                : {
                    opacity: 0,
                    y: 30,
                    clipPath: "inset(0 100% 0 0)",
                  }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.95,
              ease: EASE,
            }}
          >
            <img
              src={imageSrc}
              alt="Vidya Academy school campus"
              className="raya-about-photo"
              loading="lazy"
              onError={handleImageError}
            />

            <div
              className="raya-about-image-shade"
              aria-hidden="true"
            />

            <div className="raya-about-image-label">
              <span className="raya-about-image-label-line" />
              <span>THE VIDYA EXPERIENCE</span>
            </div>

            <div className="raya-about-image-bottom">
              <div className="raya-about-image-caption">
                <span>DISCOVER OUR WORLD</span>

                <strong>
                  A place to learn.
                  <br />
                  A place to belong.
                </strong>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT — ABOUT CONTENT */}

        <div
          ref={contentRef}
          className="raya-about-content"
        >
          <motion.h2
            className="raya-about-heading"
            id="raya-about-title"
            initial={false}
            animate={
              showContent
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 35 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.8,
              ease: EASE,
            }}
          >
            {ABOUT.heading}
          </motion.h2>

          <motion.div
            className="raya-about-divider"
            aria-hidden="true"
            initial={false}
            animate={{
              scaleX: showContent ? 1 : 0,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.9,
              delay: reduceMotion || !contentInView ? 0 : 0.12,
              ease: EASE,
            }}
          />

          <motion.p
            className="raya-about-paragraph"
            initial={false}
            animate={
              showContent
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 25 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.75,
              delay: reduceMotion || !contentInView ? 0 : 0.15,
              ease: EASE,
            }}
          >
            {ABOUT.paragraph1}
          </motion.p>

          <motion.p
            className="raya-about-paragraph"
            initial={false}
            animate={
              showContent
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 25 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.75,
              delay: reduceMotion || !contentInView ? 0 : 0.27,
              ease: EASE,
            }}
          >
            {ABOUT.paragraph2}
          </motion.p>

          <motion.div
            className="raya-about-footer"
            initial={false}
            animate={
              showContent
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 15 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.65,
              delay: reduceMotion || !contentInView ? 0 : 0.38,
              ease: EASE,
            }}
          >
            <span>LEARN</span>
            <span className="raya-about-footer-dot" />

            <span>EXPLORE</span>
            <span className="raya-about-footer-dot" />

            <span>GROW</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}