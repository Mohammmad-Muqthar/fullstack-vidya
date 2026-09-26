import { useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import IntroReveal from "./components/IntroReveal/IntroReveal";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import AcademicPrograms from "./components/AcademicPrograms/AcademicPrograms";
import LifeAtSchool from "./components/LifeAtSchool/LifeAtSchool";
import TheWay from "./components/TheWay/TheWay";
import QuickFact from "./components/QuickFact/QuickFact";
import FAQ from "./components/FAQ/FAQ";
import BottomBlur from "./components/BottomBlur/BottomBlur";
import Footer from "./components/Footer/Footer";

import "./App.css";

function App() {
  const [heroVideoReady, setHeroVideoReady] =
    useState(false);

  const [introFinished, setIntroFinished] =
    useState(false);

  return (
    <>
      <Navbar />

      <main id="main-content">
        <Hero
          onVideoReady={() => {
            setHeroVideoReady(true);
          }}
          showContent={introFinished}
        />

        <About />

        <AcademicPrograms />

        <LifeAtSchool />

        <TheWay />

        <QuickFact />

        <FAQ />

        <Footer />
      </main>

      <BottomBlur />

      {!introFinished && (
        <IntroReveal
          ready={heroVideoReady}
          onComplete={() => {
            setIntroFinished(true);
          }}
        />
      )}
    </>
  );
}

export default App;