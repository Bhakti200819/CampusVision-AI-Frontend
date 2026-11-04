import { Link } from "react-router-dom";
function Mission() {
  return (
    <div className="page-container">

      <Link to="/" className="back-home">
    🏠 Back to Dashboard
</Link>

      <h1>🚀 OUR MISSION</h1>

      <div className="page-card">

        <div className="mission-grid">

  <div className="mission-box">
    ⚡
    <h3>Real-Time Detection</h3>
    <p>Detect weapons instantly using AI vision.</p>
  </div>

  <div className="mission-box">
    📡
    <h3>Continuous Monitoring</h3>
    <p>24×7 intelligent surveillance system.</p>
  </div>

  <div className="mission-box">
    🚨
    <h3>Instant Alerts</h3>
    <p>Generate emergency alerts immediately.</p>
  </div>

  <div className="mission-box">
    🛡
    <h3>Public Safety</h3>
    <p>Protect public places and smart cities.</p>
  </div>

  <div className="mission-box">
    🎯
    <h3>High Accuracy</h3>
    <p>AI-powered object detection with high precision.</p>
  </div>

  <div className="mission-box">
    🌍
    <h3>Future Ready</h3>
    <p>Scalable surveillance platform for industries and government.</p>
  </div>

</div>

        <h2>Mission Statement</h2>

        <p>
          To provide a secure, intelligent and reliable AI-based weapon
          detection system that helps security agencies identify threats
          quickly and accurately.
        </p>

        <h2>Objectives</h2>

        <ul>
          <li>Real-Time Weapon Detection</li>
          <li>Increase Public Safety</li>
          <li>Reduce Human Monitoring Effort</li>
          <li>Improve Detection Accuracy using AI</li>
          <li>Generate Instant Security Alerts</li>
          <li>Support Smart Surveillance Systems</li>
        </ul>

      </div>

    </div>
  );
}

export default Mission;