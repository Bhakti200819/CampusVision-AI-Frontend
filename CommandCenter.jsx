import { useState, useEffect, useMemo, useRef } from "react";
import "./CommandCenter.css";
import LiveBubbles from "./LiveBubbles";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
const API_BASE_URL = "http://127.0.0.1:8000";

const getAuthToken = () => {
  try {
    const user = JSON.parse(
      localStorage.getItem("campusvision_user") || "{}"
    );

    return user.access_token || "";
  } catch {
    return "";
  }
};

const getAuthHeaders = () => {
  const token = getAuthToken();

  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
};

const handleExport = () => {
  window.print();
};

const exportAction = (
  <button
    className="cc-secondary-btn"
    onClick={handleExport}
  >
    ⇩ &nbsp; EXPORT VIEW
  </button>
);

const navItems = [
  ["⌂", "Command Center", "overview"],
  ["▦", "Live Surveillance", "surveillance"],
  ["◎", "AI Detection", "detection"],
  ["⚑", "Incidents & Alerts", "incidents"],
  ["♧", "Teacher Notifications", "notifications"],
  ["♙", "Teacher Management", "teachers"],
  ["▤", "Camera Network", "cameras"],
  ["▣", "Camera Management", "cameraManagement"],
  ["▣", "Classrooms", "classrooms"],
  ["⌁", "Intelligence & Analytics", "analytics"],
  ["⬡", "Evidence Vault", "evidence"],
  ["▤", "Detection History", "detectionHistory"],
  ["▧", "Reports", "reports"],
];

const cameras = [
  { id: "CAM-101-A", room: "CLASSROOM 101", name: "Front teaching zone", status: "DEMO FEED", kind: "normal", zone: "Teaching area" },
  { id: "CAM-101-B", room: "CLASSROOM 101", name: "Student seating zone", status: "MOBILE EVENT", kind: "alert", zone: "Student seating" },
  { id: "CAM-102-A", room: "CLASSROOM 102", name: "Main seating zone", status: "DEMO FEED", kind: "normal", zone: "Main seating" },
  { id: "CAM-103-A", room: "COMPUTER LAB 01", name: "Workstation aisle", status: "DEMO FEED", kind: "normal", zone: "Workstations" },
  { id: "CAM-104-A", room: "CLASSROOM 104", name: "Rear seating zone", status: "DEMO FEED", kind: "normal", zone: "Rear seating" },
  { id: "CAM-105-B", room: "SCIENCE LAB", name: "Practical work zone", status: "REVIEW", kind: "review", zone: "Practical benches" },
];
const activityData = {
  "24 HOURS": [
    { time: "00:00", detections: 2 },
    { time: "04:00", detections: 3 },
    { time: "08:00", detections: 5 },
    { time: "10:00", detections: 8 },
    { time: "12:00", detections: 6 },
    { time: "14:00", detections: 9 },
    { time: "16:00", detections: 5 },
    { time: "18:00", detections: 11 },
    { time: "NOW", detections: 7 },
  ],
  "7 DAYS": [
    { time: "MON", detections: 12 },
    { time: "TUE", detections: 18 },
    { time: "WED", detections: 14 },
    { time: "THU", detections: 22 },
    { time: "FRI", detections: 16 },
    { time: "SAT", detections: 8 },
    { time: "SUN", detections: 11 },
  ],
  "30 DAYS": [
    { time: "W1", detections: 42 },
    { time: "W2", detections: 56 },
    { time: "W3", detections: 39 },
    { time: "W4", detections: 68 },
  ],
};

const incidentsSeed = [
  { id: "INC-2408", title: "Mobile phone detected", room: "Classroom 101 · Camera B", time: "11:32:08", severity: "HIGH", confidence: "94.8%", status: "Open" },
  { id: "INC-2407", title: "Detection requires review", room: "Science Lab · Camera B", time: "10:48:41", severity: "MEDIUM", confidence: "81.2%", status: "Review" },
  { id: "INC-2406", title: "Mobile phone detected", room: "Classroom 104 · Camera A", time: "09:21:16", severity: "HIGH", confidence: "92.1%", status: "Open" },
];

function PageHeading({ eyebrow, title, subtitle, action }) {
  return (
    <div className="cc-page-heading">
      <div>
        <div className="cc-eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {action && <div className="cc-heading-actions">{action}</div>}
    </div>
  );
}

function Scene({ alert = false, index = 0 }) {
  return (
    <div className={`cc-scene scene-${index % 4}`}>
      <div className="cc-scene-window" />
      <div className="cc-scene-board"><i /></div>
      <div className="cc-scene-floor" />
      <div className="cc-desks">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="cc-desk"><i /></span>
        ))}
      </div>
      {alert && <div className="cc-detection-box"><b>MOBILE</b></div>}
      <span className="cc-scene-corner">SIMULATED CAMERA VIEW</span>
    </div>
  );
}

function CameraCards({ selectedCamera, onSelect, compact = false, list = cameras }) {
  return (
    <div className={`cc-camera-grid ${compact ? "compact" : ""}`}>
      {list.map((camera, index) => (
        <button
          key={camera.id}
          onClick={() => onSelect(camera)}
          className={`cc-camera-card ${selectedCamera?.id === camera.id ? "selected" : ""} ${camera.kind}`}
        >
          <Scene alert={camera.kind === "alert"} index={index} />
          <div className="cc-camera-meta">
            <div>
              <small>{camera.id}</small>
              <b>{camera.room}</b>
              <span>{camera.name}</span>
            </div>
            <div className={`cc-camera-state ${camera.kind}`}>
              {camera.kind === "alert" ? "! EVENT" : camera.kind === "review" ? "◉ REVIEW" : "● DEMO"}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

function Stat({ label, value, foot, tone = "blue", icon = "◈" }) {
  return (
    <article className="cc-kpi">
      <div className="cc-kpi-top">
        <span>{label}</span>
        <i>{icon}</i>
      </div>
      <strong>{value}</strong>
      <div className="cc-kpi-foot">{foot}</div>
      <div className={`cc-kpi-line ${tone}`} />
    </article>
  );
}

function ActivityChart({ data, large = false }) {
  return (
    <div className={`cc-chart-area ${large ? "large" : ""}`}>
      <div className="cc-chart-y">
        <span>12</span>
        <span>08</span>
        <span>04</span>
        <span>00</span>
      </div>
      <div className="cc-chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="sentinelGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#24c8ee" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#24c8ee" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke="rgba(130,160,190,0.12)"
              strokeDasharray="3 5"
              vertical={false}
            />
            <XAxis
              dataKey="time"
              tick={{ fill: "#8096ac", fontSize: 9 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide domain={[0, "dataMax + 3"]} />
            <Tooltip
              contentStyle={{
                background: "#0b1929",
                border: "1px solid #24c8ee",
                borderRadius: "6px",
                color: "#ffffff",
                fontSize: "11px",
              }}
              labelStyle={{ color: "#24c8ee" }}
              formatter={(value) => [`${value} events`, "Detections"]}
            />
            <Area
              type="monotone"
              dataKey="detections"
              stroke="#24c8ee"
              strokeWidth={2.5}
              fill="url(#sentinelGradient)"
              activeDot={{ r: 5, fill: "#24c8ee", stroke: "#ffffff", strokeWidth: 2 }}
              isAnimationActive
              animationDuration={1200}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function DailyDetectionBarChart({ data }) {
  return (
    <div className="cv-bar-chart">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 15, left: 5, bottom: 5 }}
        >
          <defs>
            <linearGradient id="detectionBarGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38d9ff" stopOpacity={1} />
              <stop offset="100%" stopColor="#5265ff" stopOpacity={0.75} />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke="rgba(130,160,190,0.13)"
            strokeDasharray="4 5"
            vertical={false}
          />

          <XAxis
            dataKey="time"
            tick={{ fill: "#9aafc5", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            allowDecimals={false}
            tick={{ fill: "#9aafc5", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={35}
          />

          <Tooltip
            cursor={{ fill: "rgba(56,217,255,0.07)" }}
            contentStyle={{
              background: "#101f33",
              border: "1px solid #38d9ff",
              borderRadius: "10px",
              color: "#ffffff",
              fontSize: "14px",
            }}
            formatter={(value) => [`${value} detections`, "Mobile Events"]}
          />

          <Bar
            dataKey="detections"
            fill="url(#detectionBarGradient)"
            radius={[8, 8, 2, 2]}
            barSize={38}
            animationDuration={1500}
            animationEasing="ease-out"
            activeBar={{ stroke: "#ffffff", strokeWidth: 1 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function CommandCenter() {
  const [active, setActive] = useState("overview");
  const [range, setRange] = useState("24 HOURS");
  const [selectedCamera, setSelectedCamera] = useState(cameras[1]);
  const [incidents, setIncidents] = useState(incidentsSeed);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [detectionHistory, setDetectionHistory] = useState([]);
const [historyLoading, setHistoryLoading] = useState(true);
const [historyError, setHistoryError] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
const [showCameraForm, setShowCameraForm] = useState(false);
const [cameraRegistry, setCameraRegistry] = useState([]);
const [editingCameraId, setEditingCameraId] = useState(null);
const [cameraPreviews, setCameraPreviews] = useState({});
const [detectionLoading, setDetectionLoading] = useState(false);
const [detectionResult, setDetectionResult] = useState(null);
const [teacherNotificationFilter, setTeacherNotificationFilter] = useState("ALL");
const [cameraFiles, setCameraFiles] = useState({});
const [detectionError, setDetectionError] = useState("");
const videoRef = useRef(null);

const [cameraStream, setCameraStream] = useState(null);
const [cameraLoading, setCameraLoading] = useState(false);
const [cameraError, setCameraError] = useState("");
const [uploadingCameraId, setUploadingCameraId] = useState(null);
const [cameraMessage, setCameraMessage] = useState({
  text: "",
  type: "",
});

const [teachers, setTeachers] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem("cv_demo_teachers") || "[]");
  } catch {
    return [];
  }
});

const [showTeacherForm, setShowTeacherForm] = useState(false);

const [teacherForm, setTeacherForm] = useState({
  name: "",
  email: "",
  phone: "",
  department: "",
  classroom: "",
  designation: "Class Teacher",
});

useEffect(() => {
  localStorage.setItem("cv_demo_teachers", JSON.stringify(teachers));
}, [teachers]);

useEffect(() => {
  const fetchCameras = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cameras`, {
  headers: getAuthHeaders(),
});

      if (!response.ok) {
        throw new Error("Failed to fetch cameras");
      }

      const data = await response.json();
      setCameraRegistry(data);
    } catch (error) {
      console.error("Camera loading error:", error);
    }
  };

  fetchCameras();
}, []);

// Fetch Detection History from Backend
useEffect(() => {
  const fetchDetectionHistory = async () => {
    try {
      setHistoryLoading(true);
      setHistoryError("");

      const response = await fetch(
  `${API_BASE_URL}/api/incidents`,
  {
    headers: getAuthHeaders(),
  }
);

      if (!response.ok) {
        throw new Error("Failed to load detection history");
      }

      const data = await response.json();

      setDetectionHistory(
        Array.isArray(data) ? data : []
      );

    } catch (error) {
      console.error("Detection History Error:", error);
      setHistoryError(error.message);

    } finally {
      setHistoryLoading(false);
    }
  };

  fetchDetectionHistory();
}, []);

const handleAddTeacher = (e) => {
  e.preventDefault();

  if (!teacherForm.name.trim() || !teacherForm.classroom.trim()) {
    alert("Teacher Name and Classroom are required.");
    return;
  }

  const newTeacher = {
    id: `TCH-${String(Date.now()).slice(-6)}`,
    ...teacherForm,
    createdAt: new Date().toLocaleString(),
  };

  setTeachers((prev) => [...prev, newTeacher]);

  setTeacherForm({
    name: "",
    email: "",
    phone: "",
    department: "",
    classroom: "",
    designation: "Class Teacher",
  });

  setShowTeacherForm(false);
};
const [editingTeacherId, setEditingTeacherId] = useState(null);

const handleEditTeacher = (teacher) => {
  setTeacherForm({
    name: teacher.name,
    email: teacher.email || "",
    phone: teacher.phone || "",
    department: teacher.department || "",
    classroom: teacher.classroom || "",
    designation: teacher.designation || "Class Teacher",
  });

  setEditingTeacherId(teacher.id);
  setShowTeacherForm(true);
};

const handleDeleteTeacher = (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this teacher?"
  );

  if (!confirmDelete) return;

  setTeachers((prev) => prev.filter((teacher) => teacher.id !== id));
};

const handleTeacherSubmit = (e) => {
  e.preventDefault();

  if (!teacherForm.name.trim() || !teacherForm.classroom.trim()) {
    alert("Teacher Name and Classroom are required.");
    return;
  }

  if (editingTeacherId) {
    setTeachers((prev) =>
      prev.map((teacher) =>
        teacher.id === editingTeacherId
          ? { ...teacher, ...teacherForm }
          : teacher
      )
    );
  } else {
    const newTeacher = {
      id: `TCH-${String(Date.now()).slice(-6)}`,
      ...teacherForm,
      createdAt: new Date().toLocaleString(),
    };

    setTeachers((prev) => [...prev, newTeacher]);
  }

  setTeacherForm({
    name: "",
    email: "",
    phone: "",
    department: "",
    classroom: "",
    designation: "Class Teacher",
  });

  setEditingTeacherId(null);
  setShowTeacherForm(false);
};

const getAssignedTeacher = (incident) => {
  const classroomName = incident.room
    ?.split("·")[0]
    ?.trim()
    ?.toLowerCase();

  return teachers.find(
    (teacher) =>
      teacher.classroom.trim().toLowerCase() === classroomName
  );
};

const [cameraForm, setCameraForm] = useState({
  id: "",
  room: "",
  zone: "",
  type: "USB Webcam",
  source: "",
});

const addCamera = async (e) => {
  e.preventDefault();

  const isEditing = editingCameraId !== null;

  try {
    const response = await fetch(
      isEditing
        ? `${API_BASE_URL}/api/cameras/${editingCameraId}`
        : `${API_BASE_URL}/api/cameras`,
      {
        method: isEditing ? "PUT" : "POST",
        headers: {
  "Content-Type": "application/json",
  ...getAuthHeaders(),
},
        body: JSON.stringify(cameraForm),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.detail || "Camera operation failed");
    }

    if (isEditing) {
      setCameraRegistry((prev) =>
        prev.map((camera) =>
          camera.id === editingCameraId ? result.camera : camera
        )
      );
    } else {
      setCameraRegistry((prev) => [...prev, result.camera]);
    }

    setCameraForm({
      id: "",
      room: "",
      zone: "",
      type: "USB Webcam",
      source: "",
    });

    setEditingCameraId(null);
    setShowCameraForm(false);

    setCameraMessage({
  text: isEditing
    ? "Camera updated successfully!"
    : "Camera registered successfully!",
  type: "success",
});
  } catch (error) {
    console.error("Camera operation error:", error);
    setCameraMessage({
  text: error.message || "Camera operation failed.",
  type: "error",
});
  }
};

const startEditCamera = (camera) => {
  setEditingCameraId(camera.id);

  setCameraForm({
    id: camera.id,
    room: camera.room,
    zone: camera.zone,
    type: camera.type,
    source: camera.source || "",
  });

  setShowCameraForm(true);
};

const deleteCamera = async (cameraId) => {
  const confirmDelete = window.confirm(
    `Are you sure you want to delete camera ${cameraId}?`
  );

  if (!confirmDelete) return;

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/cameras/${encodeURIComponent(cameraId)}`,
      {
  method: "DELETE",
  headers: getAuthHeaders(),
}
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.detail || "Camera deletion failed");
    }

    setCameraRegistry((prev) =>
      prev.filter((camera) => camera.id !== cameraId)
    );

    setCameraMessage({
  text: "Camera deleted successfully!",
  type: "success",
});
  } catch (error) {
    console.error("Camera deletion error:", error);
    setCameraMessage({
  text: error.message || "Unable to delete camera.",
  type: "error",
});
  }
};

  const current = navItems.find((item) => item[2] === active) || navItems[0];

  const visibleCameras = useMemo(
    () => cameras.filter((camera) =>
      `${camera.id} ${camera.room} ${camera.name} ${camera.zone}`
        .toLowerCase()
        .includes(search.toLowerCase())
    ),
    [search]
  );

  const chartData = activityData[range];

  // START USB WEBCAM
const startWebcam = async () => {
  try {
    setCameraLoading(true);
    setCameraError("");

    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error("Webcam access requires localhost or HTTPS.");
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    setCameraStream(stream);
  } catch (error) {
    console.error("Webcam Error:", error);
    setCameraError(
      error.message || "Unable to connect USB Webcam."
    );
  } finally {
    setCameraLoading(false);
  }
};

// STOP USB WEBCAM
const stopWebcam = () => {
  if (cameraStream) {
    cameraStream.getTracks().forEach((track) => track.stop());
  }

  setCameraStream(null);
};

// CONNECT STREAM TO VIDEO ELEMENT
useEffect(() => {
  if (videoRef.current) {
    videoRef.current.srcObject = cameraStream;
  }

  return () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
    }
  };
}, [cameraStream]);

const runAIDetection = async (cameraId) => {
  if (!cameraStream || !videoRef.current) {
    setDetectionError("Please start the USB Webcam first.");
    return;
  }

  setDetectionLoading(true);
  setDetectionError("");
  setDetectionResult(null);

  try {
    const video = videoRef.current;

    if (!video.videoWidth || !video.videoHeight) {
      throw new Error("Webcam is not ready. Please wait.");
    }

    // Capture current webcam frame
    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert frame into image Blob
    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob((result) => {
        if (result) {
          resolve(result);
        } else {
          reject(new Error("Unable to capture webcam frame."));
        }
      }, "image/jpeg");
    });

    // Send captured frame to FastAPI
    const formData = new FormData();
    formData.append("file", blob, "webcam_frame.jpg");

    const response = await fetch(
  "http://127.0.0.1:8000/mobile/detect",
  {
    method: "POST",
    headers: getAuthHeaders(),
    body: formData,
  }
);

    if (!response.ok) {
      throw new Error(`Detection failed: ${response.status}`);
    }

    const result = await response.json();
    setDetectionResult(result);

  } catch (error) {
    console.error("Webcam AI Detection Error:", error);
    setDetectionError(error.message || "AI Detection failed.");
  } finally {
    setDetectionLoading(false);
  }
};

  const acknowledge = (id) => {
    setIncidents((items) =>
      items.map((item) =>
        item.id === id ? { ...item, status: "Acknowledged" } : item
      )
    );
  };

  const mobileDetections = detectionHistory.filter(
  (item) => item.detection_type === "Mobile Phone"
).length;

const otherDetections = detectionHistory.length - mobileDetections;

const mobilePercentage =
  detectionHistory.length > 0
    ? (mobileDetections / detectionHistory.length) * 100
    : 0;

    const otherPercentage =
  detectionHistory.length > 0
    ? (otherDetections / detectionHistory.length) * 100
    : 0;

const mobileAngle = mobilePercentage * 3.6;

const openSurveillance = (
    <button className="cc-primary-btn" onClick={() => setActive("surveillance")}>
      ▣ &nbsp; OPEN SURVEILLANCE
    </button>
  );

 
const renderIncidents = (compact = false) => {
  const rows = incidents.filter(
    (item) => filter === "ALL" || item.severity === filter
  );

  return (
    <div className={`cc-table-wrap cv-incident-table-wrap ${compact ? "compact-table" : ""}`}>
      <table className="cc-table cv-incident-table">
        <thead>
          <tr>
            <th>INCIDENT ID</th>
            <th>DETECTION</th>
            <th>LOCATION</th>
            <th>TIME</th>
            <th>SEVERITY</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((item) => (
            <tr key={item.id}>
              <td className="mono cv-incident-id">{item.id}</td>

              <td className="cv-incident-detection">
                <span className="cv-detection-dot"></span>
                {item.title}
              </td>

              <td>{item.room}</td>

              <td className="mono">{item.time}</td>

              <td>
                <span className={`cc-severity ${item.severity.toLowerCase()} cv-severity-badge`}>
                  {item.severity}
                </span>
              </td>

              <td>
                <span className={`cc-status ${item.status.toLowerCase().replace(" ", "-")} cv-status-badge`}>
                  {item.status}
                </span>
              </td>

              <td>
  <div className="cv-incident-actions">

    <button
      type="button"
      className="cv-view-details-btn"
      onClick={() => setSelectedIncident(item)}
    >
      VIEW DETAILS ↗
    </button>

    <button
      type="button"
      className="cc-table-action cv-incident-action"
      disabled={item.status === "Acknowledged"}
      onClick={() => acknowledge(item.id)}
    >
      {item.status === "Acknowledged"
        ? "✓ ACKNOWLEDGED"
        : "ACKNOWLEDGE"}
    </button>

  </div>
</td>
            </tr>
          ))}
        </tbody>
      </table>

      {rows.length === 0 && (
        <div className="cv-no-incidents">
          <span>◎</span>
          <h3>No Incidents Found</h3>
          <p>No incidents match the selected severity filter.</p>
        </div>
      )}
    </div>
  );
};

  return (
    <div className="cc-shell">
      <LiveBubbles />
      <aside className="cc-sidebar">
        <div className="cc-brand">
          <div className="cc-brand-mark"><span>S</span><i /></div>
          <div>
            <strong>CAMPUS<span>VISION AI</span></strong>
           <small>SMART CLASSROOM SECURITY OPERATIONS</small>
          </div>
        </div>

        <div className="cc-workspace">
          <span className="cc-live-dot" /> COLLEGE SECURITY WORKSPACE <b>DEMO</b>
        </div>

        <div className="cc-nav-label">OPERATIONS</div>

        <nav className="cc-nav">
          {navItems.map(([symbol, label, key]) => (
            <button
              key={key}
              className={active === key ? "active" : ""}
              aria-current={active === key ? "page" : undefined}
              onClick={() => setActive(key)}
            >
              <span className="cc-icon">{symbol}</span>
              <span>{label}</span>
              {key === "incidents" && (
                <em>
                  {incidents.filter((i) => i.status !== "Acknowledged").length
                    .toString()
                    .padStart(2, "0")}
                </em>
              )}
            </button>
          ))}
        </nav>

        <div className="cc-sidebar-bottom">
          <div className="cc-college-emblem">⌂</div>
          <strong>INSTITUTIONAL NODE</strong>
          <span>Smart Classroom Monitoring</span>
          <small>LOCAL WORKSPACE · BUILD 02</small>
          <button
  type="button"
  className="cc-logout-btn"
  onClick={() => {
    localStorage.removeItem("campusvision_token");
    localStorage.removeItem("campusvision_user");
    window.location.href = "/login";
  }}
>
  <span>⇥</span>
  LOGOUT
</button>
        </div>
      </aside>

      <main className="cc-main">
{active === "cameraManagement" && (
  <section className="cc-camera-management">
    {cameraMessage.text && (
  <div className={`cc-camera-message ${cameraMessage.type}`}>
    {cameraMessage.text}
    <button
      type="button"
      onClick={() => setCameraMessage({ text: "", type: "" })}
    >
      ×
    </button>
  </div>
)}
    <div className="cc-page-heading">
      <div>
        <div className="cc-eyebrow">DEVICE INFRASTRUCTURE / REGISTRY</div>
        <h1>Camera <span>Management</span></h1>
        <p>Register and configure classroom surveillance devices.</p>
      </div>

      <button
  className="cc-primary-btn"
  onClick={() => {
    setEditingCameraId(null);

    setCameraForm({
      id: "",
      room: "",
      zone: "",
      type: "USB Webcam",
      source: "",
    });

    setShowCameraForm(true);
  }}
>
  + REGISTER CAMERA
</button>
    </div>

    <div className="cc-panel cc-registry-panel">
      <div className="cc-panel-heading">
        <div>
          <div className="cc-eyebrow">DEVICE INVENTORY</div>
          <h2>Registered Cameras</h2>
        </div>
        <span className="cc-demo-pill">
          {cameraRegistry.length} REGISTERED
        </span>
      </div>

      {cameraRegistry.length === 0 ? (
        <div className="cc-registry-empty">
          <div className="cc-empty-icon">▣</div>
          <h3>No cameras registered</h3>
          <p>
            Register your first camera. You can connect the physical
            webcam or CCTV device later.
          </p>
          <span>DEVICE STATUS: NOT CONFIGURED</span>
        </div>
      ) : (
        <div className="cc-registry-grid">
          {cameraRegistry.map((camera) => (
            <article className="cc-registry-card" key={camera.id}>
              <div className="cc-registry-card-top">
                <span>▣ {camera.id}</span>
                <b>{camera.status || "NOT CONFIGURED"}</b>
              </div>

              <h3>{camera.room}</h3>
              <p>{camera.zone}</p>
              <small>DEVICE TYPE · {camera.type}</small>
              <small>
  CAMERA SOURCE · {camera.source || "NOT PROVIDED"}
</small>
<button
  type="button"
  className="cc-primary-btn"
  onClick={() => startEditCamera(camera)}
>
  EDIT CAMERA
</button>

<button
  type="button"
  className="cc-delete-btn"
  onClick={() => deleteCamera(camera.id)}
>
  DELETE CAMERA
</button>
        
        <div className="cc-registry-status">
                <i /> Awaiting physical connection
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
    

    {showCameraForm && (
      <div className="cc-modal-backdrop">
        <form className="cc-camera-form" onSubmit={addCamera}>
          <div className="cc-form-heading">
            <div>
              <div className="cc-eyebrow">DEVICE REGISTRATION</div>
              <h2>Register New Camera</h2>
            </div>

            <button
              type="button"
              className="cc-form-close"
              onClick={() => setShowCameraForm(false)}
            >
              ×
            </button>
          </div>

          <label>Camera ID</label>
          <label>Classroom / Location</label>
          <input
            required
            placeholder="Example: Classroom 101"
            value={cameraForm.room}
            onChange={(e) =>
              setCameraForm({ ...cameraForm, room: e.target.value })
            }
          />

          <label>Camera Zone</label>
          <input
            required
            placeholder="Example: Student seating zone"
            value={cameraForm.zone}
            onChange={(e) =>
              setCameraForm({ ...cameraForm, zone: e.target.value })
            }
          />

          <input
  required
  value={cameraForm.id}
  onChange={(e) =>
    setCameraForm({ ...cameraForm, id: e.target.value })
  }
/>

          <label>Device Type</label>
          <select
            value={cameraForm.type}
            onChange={(e) =>
              setCameraForm({ ...cameraForm, type: e.target.value })
            }
          >
            <option>USB Webcam</option>
            <option>IP Camera</option>
            <option>CCTV / NVR Camera</option>
          </select>

          <label>Camera Source / Device Path</label>
<input
  placeholder="Example: 0 or RTSP URL (add later)"
  value={cameraForm.source}
  onChange={(e) =>
    setCameraForm({ ...cameraForm, source: e.target.value })
  }
/>

          <div className="cc-form-note">
            Camera will remain NOT CONFIGURED until a physical device is connected.
          </div>

          <button type="submit" className="cc-primary-btn cc-form-submit">
            SAVE CAMERA
          </button>
        </form>
      </div>
    )}
  </section>
)}
 <header className="cc-topbar">
          <div className="cc-crumb">
            <span>OPERATIONS</span><b>/</b> {current[1].toUpperCase()}
          </div>
          <div className="cc-top-actions">
            <div className="cc-system-state"><i /> DEMO ENVIRONMENT</div>
            <button className="cc-icon-button" aria-label="Notifications">♧<i /></button>
            <div className="cc-profile">
              <div className="cc-avatar">OP</div>
              <span><b>Security Operator</b><small>CONTROL DESK</small></span>
              <span className="cc-chevron">⌄</span>
            </div>
          </div>
        </header>

        {/* INCIDENT DETAILS POPUP */}

{selectedIncident && (
  <div
    className="cv-incident-modal-backdrop"
    onClick={() => setSelectedIncident(null)}
  >
    <div
      className="cv-incident-modal"
      onClick={(e) => e.stopPropagation()}
    >

      <div className="cv-incident-modal-header">
        <div>
          <span className="cv-modal-eyebrow">
            SECURITY OPERATIONS / INCIDENT DETAILS
          </span>

          <h2>Incident <span>Overview</span></h2>
          <p>Detailed information about the selected detection event.</p>
        </div>

        <button
          type="button"
          className="cv-modal-close"
          onClick={() => setSelectedIncident(null)}
        >
          ×
        </button>
      </div>

      <div className="cv-modal-incident-banner">
        <div className="cv-modal-warning-icon">⚑</div>

        <div>
          <small>INCIDENT REFERENCE</small>
          <h3>{selectedIncident.id}</h3>
          <span>{selectedIncident.title}</span>
        </div>

        <span className={`cv-modal-severity ${selectedIncident.severity.toLowerCase()}`}>
          {selectedIncident.severity} PRIORITY
        </span>
      </div>

      <div className="cv-modal-details-grid">

        <div className="cv-modal-detail-card">
          <span>DETECTION TYPE</span>
          <strong>{selectedIncident.title}</strong>
        </div>

        <div className="cv-modal-detail-card">
          <span>CLASSROOM / CAMERA</span>
          <strong>{selectedIncident.room}</strong>
        </div>

        <div className="cv-modal-detail-card">
          <span>DETECTION TIME</span>
          <strong>{selectedIncident.time}</strong>
        </div>

        <div className="cv-modal-detail-card">
          <span>AI CONFIDENCE SCORE</span>
          <strong className="cv-modal-confidence">
            {selectedIncident.confidence || "N/A"}
          </strong>
        </div>

        <div className="cv-modal-detail-card">
          <span>SEVERITY LEVEL</span>
          <strong>{selectedIncident.severity}</strong>
        </div>

        <div className="cv-modal-detail-card">
          <span>CURRENT STATUS</span>
          <strong className="cv-modal-status">
            {selectedIncident.status}
          </strong>
        </div>

      </div>

      {/* INCIDENT EVIDENCE PREVIEW */}

<div className="cv-evidence-page">

  <div className="cv-evidence-heading">
    <div>
      <span>VISUAL INTELLIGENCE</span>
      <h3>Incident Evidence</h3>
    </div>

    <small>DETECTION IMAGE</small>
  </div>

  {selectedIncident.evidence_image ? (
    <div className="cv-evidence-image">
      <img
        src={
          selectedIncident.evidence_image.startsWith("http")
            ? selectedIncident.evidence_image
            : `${API_BASE_URL}${selectedIncident.evidence_image}`
        }
        alt="Incident detection evidence"
      />

      <span>AI DETECTION EVIDENCE</span>
    </div>
  ) : (
    <div className="cv-evidence-empty">
      <div className="cv-evidence-icon">▧</div>
      <h4>Evidence Not Attached</h4>
      <p>
        No detection image is currently linked to this incident.
        Evidence integration is pending.
      </p>
      <span>IMAGE STATUS · PENDING</span>
    </div>
  )}

</div>

      <div className="cv-modal-footer">
        <span> CAMPUSVISION AI · INCIDENT MANAGEMENT</span>

        <div>
          {selectedIncident.status !== "Acknowledged" && (
            <button
              type="button"
              className="cv-modal-acknowledge"
              onClick={() => {
                acknowledge(selectedIncident.id);
                setSelectedIncident((item) => ({
                  ...item,
                  status: "Acknowledged",
                }));
              }}
            >
              ✓ ACKNOWLEDGE INCIDENT
            </button>
          )}

          <button
            type="button"
            className="cv-modal-close-btn"
            onClick={() => setSelectedIncident(null)}
          >
            CLOSE
          </button>
        </div>
      </div>

    </div>
  </div>
)}

        {active === "overview" && (
          <>
          
<section className="cv-ai-hero">
  <div className="cv-hero-content">
    <div className="cv-hero-label">
      <span className="cv-hero-pulse"></span>
      ARTIFICIAL INTELLIGENCE · SECURITY CORE
    </div>

    <h1>
      Smarter Classrooms.
      <br />
      <span>Safer Futures.</span>
    </h1>

    <p>
      Intelligent classroom monitoring powered by AI,
      computer vision and real-time security intelligence.
    </p>

    <div className="cv-hero-actions">
      <button
        className="cv-hero-primary"
        onClick={() => setActive("surveillance")}
      >
        OPEN SURVEILLANCE <span>↗</span>
      </button>

      <button
        className="cv-hero-secondary"
        onClick={() => setActive("detectionHistory")}
      >
        VIEW DETECTION HISTORY
      </button>
    </div>

    <div className="cv-hero-meta">
      <span><i></i> LOCAL WORKSPACE</span>
      <span>AI MODEL INTEGRATION PENDING</span>
    </div>
  </div>

  <div className="cv-robot-visual" aria-label="Abstract AI security core illustration">
    <div className="cv-robot-orbit cv-orbit-one"></div>
    <div className="cv-robot-orbit cv-orbit-two"></div>
    <div className="cv-robot-orbit cv-orbit-three"></div>

    <div className="cv-robot-core">
      <div className="cv-robot-top">AI</div>
      <div className="cv-robot-eyes">
        <span></span>
        <span></span>
      </div>
      <div className="cv-robot-mouth"></div>
      <div className="cv-robot-caption">INTELLIGENCE CORE</div>
    </div>

    <div className="cv-robot-scan"></div>
    <span className="cv-robot-node cv-node-a"></span>
    <span className="cv-robot-node cv-node-b"></span>
    <span className="cv-robot-node cv-node-c"></span>

    <div className="cv-robot-side-label">NEURAL NETWORK / 01</div>
  </div>
</section>


<section className="cv-intelligence-grid">

  
{/* DETECTION DISTRIBUTION */}
<article className="cv-intel-card cv-distribution-card">

  <div className="cv-intel-heading">
    <div>
      <span>AI INTELLIGENCE</span>
      <h3>Detection Distribution</h3>
    </div>
    <b className="cv-intel-tag">BACKEND DATA</b>
  </div>

  <div className="cv-donut-layout">

    <div
      className="cv-donut"
      style={{
        "--mobile-angle": `${mobileAngle}deg`
      }}
    >
      <div className="cv-donut-center">
        <strong>{detectionHistory.length}</strong>
        <small>RECORDED</small>
      </div>
    </div>

    <div className="cv-donut-legend">

      <div>
        <i className="cv-legend-purple"></i>
        <span>Mobile Phones</span>
        <b>
          {mobileDetections} ({mobilePercentage.toFixed(1)}%)
        </b>
      </div>

      <div>
        <i className="cv-legend-pink"></i>
        <span>Other Detections</span>
        <b>
          {otherDetections} ({otherPercentage.toFixed(1)}%)
        </b>
      </div>

    </div>

  </div>

  <p className="cv-intel-note">
    Distribution is calculated from detection records stored in the backend.
  </p>

</article>


  {/* CAMERA NETWORK */}
  <article className="cv-intel-card">
    <div className="cv-intel-heading">
      <div>
        <span>INFRASTRUCTURE</span>
        <h3>Camera Network</h3>
      </div>
      <b className="cv-intel-tag">LIVE REGISTRY</b>
    </div>

    <div className="cv-network-number">
      <strong>{cameraRegistry.length}</strong>
      <span>REGISTERED CAMERAS</span>
    </div>

    <div className="cv-network-track">
  <div style={{ width: "0%" }}></div>
</div>

<div className="cv-network-status">
  <span>
    <i className="cv-status-dot cv-status-connected"></i>
    Connected: 0
  </span>

  <span>
    <i className="cv-status-dot cv-status-pending"></i>
    Pending: {cameraRegistry.length}
  </span>
    </div>

    <div className="cv-network-status">
      <span><i className="cv-status-offline"></i> Connected</span>
      <b>0</b>
    </div>

    <div className="cv-network-status">
      <span><i className="cv-status-pending"></i> Pending Setup</span>
      <b>{cameraRegistry.length}</b>
    </div>

    <p className="cv-intel-note">
      Physical camera connectivity has not been verified.
    </p>
  </article>

 
{/* AI SYSTEM STATUS */}
<article className="cv-intel-card cv-system-card">
  <div className="cv-intel-heading">
    <div>
      <span>CORE STATUS</span>
      <h3>AI Intelligence Overview</h3>
    </div>
    <b className="cv-intel-tag">SYSTEM</b>
  </div>

  <div className="cv-system-orb">
    <div className="cv-system-orb-inner">
      <span>AI</span>
      <small>CORE</small>
    </div>
  </div>

  <div className="cv-system-details">

    <div className="cv-system-status">
      <span>Backend API</span>
      <strong className="cv-badge-configured">CONFIGURED</strong>
    </div>

    <div className="cv-system-status">
      <span>Camera Stream</span>
      <strong className="cv-badge-pending">PENDING</strong>
    </div>

    <div className="cv-system-status">
      <span>Mobile Model</span>
      <strong className="cv-badge-testing">TEST PENDING</strong>
    </div>

  </div>
</article>


</section>

<section className="cc-panel cv-daily-chart-panel">
  <div className="cc-panel-heading">
    <div>
      <div className="cc-eyebrow">
        AI EVENT ANALYTICS / WEEKLY REPORT
      </div>
      <h2>Daily Mobile Detection Analytics</h2>
      <p>Classroom detection activity across the last seven days.</p>
    </div>

    <span className="cc-demo-pill">ILLUSTRATIVE DATA</span>
  </div>

  <DailyDetectionBarChart data={activityData["7 DAYS"]} />

  <div className="cv-bar-footer">
    <span>MONDAY — SUNDAY</span>
    <span>DETECTION EVENTS</span>
  </div>
</section>


            <PageHeading
              eyebrow="UNIFIED SURVEILLANCE INTELLIGENCE / OVERVIEW"
              title={<>Security <span>Operations</span></>}
              subtitle="Monitor classroom activity, review AI events and coordinate incident response."
              action={<>{exportAction}{openSurveillance}</>}
            />

            <section className="cc-kpis">
              <Stat
                label="MONITORED LOCATIONS"
                value="12"
                tone="blue"
                icon="⌂"
                foot={<><b className="good">● 11 ACTIVE</b><span>1 NOT CONNECTED</span></>}
              />
              <Stat
                label="CAMERA INVENTORY"
                value="48"
                tone="cyan"
                icon="▦"
                foot={<><b className="good">● 46 ACTIVE</b><span>2 OFFLINE</span></>}
              />
              <Stat
                label="OPEN INCIDENTS"
                value={incidents.filter((i) => i.status !== "Acknowledged").length.toString().padStart(2, "0")}
                tone="redline"
                icon="⚑"
                foot={<><b className="danger">2 HIGH PRIORITY</b><span>1 REVIEW</span></>}
              />
              <Stat
                label="AI SERVICE HEALTH"
                value="STANDBY"
                tone="greenline"
                icon="⬡"
                foot={<><b className="amber">● INTEGRATION PENDING</b><span>MODEL NOT LIVE</span></>}
              />
            </section>

            <section className="cc-content-grid">
              <div className="cc-panel cc-surveillance-panel">
                <div className="cc-panel-heading">
                  <div>
                    <div className="cc-eyebrow">VIDEO INTELLIGENCE</div>
                    <h2>Live Operations Matrix</h2>
                    <p>Six camera preview positions · simulated until NVR integration</p>
                  </div>
                  <div className="cc-panel-controls">
                    <span className="cc-demo-pill">DEMO FEEDS</span>
                    <button className="cc-select" onClick={() => setActive("surveillance")}>
                      CAMERA WALL ↗
                    </button>
                  </div>
                </div>
                <span className="cv-ai-live-indicator">
  <i></i>
  AI CORE
</span>

                <CameraCards
                  selectedCamera={selectedCamera}
                  onSelect={setSelectedCamera}
                  compact
                />

                <div className="cc-panel-footer">
                  <span><i className="legend-dot blue-dot" /> SELECTED CAMERA</span>
                  <span><i className="legend-dot green-dot" /> SIMULATED FEED</span>
                  <span><i className="legend-dot red-dot" /> DETECTION EVENT</span>
                  <button onClick={() => setActive("surveillance")}>OPEN CAMERA WALL ↗</button>
                </div>
              </div>

              <aside className="cc-panel cc-threat-panel">
                <div className="cc-panel-heading compact">
                  <div>
                    <div className="cc-eyebrow">PRIORITY MONITOR</div>
                    <h2>Incident Queue</h2>
                  </div>
                  <span className="cc-count">
                    {incidents.filter((i) => i.status !== "Acknowledged").length.toString().padStart(2, "0")}
                  </span>
                </div>

                <div className="cc-priority-list">
                  {incidents.slice(0, 3).map((item) => (
                    <article className="cc-incident" key={item.id}>
                      <div className={`cc-severity-mark ${item.severity.toLowerCase()}`}>!</div>
                      <div className="cc-incident-body">
                        <div className="cc-incident-top">
                          <b>{item.title}</b>
                          <span className={item.severity.toLowerCase()}>{item.severity}</span>
                        </div>
                        <p>{item.room}</p>
                        <div className="cc-incident-foot">
                          <span>{item.id} · {item.time}</span>
                          <b>{item.confidence}</b>
                        </div>
                        <button className="cc-ack" onClick={() => acknowledge(item.id)}>
                          {item.status === "Acknowledged" ? "ACKNOWLEDGED ✓" : "ACKNOWLEDGE INCIDENT →"}
                        </button>
                      </div>
                    </article>
                  ))}
                </div>

                <button className="cc-view-all" onClick={() => setActive("incidents")}>
                  VIEW INCIDENT REGISTER ↗
                </button>

                <div className="cc-selected-event">
                  <div className="cc-eyebrow">SELECTED CAMERA</div>
                  <b>{selectedCamera.id}</b>
                  <span>{selectedCamera.room} / {selectedCamera.name}</span>
                  <small>Illustrative preview only · no live stream connected.</small>
                </div>
              </aside>
            </section>

            <section className="cc-bottom-grid">
              <article className="cc-panel cc-network-panel">
                <div className="cc-panel-heading compact">
                  <div>
                    <div className="cc-eyebrow">INFRASTRUCTURE OVERVIEW</div>
                    <h2>Institutional Network Topology</h2>
                  </div>
                  <span className="cc-demo-pill">ILLUSTRATIVE</span>
                </div>
                <div className="cc-topology">
                  <div className="cc-node core">
                    <i>⬡</i><b>LOCAL AI CORE</b><small>INTEGRATION PENDING</small>
                  </div>
                  <div className="cc-links"><i /><i /><i /><i /></div>
                  <div className="cc-node-row">
                    {["ACADEMIC BLOCK", "COMPUTER LAB", "SCIENCE WING", "CLASSROOMS"].map((n, i) => (
                      <div className="cc-node" key={n}>
                        <i>{["▦", "⌘", "⚗", "⌂"][i]}</i>
                        <b>{n}</b><small>DEMO NODE</small>
                      </div>
                    ))}
                  </div>
                </div>
              </article>

              <article className="cc-panel cc-activity-panel">
                <div className="cc-panel-heading compact">
                  <div>
                    <div className="cc-eyebrow">EVENT TELEMETRY</div>
                    <h2>Detection Activity</h2>
                  </div>
                  <select value={range} onChange={(e) => setRange(e.target.value)}>
                    <option>24 HOURS</option>
                    <option>7 DAYS</option>
                    <option>30 DAYS</option>
                  </select>
                </div>
                <ActivityChart data={chartData} />
                <div className="cc-chart-note">
                  <span>ILLUSTRATIVE EVENT TREND</span><b>NOT LIVE DATA</b>
                </div>
              </article>
            </section>
          </>
        )}

       

{active === "surveillance" && (
  <section className="cv-surveillance-page">

    <PageHeading
      eyebrow="VIDEO INTELLIGENCE / CENTRAL MONITORING"
      title={<>Live <span>Surveillance</span></>}
      subtitle="Centralized classroom camera monitoring and device connection overview."
    />

    {/* FOUR STATUS CARDS */}
    <div className="cv-surveillance-stats">

      <div className="cv-surveillance-stat">
        <span className="cv-surveillance-stat-icon">▣</span>
        <div>
          <small>REGISTERED CAMERAS</small>
          <strong>{cameraRegistry.length.toString().padStart(2, "0")}</strong>
          <span>Device inventory</span>
        </div>
      </div>

      <div className="cv-surveillance-stat">
        <span className="cv-surveillance-stat-icon pending">◷</span>
        <div>
          <small>STREAMS PENDING</small>
          <strong>{cameraRegistry.length.toString().padStart(2, "0")}</strong>
          <span>Awaiting connection</span>
        </div>
      </div>

      <div className="cv-surveillance-stat">
        <span className="cv-surveillance-stat-icon offline">◎</span>
        <div>
          <small>VERIFIED LIVE FEEDS</small>
          <strong>00</strong>
          <span>No physical stream verified</span>
        </div>
      </div>

      <div className="cv-surveillance-stat">
        <span className="cv-surveillance-stat-icon">◈</span>
        <div>
          <small>AI MODEL STATUS</small>
          <strong className="cv-stat-pending">PENDING</strong>
          <span>Integration not completed</span>
        </div>
      </div>

    </div>

    {/* CAMERA TOOLBAR */}
    <div className="cv-surveillance-toolbar">

      <div>
        <div className="cv-surveillance-eyebrow">
          <span></span> VIDEO MONITORING GRID
        </div>
        <h2>Camera Monitoring Wall</h2>
        <p>Registered devices and their current connection state.</p>
      </div>

      <div className="cv-surveillance-toolbar-actions">

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search camera or classroom..."
        />

        <button
          type="button"
          onClick={() => setActive("cameraManagement")}
        >
          + MANAGE CAMERAS
        </button>

      </div>
    </div>

    {/* CAMERA GRID */}
    {cameraRegistry.length === 0 ? (

      <div className="cv-surveillance-empty">
        <div className="cv-surveillance-empty-icon">▣</div>
        <h2>No Camera Devices Registered</h2>
        <p>
          Register classroom cameras before adding them to the
          surveillance monitoring wall.
        </p>
        <button
          type="button"
          onClick={() => setActive("cameraManagement")}
        >
          REGISTER FIRST CAMERA ↗
        </button>
      </div>

    ) : (

      <div className="cv-surveillance-grid">

        {cameraRegistry
          .filter((camera) =>
            `${camera.id} ${camera.room} ${camera.zone}`
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .map((camera, index) => (

            <article
              className="cv-surveillance-camera"
              key={camera.id}
            >

              {/* CAMERA HEADER */}
              <div className="cv-camera-header">

                <div>
                  <span className="cv-camera-index">
                    CAMERA NODE / {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{camera.id}</h3>
                </div>

                <span className="cv-camera-connection">
                  <i></i> NOT VERIFIED
                </span>

              </div>

              {/* CAMERA INFORMATION + AI ANALYSIS */}
              <div className="cv-camera-bottom-grid">

                {/* CAMERA INFORMATION */}
                <div className="cv-camera-information">

                  <div className="cv-info-heading">
                    CAMERA INFORMATION
                  </div>

                  <div className="cv-info-line">
                    <span>Classroom:</span>
                    <strong>{camera.room}</strong>
                    <span className="cv-info-separator">|</span>
                    <span>Zone:</span>
                    <strong>{camera.zone}</strong>
                  </div>

                  <div className="cv-info-line">
                    <span>Type:</span>
                    <strong>{camera.type}</strong>
                  </div>

                  <div className="cv-info-status">
  <span className="cv-info-status-dot"></span>
  {cameraStream ? "USB WEBCAM CONNECTED" : "CONNECTION PENDING"}
</div>
<div className="cv-info-status">
  <span className="cv-info-status-dot"></span>
  {cameraStream ? "USB WEBCAM CONNECTED" : "CONNECTION PENDING"}
</div>

{/* USB WEBCAM LIVE FEED */}
{camera.id === cameraRegistry[0]?.id && (
  <div className="cv-webcam-section">

    <div className="cv-webcam-heading">
      <span>CAMERA LIVE FEED</span>
      <span className={cameraStream ? "cv-webcam-live" : "cv-webcam-offline"}>
        {cameraStream ? "● LIVE" : "● OFFLINE"}
      </span>
    </div>

    <div className="cv-webcam-screen">
      {cameraStream ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
        />
      ) : (
        <div className="cv-webcam-placeholder">
          <span>▣</span>
          <strong>CAMERA FEED UNAVAILABLE</strong>
          <small>Connect your USB Webcam to begin</small>
        </div>
      )}
    </div>

    <div className="cv-webcam-controls">
      {!cameraStream ? (
        <button
          type="button"
          onClick={startWebcam}
          disabled={cameraLoading}
        >
          {cameraLoading ? "CONNECTING..." : "▶ START CAMERA"}
        </button>
      ) : (
        <button
          type="button"
          onClick={stopWebcam}
        >
          ■ STOP CAMERA
        </button>
      )}
    </div>

    {cameraError && (
      <p className="cv-detection-error">{cameraError}</p>
    )}

  </div>
)}
                </div>

                {/* AI DETECTION ANALYSIS */}
<div className="cv-ai-analysis-panel">

  <div className="cv-ai-analysis-header">
    <h3>AI Detection Analysis</h3>

    <span className="cv-ai-model-status">
      <i></i>
      {detectionLoading ? "ANALYZING" :
        detectionResult ? "MODEL ACTIVE" : "MODEL READY"}
    </span>
  </div>

  <div className="cv-ai-metrics">

    <div className="cv-ai-metric">
      <span>MOBILE DETECTED</span>
      <strong>
        {detectionResult ? detectionResult.mobile_count : "--"}
      </strong>
      <small>Objects identified</small>
    </div>

    <div className="cv-ai-metric">
      <span>CONFIDENCE SCORE</span>
      <strong>
        {detectionResult?.detections?.length
          ? `${Math.max(...detectionResult.detections.map(d => d.confidence)).toFixed(2)}%`
          : "--"}
      </strong>
      <small>Model confidence</small>
    </div>

    <div className="cv-ai-metric">
      <span>ANALYSIS STATUS</span>
      <strong className="cv-ai-waiting">
        {detectionLoading
          ? "ANALYZING"
          : detectionResult
            ? detectionResult.mobile_detected ? "DETECTED" : "NO MOBILE"
            : "WAITING"}
      </strong>
      <small>
        {detectionResult
          ? `${detectionResult.student_count} students analyzed`
          : "Waiting for image"}
      </small>
    </div>

  </div>

</div>

<button
  type="button"
  className="cv-webcam-run-btn"
  onClick={() => runAIDetection(camera.id)}
  disabled={!cameraStream || detectionLoading}
>
  {detectionLoading
    ? "ANALYZING..."
    : "RUN AI DETECTION →"}
</button>

{/* AI ENGINE NOTICE */}
<div className="cv-live-ai-notice">

  <div className="cv-live-ai-notice-icon">!</div>

  <div>
    <strong>
      {detectionResult
        ? "AI DETECTION COMPLETED"
        : detectionError
          ? "AI DETECTION ERROR"
          : "AI ENGINE READY"}
    </strong>

  
  </div>

</div>
   </div>

 </article>

          ))}

        {cameraRegistry.filter((camera) =>
          `${camera.id} ${camera.room} ${camera.zone}`
            .toLowerCase()
            .includes(search.toLowerCase())
        ).length === 0 && (

          <div className="cv-surveillance-empty">
            <h2>No Matching Cameras Found</h2>
            <p>Try another camera ID or classroom name.</p>
          </div>

        )}

      </div>

    )}
    {detectionResult && (
  <div className="cv-detection-result">
    <h3>AI Detection Results</h3>

    <div className="cv-result-grid">
      <div className="cv-result-item">
        <span>Mobile Detected</span>
        <strong>
          {detectionResult.mobile_detected ? "YES" : "NO"}
        </strong>
      </div>

      <div className="cv-result-item">
        <span>Mobile Count</span>
        <strong>{detectionResult.mobile_count ?? 0}</strong>
      </div>

      <div className="cv-result-item">
        <span>Student Count</span>
        <strong>{detectionResult.student_count ?? 0}</strong>
      </div>

      <div className="cv-result-item">
        <span>Confidence Score</span>
        <strong>
          {detectionResult.detections?.length
            ? `${detectionResult.detections[0].confidence}%`
            : "N/A"}
        </strong>
      </div>

      <div className="cv-result-item">
        <span>Analysis Status</span>
        <strong>
          {detectionResult.mobile_detected ? "DETECTED" : "CLEAR"}
        </strong>
      </div>
    </div>

    <p className="cv-result-message">
      {detectionResult.message}
    </p>
  </div>
)}

{detectionError && (
  <p className="cv-detection-error">{detectionError}</p>
)}

    {/* SYSTEM INFORMATION */}
    <div className="cv-surveillance-system-note">

      <div className="cv-system-note-icon">ⓘ</div>

      <div>
        <strong>SURVEILLANCE SYSTEM INFORMATION</strong>
        <p>
          Camera entries are displayed from the device registry.
          Live video and AI detection will become available after
          physical camera and model integration.
        </p>
      </div>

      <span>DEMO WORKSPACE</span>

    </div>

  </section>
)}


{active === "detection" && (
  <section className="cv-detection-page">

    <PageHeading
      eyebrow="CAMPUSVISION AI / INTELLIGENCE ENGINE"
      title={<>AI <span>Detection Center</span></>}
      subtitle="Intelligent mobile phone detection and classroom security analysis."
    />

    {/* TOP STATUS CARDS */}
    <div className="cv-detection-stats">

      <article className="cv-detect-stat purple">
        <div className="cv-detect-stat-top">
          <span>AI MODEL STATUS</span>
          <i>✧</i>
        </div>
        <strong>READY</strong>
        <small>YOLO MODEL CONFIGURATION</small>
        <div className="cv-stat-line purple-line"></div>
      </article>

      <article className="cv-detect-stat cyan">
        <div className="cv-detect-stat-top">
          <span>CAMERA CONNECTION</span>
          <i>◎</i>
        </div>
        <strong>{cameraStream ? "ONLINE" : "OFFLINE"}</strong>
        <small>{cameraStream ? "WEBCAM CONNECTED" : "AWAITING CONNECTION"}</small>
        <div className="cv-stat-line cyan-line"></div>
      </article>

      <article className="cv-detect-stat red">
        <div className="cv-detect-stat-top">
          <span>MOBILE DETECTIONS</span>
          <i>▣</i>
        </div>
        <strong>{detectionResult?.mobile_count ?? "--"}</strong>
        <small>DETECTED OBJECTS</small>
        <div className="cv-stat-line red-line"></div>
      </article>

      <article className="cv-detect-stat green">
        <div className="cv-detect-stat-top">
          <span>INFERENCE STATUS</span>
          <i>⌁</i>
        </div>
        <strong>
          {detectionLoading ? "RUNNING" : detectionResult ? "COMPLETED" : "IDLE"}
        </strong>
        <small>AI PROCESSING ENGINE</small>
        <div className="cv-stat-line green-line"></div>
      </article>

    </div>

    {/* MAIN DETECTION WORKSPACE */}
    <div className="cv-detection-workspace">

      {/* CAMERA PANEL */}
      <article className="cv-detection-panel cv-detection-camera">

        <div className="cv-detection-panel-heading">
          <div>
            <span className="cv-detection-label">01 / VIDEO INTELLIGENCE</span>
            <h2>Classroom Camera Feed</h2>
          </div>

          <span className={cameraStream ? "cv-feed-online" : "cv-feed-offline"}>
            <i></i>{cameraStream ? "CAMERA ONLINE" : "CAMERA OFFLINE"}
          </span>
        </div>

        <div className="cv-detection-preview">
          <div className="cv-preview-corner top-left"></div>
          <div className="cv-preview-corner top-right"></div>
          <div className="cv-preview-corner bottom-left"></div>
          <div className="cv-preview-corner bottom-right"></div>

          <div className="cv-preview-center">
            <div className="cv-preview-icon">◎</div>
            <strong>VIDEO FEED STATUS</strong>
            <span>
              {cameraStream
                ? "Webcam is connected in Live Surveillance."
                : "No verified camera stream available."}
            </span>
            <small>CAMERA INTEGRATION</small>
          </div>

          <div className="cv-preview-footer">
            <span>CAM-01</span>
            <span>LOCAL PROCESSING</span>
            <span>{cameraStream ? "CONNECTED" : "NO SIGNAL"}</span>
          </div>
        </div>

        <div className="cv-detection-camera-actions">
          <button
            type="button"
            className="cv-detect-action"
            onClick={() => setActive("surveillance")}
          >
            OPEN LIVE SURVEILLANCE ↗
          </button>

          <span>PHYSICAL CAMERA STATUS IS NOT VERIFIED</span>
        </div>

      </article>

      {/* AI ANALYSIS PANEL */}
      <article className="cv-detection-panel cv-detection-analysis">

        <div className="cv-detection-panel-heading">
          <div>
            <span className="cv-detection-label">02 / NEURAL ANALYSIS</span>
            <h2>Detection Intelligence</h2>
          </div>
          <span className="cv-ai-core-tag">AI CORE</span>
        </div>

        <div className="cv-detection-ai-orb">
          <div className="cv-ai-orb-ring">
            <div className="cv-ai-orb-inner">
              <span>AI</span>
              <small>ENGINE</small>
            </div>
          </div>
        </div>

        <div className="cv-ai-analysis-details">

          <div>
            <span>Detection Target</span>
            <strong>MOBILE PHONE</strong>
          </div>

          <div>
            <span>Person Detection Model</span>
            <strong>YOLOv8n</strong>
          </div>

          <div>
            <span>Mobile Detection Model</span>
            <strong>Mobile Best Model</strong>
          </div>

          <div>
            <span>Processing Status</span>
            <strong className="cv-ai-processing-status">
              {detectionLoading
                ? "ANALYZING"
                : detectionResult
                  ? "COMPLETED"
                  : "STANDBY"}
            </strong>
          </div>

        </div>

      </article>

    </div>

    {/* DETECTION RESULTS */}
    <article className="cv-detection-panel cv-detection-results">

      <div className="cv-detection-panel-heading">
        <div>
          <span className="cv-detection-label">03 / DETECTION OUTPUT</span>
          <h2>AI Analysis Results</h2>
        </div>

        <span className="cv-results-tag">LIVE RESULTS</span>
      </div>

      <div className="cv-result-metrics">

        <div className="cv-result-metric red">
          <span>MOBILE DETECTED</span>
          <strong>
            {detectionResult
              ? detectionResult.mobile_detected ? "YES" : "NO"
              : "--"}
          </strong>
          <small>Detection result</small>
        </div>

        <div className="cv-result-metric purple">
          <span>CONFIDENCE SCORE</span>
          <strong>
            {detectionResult?.detections?.length
              ? `${Math.max(...detectionResult.detections.map(d => d.confidence)).toFixed(2)}%`
              : "--"}
          </strong>
          <small>Model confidence</small>
        </div>

        <div className="cv-result-metric cyan">
          <span>MOBILE COUNT</span>
          <strong>{detectionResult?.mobile_count ?? "--"}</strong>
          <small>Objects identified</small>
        </div>

        <div className="cv-result-metric green">
          <span>STUDENTS IDENTIFIED</span>
          <strong>{detectionResult?.student_count ?? "--"}</strong>
          <small>Person count</small>
        </div>

      </div>

      {detectionLoading && (
        <div className="cv-detection-message processing">
          <i></i> AI ENGINE IS PROCESSING THE DETECTION REQUEST...
        </div>
      )}

      {detectionResult && (
        <div className={`cv-detection-message ${detectionResult.mobile_detected ? "alert" : "success"}`}>
          <strong>
            {detectionResult.mobile_detected
              ? "⚠ MOBILE PHONE DETECTED"
              : "✓ NO MOBILE PHONE DETECTED"}
          </strong>
          <span>{detectionResult.message}</span>
        </div>
      )}

      {detectionError && (
        <div className="cv-detection-message alert">
          <strong>DETECTION ERROR</strong>
          <span>{detectionError}</span>
        </div>
      )}

      {!detectionResult && !detectionLoading && !detectionError && (
        <div className="cv-detection-message waiting">
          <strong>WAITING FOR DETECTION DATA</strong>
          <span>Detection results will appear here after AI analysis.</span>
        </div>
      )}

    </article>

    {/* SYSTEM PIPELINE */}
    <article className="cv-detection-panel cv-detection-pipeline">

      <div className="cv-detection-panel-heading">
        <div>
          <span className="cv-detection-label">04 / SYSTEM ARCHITECTURE</span>
          <h2>AI Processing Pipeline</h2>
        </div>
        <span className="cv-pipeline-tag">PROCESS FLOW</span>
      </div>

      <div className="cv-pipeline-steps">
        <div className="cv-pipeline-step blue">
          <i>01</i>
          <strong>CAMERA INPUT</strong>
          <small>Video source</small>
        </div>

        <span className="cv-pipeline-arrow">→</span>

        <div className="cv-pipeline-step purple">
          <i>02</i>
          <strong>AI PROCESSING</strong>
          <small>YOLO inference</small>
        </div>

        <span className="cv-pipeline-arrow">→</span>

        <div className="cv-pipeline-step red">
          <i>03</i>
          <strong>MOBILE DETECTION</strong>
          <small>Object identification</small>
        </div>

        <span className="cv-pipeline-arrow">→</span>

        <div className="cv-pipeline-step green">
          <i>04</i>
          <strong>ALERT SYSTEM</strong>
          <small>Teacher notification</small>
        </div>
      </div>

      <p className="cv-pipeline-note">
        Camera input, AI inference, detection and teacher alert are separate
        processing stages. Pending integrations are not shown as live.
      </p>

    </article>

  </section>
)}

        
{active === "incidents" && (
  <div className="cv-incidents-page">

    <PageHeading
      eyebrow="RESPONSE OPERATIONS / INCIDENT REGISTER"
      title={<>Incidents <span>& Alerts</span></>}
      subtitle="Review, filter and acknowledge classroom mobile-detection events."
    />

    {/* INCIDENT SUMMARY CARDS */}
    <div className="cv-incident-stats">

      <div className="cv-incident-stat purple">
        <span className="cv-incident-icon">◈</span>
        <div className="cv-incident-label">TOTAL INCIDENTS</div>
        <div className="cv-incident-value">{incidents.length}</div>
        <div className="cv-incident-foot">RECORDED EVENTS</div>
      </div>

      <div className="cv-incident-stat red">
        <span className="cv-incident-icon">⚠</span>
        <div className="cv-incident-label">HIGH SEVERITY</div>
        <div className="cv-incident-value">
          {incidents.filter((i) => i.severity === "HIGH").length}
        </div>
        <div className="cv-incident-foot">HIGH PRIORITY EVENTS</div>
      </div>

      <div className="cv-incident-stat orange">
        <span className="cv-incident-icon">◉</span>
        <div className="cv-incident-label">MEDIUM SEVERITY</div>
        <div className="cv-incident-value">
          {incidents.filter((i) => i.severity === "MEDIUM").length}
        </div>
        <div className="cv-incident-foot">MEDIUM PRIORITY EVENTS</div>
      </div>

      <div className="cv-incident-stat cyan">
        <span className="cv-incident-icon">✓</span>
        <div className="cv-incident-label">OPEN INCIDENTS</div>
        <div className="cv-incident-value">
          {incidents.filter((i) => i.status !== "Acknowledged").length}
        </div>
        <div className="cv-incident-foot">AWAITING ACKNOWLEDGEMENT</div>
      </div>

    </div>

    {/* FILTER TOOLBAR */}
    <div className="cv-incident-toolbar">
      <div>
        <div className="cv-incident-eyebrow">EVENT MANAGEMENT</div>
        <h3>Incident Monitoring</h3>
      </div>

      <div className="cv-incident-filter">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="ALL">ALL SEVERITIES</option>
          <option value="HIGH">HIGH</option>
          <option value="MEDIUM">MEDIUM</option>
        </select>

        <span className="cc-demo-pill">DEMO INCIDENT RECORDS</span>
      </div>
    </div>

    {/* INCIDENT REGISTER */}
    <div className="cv-incident-register">
      <div className="cv-incident-register-heading">
        <div>
          <div className="cv-incident-eyebrow">SECURITY EVENT DATABASE</div>
          <h2>Incident Register</h2>
          <p>Review and acknowledge detected classroom events.</p>
        </div>

        <div className="cv-incident-open">
          {incidents.filter((i) => i.status !== "Acknowledged").length}
          <span>OPEN EVENTS</span>
        </div>
      </div>

      {renderIncidents()}
    </div>
    
{/* TEACHER ALERT MANAGEMENT */}
<div className="cv-teacher-alert-panel">

  <div className="cv-teacher-alert-heading">
    <div>
      <div className="cv-incident-eyebrow">NOTIFICATION MANAGEMENT</div>
      <h2>Teacher Alert Center</h2>
      <p>Monitor classroom incidents requiring teacher attention.</p>
    </div>

    <span className="cv-alert-system-status">
      <span className="cv-alert-status-dot"></span>
      NOTIFICATION INTEGRATION PENDING
    </span>
  </div>

  <div className="cv-teacher-alert-list">

    {incidents.filter((item) => item.status !== "Acknowledged").length === 0 ? (
      <div className="cv-teacher-alert-empty">
        <span>✓</span>
        <h3>All Clear</h3>
        <p>There are no open incidents requiring attention.</p>
      </div>
    ) : (
      incidents
        .filter((item) => item.status !== "Acknowledged")
        .map((item) => (
          <div className="cv-teacher-alert-item" key={item.id}>

            <div className="cv-teacher-alert-icon">
              <span>⚠</span>
            </div>

            <div className="cv-teacher-alert-info">
              <strong>{item.title}</strong>
              <span>{item.room} · {item.time}</span>
              <small>Incident ID: {item.id}</small>
            </div>

            <div className="cv-teacher-alert-meta">
              <span className={`cv-teacher-severity ${item.severity.toLowerCase()}`}>
                {item.severity}
              </span>
              <span className="cv-teacher-pending">
                AWAITING ACKNOWLEDGEMENT
              </span>
            </div>

          </div>
        ))
    )}

  </div>

  <div className="cv-teacher-alert-footer">
    <span>Teacher notification delivery is not connected yet.</span>
    <span>LIVE INTEGRATION: PENDING</span>
  </div>

</div>


  </div>
)}

{active === "teacherNotifications" && (
  <div className="cv-notifications-page">

    <PageHeading
      eyebrow="CAMPUSVISION AI / COMMUNICATION CENTER"
      title={<>Teacher <span>Notifications</span></>}
      subtitle="Manage classroom alerts, monitor teacher responses and review notification activity."
    />

    {/* NOTIFICATION SUMMARY */}
    <div className="cv-notification-stats">

      <div className="cv-notification-stat purple">
        <div className="cv-notification-stat-top">
          <span>TOTAL ALERTS</span>
          <span>◈</span>
        </div>
        <h2>{incidents.length}</h2>
        <p>All recorded notifications</p>
      </div>

      <div className="cv-notification-stat red">
        <div className="cv-notification-stat-top">
          <span>HIGH PRIORITY</span>
          <span>⚠</span>
        </div>
        <h2>{incidents.filter(i => i.severity === "HIGH").length}</h2>
        <p>Require urgent attention</p>
      </div>

      <div className="cv-notification-stat orange">
        <div className="cv-notification-stat-top">
          <span>UNACKNOWLEDGED</span>
          <span>◷</span>
        </div>
        <h2>{incidents.filter(i => i.status !== "Acknowledged").length}</h2>
        <p>Awaiting teacher response</p>
      </div>

      <div className="cv-notification-stat green">
        <div className="cv-notification-stat-top">
          <span>ACKNOWLEDGED</span>
          <span>✓</span>
        </div>
        <h2>{incidents.filter(i => i.status === "Acknowledged").length}</h2>
        <p>Response recorded</p>
      </div>

    </div>

    {/* NOTIFICATION CONTROL PANEL */}
    <div className="cv-notification-control">

      <div>
        <span className="cv-notification-eyebrow">ALERT CONTROL CENTER</span>
        <h2>Notification Inbox</h2>
        <p>Classroom mobile-detection alerts and response status.</p>
      </div>

      <div className="cv-notification-filters">
        {["ALL", "HIGH", "MEDIUM", "PENDING", "ACKNOWLEDGED"].map(type => (
          <button
            key={type}
            type="button"
            className={teacherNotificationFilter === type ? "active" : ""}
            onClick={() => setTeacherNotificationFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>

    </div>

    {/* NOTIFICATION LIST */}
    <div className="cv-notification-list">

      {incidents.filter(item => {
        if (teacherNotificationFilter === "ALL") return true;
        if (teacherNotificationFilter === "PENDING") {
          return item.status !== "Acknowledged";
        }
        if (teacherNotificationFilter === "ACKNOWLEDGED") {
          return item.status === "Acknowledged";
        }
        return item.severity === teacherNotificationFilter;
      }).length === 0 ? (

        <div className="cv-notification-empty">
          <span>✓</span>
          <h3>No Notifications Found</h3>
          <p>There are no notifications matching this filter.</p>
        </div>

      ) : (

        incidents
          .filter(item => {
            if (teacherNotificationFilter === "ALL") return true;
            if (teacherNotificationFilter === "PENDING") {
              return item.status !== "Acknowledged";
            }
            if (teacherNotificationFilter === "ACKNOWLEDGED") {
              return item.status === "Acknowledged";
            }
            return item.severity === teacherNotificationFilter;
          })
          .map(item => (

            <div className="cv-notification-card" key={item.id}>

              <div className={`cv-notification-indicator ${item.severity.toLowerCase()}`}>
                {item.severity === "HIGH" ? "!" : "◈"}
              </div>

              <div className="cv-notification-content">

                <div className="cv-notification-card-top">
                  <span className={`cv-notification-priority ${item.severity.toLowerCase()}`}>
                    {item.severity} PRIORITY
                  </span>

                  <span className="cv-notification-reference">
                    {item.id}
                  </span>
                </div>

                <h3>{item.title}</h3>

                <div className="cv-notification-information">
                  <span>⌖ {item.room}</span>
                  <span>◷ {item.time}</span>
                  <span>◎ Confidence: {item.confidence || "N/A"}</span>
                </div>

                <div className="cv-notification-teacher">
                  <span className="cv-teacher-avatar">T</span>
                  <div>
                    <small>ASSIGNED TEACHER</small>
                    <strong>Teacher assignment pending</strong>
                  </div>
                </div>

              </div>

              <div className="cv-notification-actions">

                <span className={`cv-notification-status ${
                  item.status === "Acknowledged" ? "acknowledged" : "pending"
                }`}>
                  {item.status === "Acknowledged" ? "✓ ACKNOWLEDGED" : "● PENDING"}
                </span>

                <button
                  type="button"
                  className="cv-notification-view"
                  onClick={() => setSelectedIncident(item)}
                >
                  VIEW DETAILS ↗
                </button>

                {item.status !== "Acknowledged" && (
                  <button
                    type="button"
                    className="cv-notification-ack"
                    onClick={() => acknowledge(item.id)}
                  >
                    ✓ MARK ACKNOWLEDGED
                  </button>
                )}

              </div>

            </div>

          ))
      )}

    </div>

    {/* DELIVERY STATUS */}
    <div className="cv-notification-delivery">

      <div className="cv-delivery-icon">⌁</div>

      <div>
        <span>NOTIFICATION DELIVERY STATUS</span>
        <h3>Teacher Notification Integration</h3>
        <p>
          Alerts are currently displayed in the dashboard.
          Actual delivery to teachers is not connected yet.
        </p>
      </div>

      <span className="cv-delivery-pending">INTEGRATION PENDING</span>

    </div>

  </div>
)}
        

{active === "detectionHistory" && (
  <div className="dh-page">

    <div className="dh-topline">
      <div>
        <div className="dh-eyebrow">
          AI INTELLIGENCE / EVIDENCE MANAGEMENT
        </div>

        <PageHeading
          eyebrow=""
          title={<>Detection <span>History</span></>}
          subtitle="Monitor, review and manage classroom mobile-detection events."
        />
      </div>

      <div className="dh-status">
        <span className="dh-status-dot"></span>
        {historyLoading ? "LOADING RECORDS" : historyError ? "CONNECTION ERROR" : "DATABASE CONNECTED"}
      </div>
    </div>

    {/* SUMMARY CARDS */}
    <div className="dh-stats">

      <div className="dh-stat-card">
        <div className="dh-stat-top">
          <span>TOTAL DETECTIONS</span>
          <span className="dh-stat-icon">▤</span>
        </div>
        <h2>{detectionHistory.length}</h2>
        <p>Recorded mobile incidents</p>
      </div>

      <div className="dh-stat-card">
        <div className="dh-stat-top">
          <span>MOBILE EVIDENCE</span>
          <span className="dh-stat-icon">▣</span>
        </div>
        <h2>{detectionHistory.filter(item => item.mobile_image).length}</h2>
        <p>Detection images stored</p>
      </div>

      <div className="dh-stat-card">
        <div className="dh-stat-top">
          <span>FACE SNAPSHOTS</span>
          <span className="dh-stat-icon">◎</span>
        </div>
        <h2>{detectionHistory.filter(item => item.face_snapshot).length}</h2>
        <p>Privacy-protected snapshots</p>
      </div>

      <div className="dh-stat-card">
        <div className="dh-stat-top">
          <span>PRINT REPORTS</span>
          <span className="dh-stat-icon">▧</span>
        </div>
        <h2>0</h2>
        <p>Generated incident reports</p>
      </div>

    </div>

    {/* HISTORY PANEL */}
    <div className="dh-history-panel">

      <div className="dh-panel-header">
        <div>
          <div className="dh-section-label">
            DETECTION DATABASE
          </div>
          <h2>Mobile Detection Records</h2>
          <p>Backend records and supporting detection evidence.</p>
        </div>

        <span className="dh-awaiting">
          {detectionHistory.length} RECORDS FOUND
        </span>
      </div>

      {historyLoading ? (

        <div className="dh-empty-state">
          <h3>Loading Detection Records...</h3>
          <p>Connecting to CampusVision AI database.</p>
        </div>

      ) : historyError ? (

        <div className="dh-empty-state">
          <h3>Unable to Load Records</h3>
          <p>{historyError}</p>
        </div>

      ) : detectionHistory.length === 0 ? (

        <div className="dh-empty-state">
          <div className="dh-empty-visual">
            <div className="dh-visual-ring"></div>
            <div className="dh-visual-icon">▣</div>
            <span className="dh-visual-small">◎</span>
          </div>

          <h3>No Detection Records Yet</h3>

          <p>
            Mobile detection images, face snapshots and incident
            information will appear here after records are saved.
          </p>

          <div className="dh-empty-tags">
            <span>Mobile Evidence</span>
            <span>Face Snapshot</span>
            <span>Timestamp</span>
          </div>
        </div>

      ) : (

        <div className="cc-table-wrap">
          <table className="cc-table">
            <thead>
              <tr>
                <th>INCIDENT ID</th>
                <th>CLASSROOM</th>
                <th>CAMERA ID</th>
                <th>DETECTION</th>
                <th>CONFIDENCE</th>
                <th>DATE</th>
                <th>DAY</th>
                <th>TIME</th>
                <th>STATUS</th>
                <th>REPORT</th>
              </tr>
            </thead>

            <tbody>
              {detectionHistory.map((item) => (
                <tr key={item.incident_id}>
                  <td className="mono">{item.incident_id}</td>
                  <td>{item.classroom}</td>
                  <td className="mono">{item.camera_id}</td>
                  <td>{item.detection_type}</td>

                  <td>
                    {item.confidence != null
                      ? `${(item.confidence * 100).toFixed(1)}%`
                      : "—"}
                  </td>

                  <td>{item.date || "—"}</td>
                  <td>{item.day || "—"}</td>
                  <td className="mono">{item.time || "—"}</td>

                  <td>
                    <span className="cc-status cc-status-warning">
                      {item.status || "OPEN"}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="cc-small-btn"
                      onClick={() => window.print()}
                    >
                      PRINT
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="dh-panel-footer">
        <span>DATA SOURCE</span>
        <strong>FASTAPI INCIDENT DATABASE</strong>
        <span className="dh-footer-separator">•</span>
        <span>BACKEND CONNECTED</span>
      </div>

    </div>

    {/* EVIDENCE STRUCTURE */}
    <div className="dh-evidence-info">

      <div className="dh-evidence-heading">
        <div className="dh-section-label">
          EVIDENCE MANAGEMENT
        </div>
        <h2>Incident Evidence Structure</h2>
      </div>

      <div className="dh-evidence-grid">

        <div className="dh-evidence-item">
          <span className="dh-evidence-icon">▣</span>
          <div>
            <h4>Mobile Detection Image</h4>
            <p>Original detection evidence</p>
          </div>
          <span className="dh-pending">
            {detectionHistory.some(item => item.mobile_image)
              ? "AVAILABLE"
              : "PENDING"}
          </span>
        </div>

        <div className="dh-evidence-item">
          <span className="dh-evidence-icon">◎</span>
          <div>
            <h4>Face Snapshot</h4>
            <p>Privacy-protected face image</p>
          </div>
          <span className="dh-pending">
            {detectionHistory.some(item => item.face_snapshot)
              ? "AVAILABLE"
              : "PENDING"}
          </span>
        </div>

        <div className="dh-evidence-item">
          <span className="dh-evidence-icon">◷</span>
          <div>
            <h4>Date & Time</h4>
            <p>Recorded detection timestamp</p>
          </div>
          <span className="dh-pending">
            {detectionHistory.length > 0 ? "AVAILABLE" : "PENDING"}
          </span>
        </div>

        <div className="dh-evidence-item">
          <span className="dh-evidence-icon">▤</span>
          <div>
            <h4>Printable Incident Report</h4>
            <p>Complete evidence report</p>
          </div>
          <span className="dh-pending">PENDING</span>
        </div>

      </div>
    </div>

  </div>
)}

 {active === "notifications" && (
  <>
    <PageHeading
      eyebrow="COMMUNICATION / TEACHER ALERT CENTER"
      title={<>Teacher <span>Notifications</span></>}
      subtitle="Classroom mobile-detection alerts for authorized teachers."
    />

    <div className="cc-kpi-grid">
      <Stat label="TOTAL ALERTS" value="—" change="Awaiting backend" />
      <Stat label="DELIVERED" value="—" change="Not connected" />
      <Stat label="ACKNOWLEDGED" value="—" change="Not connected" />
      <Stat label="DELIVERY STATUS" value="OFFLINE" change="Integration pending" />
    </div>

    <div className="cc-panel">
      <div className="cc-panel-head">
        <div>
          <span className="cc-eyebrow">ALERT DELIVERY PIPELINE</span>
          <h2>Teacher Notification Center</h2>
        </div>
        <span className="cc-demo-pill">BACKEND NOT CONNECTED</span>
      </div>

      <div className="cc-empty-state">
        <div className="cc-empty-icon">♧</div>
        <h2>Notification service not connected</h2>
        <p>
          Real-time teacher alerts will appear here after AI detection,
          teacher mapping and notification delivery are integrated.
        </p>
        <span className="cc-demo-pill">WAITING FOR LIVE INTEGRATION</span>
      </div>
    </div>

    <div className="cc-panel">
      <div className="cc-panel-head">
        <div>
          <span className="cc-eyebrow">NOTIFICATION WORKFLOW</span>
          <h2>Alert Processing</h2>
        </div>
      </div>

      <div className="cc-info-grid">
        <div>
          <h3>01. Detection</h3>
          <p>AI model detects a mobile phone in a classroom camera feed.</p>
        </div>

        <div>
          <h3>02. Teacher Mapping</h3>
          <p>The system identifies the teacher assigned to that classroom.</p>
        </div>

        <div>
          <h3>03. Notification</h3>
          <p>The alert is delivered and its actual delivery status is recorded.</p>
        </div>
      </div>
    </div>
  </>
)}

        {active === "cameras" && (
  <>
    <PageHeading
      eyebrow="INFRASTRUCTURE / CAMERA MANAGEMENT"
      title={<>Camera <span>Network</span></>}
      subtitle="Configure camera endpoints and prepare real CCTV stream integration."
    />

    <div className="cc-kpi-grid">
      <Stat label="REGISTERED CAMERAS" value={String(cameras.length).padStart(2, "0")} change="Current configuration list" />
      <Stat label="CONNECTED CAMERAS" value="—" change="Connection test pending" />
      <Stat label="DISCONNECTED" value="—" change="Not verified yet" />
      <Stat label="STREAM STATUS" value="OFFLINE" change="Awaiting CCTV integration" />
    </div>

    <div className="cc-panel">
      <div className="cc-panel-heading">
        <div>
          <div className="cc-eyebrow">CAMERA CONFIGURATION</div>
          <h2>Registered Camera Positions</h2>
        </div>
        <span className="cc-demo-pill">CONFIGURATION ONLY</span>
      </div>

      <div className="cc-table-wrap">
        <table className="cc-table">
          <thead>
            <tr>
              <th>CAMERA ID</th>
              <th>LOCATION</th>
              <th>MONITORING ZONE</th>
              <th>STREAM TYPE</th>
              <th>CONNECTION</th>
            </tr>
          </thead>

          <tbody>
            {cameras.map((camera) => (
              <tr key={camera.id}>
                <td className="mono">{camera.id}</td>
                <td>{camera.room}</td>
                <td>{camera.zone}</td>
                <td>Not configured</td>
                <td>
                  <span className="cc-status cc-status-warning">
                    Not tested
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div className="cc-panel">
      <div className="cc-panel-heading">
        <div>
          <div className="cc-eyebrow">STREAM CONFIGURATION</div>
          <h2>Camera Connection Requirements</h2>
        </div>
        <span className="cc-demo-pill">SETUP PENDING</span>
      </div>

      <div className="cc-info-grid">
        <div>
          <h3>01. Camera Endpoint</h3>
          <p>Camera IP address, port and authorized stream credentials.</p>
        </div>

        <div>
          <h3>02. Stream Protocol</h3>
          <p>RTSP or supported IP camera stream configuration.</p>
        </div>

        <div>
          <h3>03. Connection Verification</h3>
          <p>Verify the actual stream before showing camera online status.</p>
        </div>
      </div>
    </div>

    <div className="cc-panel">
      <div className="cc-panel-heading">
        <div>
          <div className="cc-eyebrow">SECURE INTEGRATION</div>
          <h2>Camera Security</h2>
        </div>
      </div>

      <p>
        Camera credentials will be handled securely through the backend.
        Passwords and stream URLs should never be exposed in frontend code.
      </p>
    </div>
  </>
)}

        {active === "classrooms" && (
          <>
            <PageHeading
              eyebrow="FACILITY MANAGEMENT / LEARNING SPACES"
              title={<>Classroom <span>Directory</span></>}
              subtitle="Organize monitored classrooms, laboratories and assigned camera positions."
            />
            <div className="cc-room-grid">
              {[
                { name: "CLASSROOM 101", block: "Academic Block A", cams: 2, zone: "Teaching + seating" },
                { name: "CLASSROOM 102", block: "Academic Block A", cams: 1, zone: "Main seating" },
                { name: "COMPUTER LAB 01", block: "Technology Wing", cams: 1, zone: "Workstation aisle" },
                { name: "CLASSROOM 104", block: "Academic Block B", cams: 1, zone: "Rear seating" },
                { name: "SCIENCE LAB", block: "Science Wing", cams: 1, zone: "Practical benches" },
              ].map((room) => (
                <article className="cc-panel cc-room-card" key={room.name}>
                  <div className="cc-room-symbol">⌂</div>
                  <div className="cc-eyebrow">{room.block}</div>
                  <h2>{room.name}</h2>
                  <p>{room.zone}</p>
                  <div className="cc-room-meta">
                    <span>{room.cams} camera positions</span>
                    <span className="amber">Integration pending</span>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

       {active === "teachers" && (
  <div className="cv-teachers-page">

    <PageHeading
      eyebrow="FACILITY MANAGEMENT / STAFF DIRECTORY"
      title={<>Teacher <span>Management</span></>}
      subtitle="Manage authorized staff profiles, classroom assignments and alert responsibilities."
    />

    {/* CONNECTION STATUS */}
    <div className="cc-panel cv-teacher-directory">
  <div className="cc-panel-head">
    <div>
      <span className="cc-eyebrow">STAFF DIRECTORY</span>
      <h2>Teacher Records</h2>
    </div>

    <button
      className="cv-add-teacher-btn"
      onClick={() => setShowTeacherForm(true)}
    >
      + Add Teacher
    </button>
  </div>

  {showTeacherForm && (
    <form className="cv-teacher-form" onSubmit={handleTeacherSubmit}>
      <h3>{editingTeacherId ? "Edit Teacher Profile" : "Register New Teacher"}</h3>
      <h3>Register New Teacher</h3>

      <div className="cv-teacher-form-grid">
        <input
          placeholder="Full Name *"
          value={teacherForm.name}
          onChange={(e) =>
            setTeacherForm({ ...teacherForm, name: e.target.value })
          }
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={teacherForm.email}
          onChange={(e) =>
            setTeacherForm({ ...teacherForm, email: e.target.value })
          }
        />

        <input
          placeholder="Mobile Number"
          value={teacherForm.phone}
          onChange={(e) =>
            setTeacherForm({ ...teacherForm, phone: e.target.value })
          }
        />

        <input
          placeholder="Department"
          value={teacherForm.department}
          onChange={(e) =>
            setTeacherForm({ ...teacherForm, department: e.target.value })
          }
        />

        <input
          placeholder="Assigned Classroom * (e.g. Classroom 101)"
          value={teacherForm.classroom}
          onChange={(e) =>
            setTeacherForm({ ...teacherForm, classroom: e.target.value })
          }
          required
        />

        <select
          value={teacherForm.designation}
          onChange={(e) =>
            setTeacherForm({ ...teacherForm, designation: e.target.value })
          }
        >
          <option>Class Teacher</option>
          <option>Assistant Teacher</option>
          <option>HOD</option>
          <option>Faculty</option>
        </select>
      </div>

      <div className="cv-teacher-form-actions">
        <button type="submit">Save Teacher Profile</button>
        <button
          type="button"
          onClick={() => setShowTeacherForm(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  )}

  {teachers.length === 0 ? (
    <div className="cv-teacher-empty">
      <div className="cv-teacher-empty-icon">♙</div>
      <h2>No Teacher Profiles Available</h2>
      <p>Add a teacher profile to start the classroom assignment demo.</p>
    </div>
  ) : (
    <div className="cv-teacher-table-wrap">
      <table className="cv-teacher-table">
        <thead>
          <tr>
            <th>TEACHER ID</th>
            <th>TEACHER NAME</th>
            <th>DEPARTMENT</th>
            <th>CLASSROOM</th>
            <th>DESIGNATION</th>
            <th>STATUS</th>
          </tr>
        </thead>

        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>{teacher.id}</td>
              <td>{teacher.name}</td>
              <td>{teacher.department || "—"}</td>
              <td>{teacher.classroom}</td>
              <td>{teacher.designation}</td>
              <td><span className="cv-teacher-active">REGISTERED</span></td>
              <td>
  <button
    className="cv-edit-btn"
    onClick={() => handleEditTeacher(teacher)}
  >
    ✏️ Edit
  </button>

  <button
    className="cv-delete-btn"
    onClick={() => handleDeleteTeacher(teacher.id)}
  >
    🗑 Delete
  </button>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

    {/* STAFF DIRECTORY */}
    <div className="cv-teacher-directory">

      <div className="cv-teacher-section-heading">
        <div>
          <span>AUTHORIZED PERSONNEL / DIRECTORY</span>
          <h2>Staff Directory</h2>
          <p>Centralized teacher profile and contact information management.</p>
        </div>

        <span className="cv-teacher-db-badge">
          <i></i> DATABASE NOT CONNECTED
        </span>
      </div>

      <div className="cv-teacher-empty">

        <div className="cv-teacher-empty-visual">
          <div className="cv-teacher-empty-ring"></div>
          <div className="cv-teacher-empty-icon">♙</div>
          <span className="cv-teacher-empty-orbit orbit-one">+</span>
          <span className="cv-teacher-empty-orbit orbit-two">⌁</span>
        </div>

        <span className="cv-teacher-empty-label">STAFF RECORDS / 00</span>
        <h3>No Teacher Profiles Available</h3>
        <p>
          The staff directory is currently waiting for database connectivity.
          Authorized teacher profiles will be displayed here once records are registered.
        </p>

        <div className="cv-teacher-empty-tags">
          <span>TEACHER ID</span>
          <span>CONTACT DETAILS</span>
          <span>CLASSROOM</span>
        </div>

        <div className="cv-teacher-empty-status">
          <span></span> WAITING FOR AUTHORIZED STAFF DATA
        </div>

      </div>
    </div>

    {/* MANAGEMENT WORKFLOW */}
    <div className="cv-teacher-workflow">

      <div className="cv-teacher-section-heading">
        <div>
          <span>FACILITY OPERATIONS / RESPONSIBILITY CONTROL</span>
          <h2>Classroom Assignment Workflow</h2>
          <p>How CampusVision AI connects teachers with classroom security alerts.</p>
        </div>
        <span className="cv-teacher-workflow-tag">3-STAGE PROCESS</span>
      </div>

      <div className="cv-teacher-workflow-grid">

        <div className="cv-teacher-workflow-card purple">
          <div className="cv-teacher-step-top">
            <span>01 / PROFILE</span>
            <b>♙</b>
          </div>
          <h3>Teacher Registration</h3>
          <p>
            Create authorized teacher profiles with unique ID, name,
            email address and contact information.
          </p>
          <div className="cv-teacher-step-line">
            <span></span>
          </div>
          <small>STAFF IDENTITY MANAGEMENT</small>
        </div>

        <div className="cv-teacher-workflow-card cyan">
          <div className="cv-teacher-step-top">
            <span>02 / MAPPING</span>
            <b>⌖</b>
          </div>
          <h3>Classroom Assignment</h3>
          <p>
            Map each registered teacher to the correct classroom
            and maintain responsibility records.
          </p>
          <div className="cv-teacher-step-line">
            <span></span>
          </div>
          <small>CLASSROOM RESPONSIBILITY</small>
        </div>

        <div className="cv-teacher-workflow-card orange">
          <div className="cv-teacher-step-top">
            <span>03 / RESPONSE</span>
            <b>⌁</b>
          </div>
          <h3>Intelligent Alert Routing</h3>
          <p>
            Route mobile-detection alerts to the teacher assigned
            to the classroom where the event occurred.
          </p>
          <div className="cv-teacher-step-line">
            <span></span>
          </div>
          <small>TEACHER NOTIFICATION SYSTEM</small>
        </div>

      </div>

    </div>

    {/* SYSTEM FOOTER */}
    <div className="cv-teacher-system-footer">
      <span>CAMPUSVISION AI</span>
      <span>STAFF & CLASSROOM MANAGEMENT</span>
      <span>BACKEND INTEGRATION PENDING</span>
    </div>

  </div>
)}

        {active === "analytics" && (
          <>
            <PageHeading
              eyebrow="INTELLIGENCE / PERFORMANCE"
              title={<>Intelligence <span>& Analytics</span></>}
              subtitle="Illustrative detection trends and operational summaries. No live telemetry connected."
            />
            <section className="cc-kpis cv-industrial-kpis">

  <Stat
    label="REGISTERED CAMERAS"
    value={cameraRegistry.length.toString().padStart(2, "0")}
    tone="blue"
    icon="▦"
    foot={<><b>CAMERA REGISTRY</b><span>REGISTERED DEVICES</span></>}
  />

  <Stat
    label="RECORDED DETECTIONS"
    value={detectionHistory.length.toString().padStart(2, "0")}
    tone="cyan"
    icon="◎"
    foot={<><b>BACKEND RECORDS</b><span>DETECTION HISTORY</span></>}
  />

  <Stat
    label="OPEN DEMO INCIDENTS"
    value={incidents.filter((i) => i.status !== "Acknowledged").length.toString().padStart(2, "0")}
    tone="redline"
    icon="⚑"
    foot={<><b className="danger">INCIDENT REGISTER</b><span>SAMPLE DATA</span></>}
  />

  <Stat
    label="AI MODEL STATUS"
    value="PENDING"
    tone="greenline"
    icon="⬡"
    foot={<><b className="amber">INTEGRATION REQUIRED</b><span>NOT LIVE YET</span></>}
  />

</section>
            <div className="cc-panel">
              <div className="cc-panel-heading">
                <div>
                  <div className="cc-eyebrow">EVENT TELEMETRY</div>
                  <h2>Detection Activity</h2>
                </div>
                <select value={range} onChange={(e) => setRange(e.target.value)}>
                  <option>24 HOURS</option>
                  <option>7 DAYS</option>
                  <option>30 DAYS</option>
                </select>
              </div>
              <ActivityChart data={chartData} large />
              <div className="cc-chart-note">
                <span>ILLUSTRATIVE EVENT TREND</span><b>NOT LIVE DATA</b>
              </div>
            </div>
          </>
        )}

        {active === "evidence" && (
  <>
    <PageHeading
      eyebrow="FORENSICS / EVIDENCE MANAGEMENT"
      title={<>Evidence <span>Vault</span></>}
      subtitle="Review, track and manage recorded mobile detection evidence."
    />

    <div className="cc-kpi-grid">
  <Stat label="TOTAL EVIDENCE" value="03" foot="DEMO RECORDS" tone="blue" icon="▣" />
  <Stat label="PENDING REVIEW" value="02" foot="AWAITING REVIEW" tone="purple" icon="◷" />
  <Stat label="VERIFIED" value="01" foot="REVIEWED RECORDS" tone="green" icon="✓" />
  <Stat label="STORAGE STATUS" value="READY" foot="DEMO MODE" tone="orange" icon="◈" />
</div>

    <div className="cc-panel">
      <div className="cc-panel-head">
        <div>
          <span className="cc-eyebrow">EVIDENCE DATABASE</span>
          <h2>Detection Records</h2>
        </div>
        <span className="cc-demo-pill">SAMPLE DATA</span>
      </div>

      <div className="cc-table-wrap">
        <table className="cc-table">
          <thead>
            <tr>
              <th>Evidence ID</th>
              <th>Classroom</th>
              <th>Camera</th>
              <th>Detection</th>
              <th>Date & Time</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>EV-2026-001</td>
              <td>Classroom 01</td>
              <td>CAM-01</td>
              <td>Mobile Phone</td>
              <td>29 Oct 2026 · 10:32 AM</td>
              <td>
                <span className="cc-status cc-status-warning">
                  Pending
                </span>
              </td>
            </tr>

            <tr>
              <td>EV-2026-002</td>
              <td>Classroom 02</td>
              <td>CAM-03</td>
              <td>Mobile Phone</td>
              <td>29 Oct 2026 · 11:15 AM</td>
              <td>
                <span className="cc-status cc-status-success">
                  Verified
                </span>
              </td>
            </tr>

            <tr>
              <td>EV-2026-003</td>
              <td>Computer Lab</td>
              <td>CAM-05</td>
              <td>Mobile Phone</td>
              <td>29 Oct 2026 · 12:05 PM</td>
              <td>
                <span className="cc-status cc-status-warning">
                  Pending
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className="cc-panel">
      <div className="cc-panel-head">
        <div>
          <span className="cc-eyebrow">SECURITY & COMPLIANCE</span>
          <h2>Evidence Handling Policy</h2>
        </div>
      </div>

      <div className="cc-info-grid">
        <div>
          <h3>01. Capture</h3>
          <p>Detection snapshots will be recorded after AI model integration.</p>
        </div>

        <div>
          <h3>02. Review</h3>
          <p>Authorized staff can review and verify recorded detection events.</p>
        </div>

        <div>
          <h3>03. Storage</h3>
          <p>Verified evidence will be stored securely with its event details.</p>
        </div>
      </div>
    </div>
  </>
)}

        {active === "reports" && (
  <>
    <PageHeading
      eyebrow="INTELLIGENCE / REPORT CENTER"
      title={<>System <span>Reports</span></>}
      subtitle="Generate and review classroom surveillance and mobile detection reports."
    />

    <div className="cc-kpi-grid">
      <Stat label="TOTAL REPORTS" value="12" change="DEMO RECORDS" />
      <Stat label="THIS MONTH" value="08" change="SAMPLE DATA" />
      <Stat label="INCIDENT REPORTS" value="05" change="SAMPLE DATA" />
      <Stat label="SYSTEM STATUS" value="READY" change="DEMO MODE" />
    </div>

    <div className="cc-panel">
      <div className="cc-panel-head">
        <div>
          <span className="cc-eyebrow">REPORT GENERATION</span>
          <h2>Create a New Report</h2>
        </div>
        <span className="cc-demo-pill">DEMO MODE</span>
      </div>

      <div className="cc-report-grid">
        <div className="cc-report-option">
          <span className="cc-report-icon">▤</span>
          <h3>Daily Surveillance Report</h3>
          <p>Summary of classroom camera monitoring activity.</p>
          <button className="cc-primary-btn" onClick={handleExport}>
            Print Report
          </button>
        </div>

        <div className="cc-report-option">
          <span className="cc-report-icon">⚠</span>
          <h3>Incident Report</h3>
          <p>Review of recorded mobile detection incidents.</p>
          <button className="cc-primary-btn" onClick={handleExport}>
            Print Report
          </button>
        </div>

        <div className="cc-report-option">
          <span className="cc-report-icon">▥</span>
          <h3>Camera Performance Report</h3>
          <p>Overview of camera availability and monitoring status.</p>
          <button className="cc-primary-btn"onClick={handleExport}>
            Print Report
          </button>
        </div>
      </div>
    </div>

    <div className="cc-panel">
      <div className="cc-panel-head">
        <div>
          <span className="cc-eyebrow">RECENT ACTIVITY</span>
          <h2>Recent Reports</h2>
        </div>
      </div>

      <div className="cc-table-wrap">
        <table className="cc-table">
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Report Name</th>
              <th>Generated Date</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
              <td>
  <button
    className="cv-edit-btn"
    onClick={() => handleEditTeacher(teacher)}
  >
    ✏️ Edit
  </button>

  <button
    className="cv-delete-btn"
    onClick={() => handleDeleteTeacher(teacher.id)}
  >
    🗑 Delete
  </button>
</td>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>RP-001</td>
              <td>Daily Surveillance Summary</td>
              <td>29 Oct 2026</td>
              <td>Surveillance</td>
              <td>
                <span className="cc-status cc-status-success">Ready</span>
              </td>
              <td>
                <button className="cc-small-btn"onClick={handleExport}>
                  Print
                </button>
              </td>
            </tr>

            <tr>
              <td>RP-002</td>
              <td>Mobile Detection Summary</td>
              <td>28 Oct 2026</td>
              <td>Incidents</td>
              <td>
                <span className="cc-status cc-status-success">Ready</span>
              </td>
              <td>
                <button className="cc-small-btn" onClick={handleExport}>
                  Print
                </button>
              </td>
            </tr>

            <tr>
              <td>RP-003</td>
              <td>Camera Status Overview</td>
              <td>27 Oct 2026</td>
              <td>System</td>
              <td>
                <span className="cc-status cc-status-warning">Demo</span>
              </td>
              <td>
                <button className="cc-small-btn" onClick={handleExport}>
                  Print
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </>
)}

        <footer className="cc-footer">
          <span>CAMPUSVISION AI<b>·</b> SECURITY OPERATIONS PLATFORM</span>
          <span>LOCAL WORKSPACE <b>·</b> BUILD 02 <b>·</b> DEMO DATA</span>
        </footer>
      </main>
    </div>
  );
}
