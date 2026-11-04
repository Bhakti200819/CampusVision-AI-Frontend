import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = () => {
      const data =
        JSON.parse(localStorage.getItem("sentinel_history")) || [];
      setEvents(data);
    };

    loadEvents();

    const interval = setInterval(loadEvents, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-container">

      <Link to="/" className="back-home">
        🏠 Back to Dashboard
      </Link>

      <h1>📅 LIVE SECURITY EVENTS</h1>

      <div className="page-card">

        {/* SUMMARY */}

        <div className="event-summary">

          <div className="summary-card critical">
            <h4>🚨 Critical</h4>
            <h2>
              {events.filter(e => Number(e.confidence) >= 80).length}
            </h2>
          </div>

          <div className="summary-card high">
            <h4>⚠ High</h4>
            <h2>
              {
                events.filter(
                  e =>
                    Number(e.confidence) >= 60 &&
                    Number(e.confidence) < 80
                ).length
              }
            </h2>
          </div>

          <div className="summary-card safe">
            <h4>🟢 Safe</h4>
            <h2>
              {events.filter(e => Number(e.confidence) < 60).length}
            </h2>
          </div>

          <div className="summary-card total">
            <h4>📂 Total</h4>
            <h2>{events.length}</h2>
          </div>

        </div>

        {/* TABLE */}

        <table className="events-table">

          <thead>

            <tr>

              <th>TIME</th>
              <th>EVENT</th>
              <th>CAMERA</th>
              <th>LEVEL</th>
              <th>STATUS</th>

            </tr>

          </thead>

          <tbody>

            {events.length === 0 ? (

              <tr>
                <td colSpan="5">No Events Available</td>
              </tr>

            ) : (

              events.map((item, index) => (

                <tr key={index}>

                  <td>{item.time}</td>

                  <td>
                    {item.weapon.toLowerCase() === "no weapon"
                      ? "🟢 Area Clear"
                      : `🔫 ${item.weapon} Detected`}
                  </td>

                  <td>CAM-001</td>

                  <td>

                    <span
                      className={
                        Number(item.confidence) >= 80
                          ? "level critical"
                          : Number(item.confidence) >= 60
                          ? "level high"
                          : "level safe"
                      }
                    >

                      {Number(item.confidence) >= 80
                        ? "CRITICAL"
                        : Number(item.confidence) >= 60
                        ? "HIGH"
                        : "SAFE"}

                    </span>

                  </td>

                  <td>

                    <span className="status-live">

                      ● LIVE

                    </span>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Events;