import React, { useEffect } from "react"; // TRACKING: added useEffect
import { createRoot } from "react-dom/client";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import mangrove from "./mangrove.jpg";
import "./style.css";
import { BrowserRouter, Routes, Route, useNavigate, Link } from "react-router-dom";
import posthog from "posthog-js"; // TRACKING
import { PostHogProvider, usePostHog } from "@posthog/react"; // TRACKING

// TRACKING: turns PostHog on using the key in your .env file
posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  capture_pageview: "history_change",
  capture_pageleave: true,
});

// TRACKING: times how long someone stays on a page, sends it when they leave
function useTimeOnPage(salamanderId) {
  const ph = usePostHog();

  useEffect(() => {
    const start = Date.now();
    let sent = false;

    const sendTime = () => {
      if (sent) return;
      sent = true;
      ph.capture(
        "salamander_page_time",
        { salamander_id: salamanderId, seconds: Math.round((Date.now() - start) / 1000) },
        { transport: "sendBeacon" }
      );
    };

    window.addEventListener("pagehide", sendTime);
    return () => {
      window.removeEventListener("pagehide", sendTime);
      sendTime();
    };
  }, [salamanderId, ph]);
}

const PAGES = 4;

function Home() {
    const navigate = useNavigate();
    const ph = usePostHog(); // TRACKING

    // TRACKING: records which salamander was clicked, then opens its page
    const openSalamander = (id, path) => {
      ph.capture("salamander_clicked", { salamander_id: id });
      navigate(path);
    };

  return (
    <Parallax pages={PAGES}>
      {/* Background image, stretched across every page so you scroll down through it */}
      <ParallaxLayer
        offset={0}
        speed={0}
        factor={PAGES}
        style={{
          backgroundImage: `url(${mangrove})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Text floats over the image at a different speed */}
      <ParallaxLayer offset={0.2} speed={0.5} >
        <h1></h1>
        <h2>ONLY SALAMANDERS</h2>
      </ParallaxLayer>

      <ParallaxLayer offset={1.0} speed={0.5} >
        <div className="salamander-link" onClick={() => openSalamander("fire", "/fire")}>
          <img src="/salamanders/fire_salamander.png" alt="Fire Salamander" className="fire-salamander" />
          <h3>FIRE SALAMANDER</h3>
        </div>
      </ParallaxLayer>

      <ParallaxLayer offset={1.5} speed={0.5} >
        <div className="salamander-link" onClick={() => openSalamander("Rough-skinned", "/rough-skinned")}>
          <h4>ROUGH-SKINNED NEWT</h4>
          <img src="/salamanders/Rough-Skinned-Newt.png" alt="Rough Skinned Newt" className="Rough-Skinned-Newt" />
        </div>
      </ParallaxLayer>

      <ParallaxLayer offset={2.0} speed={0.5} >
        <div className="salamander-link" onClick={() => openSalamander("Axolotl", "/axolotyl")}>
          <h5>AXOLOTYL</h5>
          <img src="/salamanders/axolotl.png" alt="axolotl" className="axolotl" />
        </div>
      </ParallaxLayer>

      <ParallaxLayer offset={2.5} speed={0.5} >
        <div className="salamander-link" onClick={() => openSalamander("mudpuppy", "/mud")}>
          <h6>MUDPUPPY</h6>
          <img src="/salamanders/mudpuppy.png" alt="mudpuppy" className="mudpuppy" />
        </div>
      </ParallaxLayer>

      <ParallaxLayer offset={3.0} speed={0.5} >
        <div className="salamander-link" onClick={() => openSalamander("japanese-giant", "/giant")}>
          <h7>JAPANASE GIANT SALAMANDER</h7>
          <img src="/salamanders/japanese-giant-salamander.png" alt="japanese-giant-salamander" className="japanese-giant-salamander" />
        </div>
      </ParallaxLayer>
    </Parallax>
  );
}
//SEPERATE PAGES----------------------------------------------------------------------------------------------------------
//SEPERATE PAGES----------------------------------------------------------------------------------------------------------
function FireSalamanderPage() {
  useTimeOnPage("fire"); // TRACKING
  return (
    <div className="info-page">
      <h1>Fire Salamander</h1>
      <p>dfdsdfdf</p>
    </div>
  );
}

function RoughSkinnedNewtPage() {
  useTimeOnPage("rough-skinned"); // TRACKING
  return (
    <div className="info-page">
      <h1>Rough-skinned salamander</h1>
      <p>dfjdsfnfds</p>
    </div>
  );
}

function AxolotylPage() {
  useTimeOnPage("axolotl"); // TRACKING
  return (
    <div className="info-page">
      <h1>axolotl</h1>
      <p>dffddsdfs</p>
    </div>
  );
}

function MudPage() {
  useTimeOnPage("mudpuppy"); // TRACKING
  return (
    <div className="info-page">
      <h1>mud puppy</h1>
      <p>dfdsfddf</p>
    </div>
  );
}

function GiantPage() {
  useTimeOnPage("japanese-giant"); // TRACKING
  return (
    <div className="info-page">
      <h1>japanese giant salamander</h1>
      <p>fhsahjs</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fire" element={<FireSalamanderPage />} />
        <Route path="/rough-skinned" element={<RoughSkinnedNewtPage />} />
        <Route path="/axolotyl" element={<AxolotylPage />} />
        <Route path="/mud" element={<MudPage />} />
        <Route path="/giant" element={<GiantPage />} />
      </Routes>
    </BrowserRouter>
  );
}
// TRACKING: wrapped App in PostHogProvider
createRoot(document.getElementById("root")).render(
  <PostHogProvider client={posthog}>
    <App />
  </PostHogProvider>
);
