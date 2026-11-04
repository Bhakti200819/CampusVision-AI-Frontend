import { Link } from "react-router-dom";
function Vision() {
  return (
    <div className="page-container">

      <Link to="/" className="back-home">
    🏠 Back to Dashboard
</Link>

      <h1>🎯 OUR VISION</h1>

      <div className="page-card">

        <div className="vision-grid">

  <div className="vision-box">
    🛡
    <h3>Smart Surveillance</h3>
    <p>Continuous monitoring using AI-powered vision.</p>
  </div>

  <div className="vision-box">
    🤖
    <h3>AI Detection</h3>
    <p>Detect dangerous objects with high accuracy.</p>
  </div>

  <div className="vision-box">
    ⚡
    <h3>Real-Time Alerts</h3>
    <p>Generate instant alerts during emergencies.</p>
  </div>

  <div className="vision-box">
    🌍
    <h3>Public Safety</h3>
    <p>Support smart city and industrial security.</p>
  </div>

</div>

        <h2>Vision Statement</h2>

        <p>
          To build an intelligent AI surveillance platform capable of
          detecting weapons, monitoring suspicious activities, and
          protecting public spaces through real-time computer vision.
        </p>

        <h2>Long-Term Goal</h2>

        <p>
          Develop a next-generation autonomous security system that
          supports smart cities, industries, airports, railway stations,
          schools, hospitals and government organizations.
        </p>

      </div>

    </div>
  );
}

export default Vision;