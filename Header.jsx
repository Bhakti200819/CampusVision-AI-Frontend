import { useState, useEffect } from "react";
import "./App.css";

import {
  FaShieldAlt,
  FaCrosshairs,
  FaTrash,
  FaHistory,
} from "react-icons/fa";

function App() {

  // =========================
  // STATES
  // =========================

  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);

  const [outputImage, setOutputImage] = useState("");
  
  const [result, setResult] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [emergency, setEmergency] = useState(false);

  const [loading, setLoading] = useState(false);

  const [cameraOn, setCameraOn] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const [criticalAlert, setCriticalAlert] = useState(false);

  const [screenFlash, setScreenFlash] = useState(false);

  const [shake, setShake] = useState(false);

  const [targetLocked, setTargetLocked] = useState(false);

  const [securityBreach, setSecurityBreach] = useState(false);

  const [missionMode, setMissionMode] = useState(false);

  const [booting, setBooting] = useState(true);

  const [time, setTime] = useState(new Date());

  const [history, setHistory] = useState([]);

  const [logs, setLogs] = useState([
    
    "✔ System Started",
    "✔ AI Dashboard Ready", 
    "✔ Waiting For Image..."
  ]);

  // =========================
  // REAL TIME CLOCK
  // =========================

  useEffect(() => {

    const timer = setInterval(() => {

      setTime(new Date());

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  // =========================
  // BOOT SCREEN
  // =========================

  useEffect(() => {

    const boot = setTimeout(() => {

      setBooting(false);

    }, 3000);

    return () => clearTimeout(boot);

  }, []);

  // =========================
  // DANGER ALARM
  // =========================

  function playDangerAlarm() {

    const ctx = new (window.AudioContext || window.webkitAudioContext)();

    const master = ctx.createGain();

    master.connect(ctx.destination);

    master.gain.value = 0.5;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();

    const gain1 = ctx.createGain();
    const gain2 = ctx.createGain();

    osc1.type = "sawtooth";
    osc2.type = "triangle";

    osc1.connect(gain1);
    osc2.connect(gain2);

    gain1.connect(master);
    gain2.connect(master);

    gain1.gain.value = 0.25;
    gain2.gain.value = 0.18;

    osc1.start();
    osc2.start();

    let t = ctx.currentTime;

    for (let i = 0; i < 10; i++) {

      osc1.frequency.linearRampToValueAtTime(420, t);
      osc2.frequency.linearRampToValueAtTime(210, t);

      osc1.frequency.linearRampToValueAtTime(1050, t + 0.45);
      osc2.frequency.linearRampToValueAtTime(520, t + 0.45);

      osc1.frequency.linearRampToValueAtTime(420, t + 0.9);
      osc2.frequency.linearRampToValueAtTime(210, t + 0.9);

      t += 0.9;
    }

    osc1.stop(t);
    osc2.stop(t);
  }
    // =========================
  // IMAGE
  // =========================

  const handleImage = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);

    setImage(URL.createObjectURL(file));

  };

  // =========================
  // START CAMERA (DEMO)
  // =========================

  const startCamera = () => {

    setCameraOn(true);

  };

  // =========================
// IMAGE DETECTION
// =========================

const detectWeapon = async () => {

  if (!selectedFile) {
    alert("Please Upload Image");
    return;
  }

  const formData = new FormData();
  formData.append("file", selectedFile);

  setLoading(true);

  try {

    const response = await fetch(
      "http://127.0.0.1:8000/weapon/detect",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Backend Error");
    }

    const data = await response.json();

    const weapon = data.weapon || "No Weapon";
    const conf = Number(data.confidence || 0);

    setResult(weapon);
    setConfidence(conf);
    if (conf > 70) {

    setEmergency(true);

    setTimeout(() => {

        setEmergency(false);

    }, 4000);

}

    // ALERT
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 5000);

    // SIREN + FLASH
    if (
      weapon.toLowerCase() !== "no weapon" &&
      conf > 60
    ) {

      playDangerAlarm();

      setScreenFlash(true);
      setShake(true);
      setTargetLocked(true);
      setSecurityBreach(true);
      setMissionMode(true);

      setTimeout(() => {
        setScreenFlash(false);
        setShake(false);
        setTargetLocked(false);
        setSecurityBreach(false);
        setMissionMode(false);
      }, 5000);

    }

    if (data.output_image) {

      setOutputImage(
        "http://127.0.0.1:8000/" +
        data.output_image.replace(/\\/g, "/") +
        "?t=" +
        Date.now()
      );

    }
    setHistory((prev) => [
  {
    weapon,
    confidence: conf,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  },
  ...prev,
]);

  } catch (err) {

    console.log(err);
    alert("Backend Error");

  } finally {

    setLoading(false);

  }

};

  // =========================
  // CLEAR
  // =========================

  const clearAll = () => {

    setSelectedFile(null);

    setImage(null);

    setOutputImage("");

    setResult("");

    setConfidence(0);

  };
    // =========================
  // UI START
  // =========================

  return (

    <>
    {emergency && (
    <div className="screen-flash"></div>
)}

      {booting && (

        <div className="boot-screen">

          <h1>🛡 AI SECURITY SURVEILLANCE</h1>

          <p>Initializing AI Engine...</p>

          <p>Loading Neural Network...</p>

          <p>Connecting Cameras...</p>

          <p>Starting Detection Services...</p>

          <div className="boot-loader"></div>

        </div>

      )}

      <div className="cyber-bg">

        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>

      </div>

      {screenFlash && <div className="screen-flash"></div>}
      {showAlert && <div className="emergency-overlay"></div>}

      {securityBreach && (

        <div className="breach">

          🚨 SECURITY BREACH

        </div>

      )}

      {targetLocked && (

        <div className="target-lock">

          🎯 TARGET LOCKED

        </div>

      )}

      {missionMode && (

        <div className="mission-mode">

          ⚠ MISSION MODE ACTIVATED ⚠

        </div>

      )}
      {showAlert && <div className="siren"></div>}

      <div className={`app ${shake ? "shake" : ""}`}>

        <div className="topbar">
          {showAlert && (

<div className="critical-text">

⚠ AI SECURITY BREACH DETECTED ⚠

</div>

)}

    <div className="live-dot"></div>  



          <div className="logo">

            🛡 AI SECURITY

          </div>

          <div className="top-center">

            <h2>REAL TIME WEAPON DETECTION</h2>

            <p>AI Powered Security Surveillance Dashboard</p>

          </div>

          <div className="top-right">

            <div className="status-online">

              🟢 SYSTEM ONLINE

            </div>

            <div className="clock">

              {time.toLocaleTimeString()}

            </div>

            <div className="date">

              {time.toLocaleDateString()}

            </div>

          </div>

        </div>
        {/* ===================== STATS ===================== */}

<div className="stats">

  <div className="stat-card pulse-blue">
    <h3>Total Scans</h3>
    <h1>{history.length}</h1>
    <small>Images Processed</small>
  </div>

  <div className="stat-card pulse-red">
    <h3>Threats</h3>
    <h1>{history.filter(item => item.confidence > 70).length}</h1>
    <small>Detected</small>
  </div>

  <div className="stat-card pulse-green">
    <h3>Accuracy</h3>
    <h1>{confidence}%</h1>
    <small>AI Confidence</small>
  </div>

  <div className="stat-card pulse-orange">
    <h3>System</h3>
    <h1 className="online-text">ONLINE</h1>
    <small>AI Running</small>
  </div>

</div>


{/* ===================== AI STATUS ===================== */}

<div className="stats">

  <div className="stat-card">
    <h3>AI Engine</h3>
<h1>ACTIVE</h1>
<small>Real-Time Surveillance</small>
  </div>

  <div className="stat-card">
    <h3>Backend</h3>
    <h1>FASTAPI</h1>
    <small>Connected</small>
  </div>

  <div className="stat-card">
    <h3>Mode</h3>
    <h1>IMAGE</h1>
    <small>Detection</small>
  </div>

  <div className="stat-card">
    <h3>Last Scan</h3>
    <h1>{result || "--"}</h1>
    <small>Latest Result</small>
  </div>

</div>
{/* ===================== DASHBOARD ===================== */}

<div className="dashboard">

  {/* ================= LEFT PANEL ================= */}

  <div className="left-panel">

    {/* Upload Card */}

    <div className="card">

      <h2>📂 Upload Image</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
      />

      <button
        className="detect-btn"
        onClick={detectWeapon}
      >
        🔍 Detect Weapon
      </button>

      <button
        className="clear-btn"
        onClick={clearAll}
      >
        🗑 Clear
      </button>

    </div>
    </div>
  {/* ================= CENTER PANEL ================= */}

  <div className="center-panel">
    
  {/* ================= ORIGINAL IMAGE ================= */}

<div className="card">

  <h2>🖼 Original Image</h2>

  {image ? (

    <div className="scan-box">

      <img
        src={image}
        alt="Original"
        className="result-image"
      />

      <div className="scanner"></div>

      <div className="crosshair"></div>

      <div className="corner tl"></div>
      <div className="corner tr"></div>
      <div className="corner bl"></div>
      <div className="corner br"></div>

      <div className="hud top-left">
        INPUT IMAGE
      </div>

    </div>

  ) : (

    <p>No Image Selected</p>

  )}

</div>
</div>
{/* ================= RIGHT PANEL ================= */}

<div className="right-panel">

</div>

{/* dashboard close */}
</div>
{/* AI Analysis */}

    
{/* ================= SYSTEM STATUS ================= */}

<div className="dashboard-card">

    <h2 className="section-title">
        🛡 System Status
    </h2>

    <div className="status-row">
        <span>AI Engine</span>
        <span className="status active">ACTIVE</span>
    </div>

    <div className="status-row">
        <span>Backend</span>
        <span className="status online">ONLINE</span>
    </div>

    <div className="status-row">
        <span>Security</span>
        <span className="status active">MONITORING</span>
    </div>

</div>


{/* ================= FOOTER ================= */}

<footer className="footer">

  <p>
    AI Security Surveillance System © 2026
  </p>

</footer>
{/* ================= LIVE ALERT BAR ================= */}

{result && result !== "No Weapon" && (

  <div className="live-alert-bar">

    <span className="blink-dot"></span>

    <marquee behavior="scroll" direction="left" scrollAmount="8">

      🚨 WARNING : {result.toUpperCase()} DETECTED |
      CONFIDENCE : {confidence}% |
      SECURITY TEAM NOTIFIED |
      AI SURVEILLANCE ACTIVE

    </marquee>

  </div>

)}

</div>

  
  {/* RIGHT */}
<div className="right-panel">

  {/* Threat Details */}

  <div className="card">

    <h2>🚨 Threat Details</h2>

    <div className="info-row">
      <span>Weapon</span>
      <span>{result || "None"}</span>
    </div>

    <div className="info-row">
      <span>Confidence</span>
      <span>{confidence}%</span>
    </div>

    <div className="info-row">
      <span>Status</span>
      <span>
        {confidence > 70 ? "THREAT DETECTED" : "SAFE"}
      </span>
    </div>

    <div className="info-row">
      <span>Date</span>
      <span>{time.toLocaleDateString()}</span>
    </div>

    <div className="info-row">
      <span>Time</span>
      <span>{time.toLocaleTimeString()}</span>
    </div>

  </div>
  {/* ================= DETECTION HISTORY ================= */}

<div className="card history-card">

  <h2>📋 Detection History</h2>
    <div className="info-row">
      <span> Weapon</span>
   <strong>{result || "--"}</strong>
   </div>

  {history.length === 0 ? (
    <p className="empty-history">
      No Detection History Available
    </p>
  
  ) : (

    <div className="history-list">
      

      {history.map((item, index) => (

        <div className="history-item" key={index}>

          <div>
          <div className="info-row">
          <span>Detect</span>
            <strong>{item.weapon}</strong>
          </div>
          </div>

        
          <div className="info-row">
            <span>Confidence</span>
          <div>{item.confidence}%</div>
          </div>
        
          <div className="info-row">
            <span>Date</span>
          <div>{item.date}</div>
          </div>

          <div className="info-row">
            <span>Time</span>
          <div>{item.time}</div>
          </div>

        </div>

      ))}

    </div>

  )}

</div>


  {/* Live Camera */}

  <div className="card">

    <h2>📹 Live Camera</h2>

    <div className="camera-preview">

      {cameraOn ? (

        <video
          id="liveCamera"
          autoPlay
          muted
          playsInline
          className="video-preview"
        />

      ) : (

        <div className="camera-placeholder">

          Camera Offline

        </div>

      )}

    </div>

  

  {/* AI Logs */}

  <div className="card">

    <h2>📜 AI Logs</h2>

    <div className="logs-card">
  

      {logs.map((log, index) => (

        <p key={index}>{log}</p>

      ))}

    </div>

  </div>
        

        <footer className="footer">

          <div className="footer-left">

            🛡 AI SECURITY SURVEILLANCE SYSTEM

          </div>

          <div className="footer-center">

            Powered By AI Vision Engine • Weapon Detection • Real Time Monitoring

          </div>

          <div className="footer-right">

            {time.toLocaleDateString()} | {time.toLocaleTimeString()}

          </div>

        </footer>

      </div>
      </div>
    

    </>

  );

}

export default App;