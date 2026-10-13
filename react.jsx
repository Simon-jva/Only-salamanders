import React from "react";
import { createRoot } from "react-dom/client";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import mangrove from "./mangrove.jpg";
import "./style.css";
import { BrowserRouter, Routes, Route, useNavigate, Link } from "react-router-dom";

const PAGES = 4;

function Home() {
    const navigate = useNavigate();
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
      <div1 onClick={() => navigate("/fire")}></div1>
        <img src="/salamanders/fire_salamander.png" alt="Fire Salamander" className="fire-salamander" />
        <h3>FIRE SALAMANDER</h3>
      </ParallaxLayer>

      <ParallaxLayer offset={1.5} speed={0.5} >
      <div2 onClick={() => navigate("/rough-skinned")}></div2>
        <h4>ROUGH-SKINNED NEWT</h4>
        <img src="/salamanders/Rough-Skinned-Newt.png" alt="Rough Skinned Newt" className="Rough-Skinned-Newt" />
      </ParallaxLayer>

      <ParallaxLayer offset={2.0} speed={0.5} >
      <div3 onClick={() => navigate("/axolotyl")}></div3>
        <h5>AXOLOTYL</h5>
        <img src="/salamanders/axolotl.png" alt="axolotl" className="axolotl" />
      </ParallaxLayer>

      <ParallaxLayer offset={2.5} speed={0.5} >
      <div4 onClick={() => navigate("/mud")}></div4>
        <h6>MUDPUPPY</h6>
        <img src="/salamanders/mudpuppy.png" alt="mudpuppy" className="mudpuppy" />
        </ParallaxLayer>

        <ParallaxLayer offset={3.0} speed={0.5} >
        <div5 onClick={() => navigate("/giant")}></div5>
        <h7>JAPANASE GIANT SALAMANDER</h7>
        <img src="/salamanders/japanese-giant-salamander.png" alt="japanese-giant-salamander" className="japanese-giant-salamander" />
      </ParallaxLayer>
    </Parallax>
  );
}
//SEPERATE PAGES----------------------------------------------------------------------------------------------------------
function FireSalamanderPage() {
    return (
      <div className="info-page">
        <h1>Fire Salamander</h1>
        <p>This is where the info will go.</p>
      </div>
    );
  }

  function roughskinnednewtPage() {
    return (
      <div className="info-page">
        <h1>Fire Salamander</h1>
        <p>This is where the info will go.</p>
      </div>
    );
  }


  function axolotylPage() {
    return (
      <div className="info-page">
        <h1>Fire Salamander</h1>
        <p>This is where the info will go.</p>
      </div>
    );
  }

  function mudPage() {
    return (
      <div className="info-page">
        <h1>Fire Salamander</h1>
        <p>This is where the info will go.</p>
      </div>
    );
  }


  function giantPage() {
    return (
      <div className="info-page">
        <h1>Fire Salamander</h1>
        <p>This is where the info will go.</p>
      </div>
    );
  }

  function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fire" element={<FireSalamanderPage />} />
          <Route path="/rough-skinned" element={<roughskinnednewtPage/>} />
          <Route path="/axolotyl" element={<axolotylPage/>} />
          <Route path="/giant" element={<giantPage/>} />
        </Routes>
      </BrowserRouter>
    );
  }
createRoot(document.getElementById("root")).render(<App />);