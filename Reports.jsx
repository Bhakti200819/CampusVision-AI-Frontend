import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function Reports() {

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(
        localStorage.getItem("sentinel_history")
      ) || [];

    setHistory(data);
  }, []);

  const totalImages = history.length;

  const weaponsDetected = history.filter(
    item => item.weapon.toLowerCase() !== "no weapon"
  ).length;

  const safeImages =
    totalImages - weaponsDetected;

  const avgConfidence =
    totalImages > 0
      ? (
          history.reduce(
            (sum, item) =>
              sum + Number(item.confidence),
            0
          ) / totalImages
        ).toFixed(1)
      : 0;

  const latest =
    history.length > 0
      ? history[0]
      : null;

  const chartData = [
    {
      name: "Threat",
      value: weaponsDetected,
    },
    {
      name: "Safe",
      value: safeImages,
    },
  ];

  const barData = [
    {
      name: "Images",
      Total: totalImages,
    },
    {
      name: "Threats",
      Total: weaponsDetected,
    },
    {
      name: "Safe",
      Total: safeImages,
    },
  ];

  const COLORS = [
    "#ff3b3b",
    "#00ff88",
  ];

  const exportPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.setTextColor(0,102,204);
    doc.text(
      "SENTINEL AI",
      70,
      20
    );

    doc.setFontSize(13);
    doc.setTextColor(80);

    doc.text(
      "Autonomous Security Surveillance Report",
      42,
      30
    );

    autoTable(doc,{
      startY:40,
      head:[["System","Value"]],
      body:[
        ["Total Images",totalImages],
        ["Threats Found",weaponsDetected],
        ["Safe Images",safeImages],
        ["Detection Accuracy",avgConfidence+"%"],
        ["Average Response Time","24 ms"],
        ["AI Engine","ONLINE"],
      ],
    });

    if(latest){

      autoTable(doc,{
        startY:
          doc.lastAutoTable.finalY + 15,

        head:[
          ["Latest Detection","Value"]
        ],

        body:[
          ["Weapon",latest.weapon],
          ["Confidence",latest.confidence+"%"],
          ["Date",latest.date],
          ["Time",latest.time],
        ],
      });

    }

    doc.save("Sentinel_AI_Report.pdf");

  };

  return (

    <div className="page-container">

      <Link
        to="/"
        className="back-home"
      >
        🏠 Back to Dashboard
      </Link>
            {/* ========================================== */}
      {/* REPORT SUMMARY */}
      {/* ========================================== */}

      <div className="report-cards">

        <div className="report-box">
          <h2>{avgConfidence}%</h2>
          <p>Detection Accuracy</p>
        </div>

        <div className="report-box">
          <h2>{totalImages}</h2>
          <p>Total Images</p>
        </div>

        <div className="report-box">
          <h2>{weaponsDetected}</h2>
          <p>Threats Found</p>
        </div>

        <div className="report-box">
          <h2>24 ms</h2>
          <p>Response Time</p>
        </div>

      </div>

      <h1>📋 REPORTS</h1>

      <div style={{ marginBottom: "20px" }}>

        <button
          className="detect-btn"
          onClick={exportPDF}
        >
          📥 Export Security Report
        </button>

      </div>

      {/* ========================================== */}
      {/* LEFT + RIGHT LAYOUT */}
      {/* ========================================== */}

      <div className="reports-layout">

        {/* LEFT */}

        <div className="left-report">

          <div className="page-card">

            <h2>📋 System Report</h2>

            <table className="report-table">

              <tbody>

                <tr>
                  <td>Total Images Analyzed</td>
                  <td>{totalImages}</td>
                </tr>

                <tr>
                  <td>Weapons Detected</td>
                  <td>{weaponsDetected}</td>
                </tr>

                <tr>
                  <td>Safe Images</td>
                  <td>{safeImages}</td>
                </tr>

                <tr>
                  <td>Detection Accuracy</td>
                  <td>{avgConfidence}%</td>
                </tr>

                <tr>
                  <td>Average Response Time</td>
                  <td>24 ms</td>
                </tr>

                <tr>
                  <td>AI Engine Status</td>
                  <td style={{ color: "#00ff88" }}>
                    ONLINE
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>

        {/* RIGHT */}

        <div className="right-report">

          {latest && (

            <div className="latest-report-card">

              <h2>🎯 Latest Detection</h2>

              <p><strong>Weapon :</strong> {latest.weapon}</p>

              <p><strong>Confidence :</strong> {latest.confidence}%</p>

              <p><strong>Date :</strong> {latest.date}</p>

              <p><strong>Time :</strong> {latest.time}</p>

            </div>

          )}

        </div>

      </div>
      {/* ====================================================== */}
{/* RIGHT SIDE - LATEST DETECTION */}
{/* ====================================================== */}

<div className="right-report">

  {latest ? (

    <div className="latest-report-card">

      <h2>🎯 Latest Detection</h2>

      <div className="latest-item">
        <span>Weapon</span>
        <strong>{latest.weapon}</strong>
      </div>

      <div className="latest-item">
        <span>Confidence</span>
        <strong>{latest.confidence}%</strong>
      </div>

      <div className="latest-item">
        <span>Date</span>
        <strong>{latest.date}</strong>
      </div>

      <div className="latest-item">
        <span>Time</span>
        <strong>{latest.time}</strong>
      </div>

      <div className="latest-status">
        {latest.weapon.toLowerCase() === "no weapon" ? (
          <span className="status-safe">🟢 SAFE AREA</span>
        ) : (
          <span className="status-danger">🔴 THREAT DETECTED</span>
        )}
      </div>

    </div>

  ) : (

    <div className="latest-report-card">

      <h2>🎯 Latest Detection</h2>

      <p>No Detection Available</p>

    </div>

  )}

</div>

      {/* ======================= */}
      {/* LIVE DETECTION ANALYTICS */}
      {/* ======================= */}

      <div className="page-card">

        <h2>📊 Live Detection Analytics</h2>

        <div className="analytics-container">

          {/* BAR CHART */}

          <div className="chart-card">

            <h3>Threat Statistics</h3>

            <ResponsiveContainer width="100%" height={300}>

              <BarChart data={barData}>

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="Total"
                  fill="#00d9ff"
                  radius={[8, 8, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

          {/* PIE CHART */}

          <div className="chart-card">

            <h3>Threat Ratio</h3>

            <ResponsiveContainer width="100%" height={300}>

              <PieChart>

                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={110}
                  label
                >

                  {chartData.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />

                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

           </ResponsiveContainer>

           </div>

          </div>

        </div>

      </div>

  );

}

export default Reports;