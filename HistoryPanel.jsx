/* ==========================================================
   AI SURVEILLANCE SYSTEM
========================================================== */

/* RESET */

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

html{
    scroll-behavior:smooth;
}

body{
    font-family:"Segoe UI",sans-serif;
    background:#06111d;
    color:#ffffff;
    overflow-x:hidden;
}

/* MAIN APP */

.app{

    min-height:100vh;

    position:relative;

    padding:24px;

    background:
    linear-gradient(rgba(5,10,20,.93),rgba(5,10,20,.93)),
    url("https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=80");

    background-size:cover;
    background-position:center;
    background-attachment:fixed;

}

/* GRID */

.app::before{

    content:"";

    position:fixed;

    inset:0;

    background-image:
    linear-gradient(rgba(0,255,255,.05) 1px,transparent 1px),
    linear-gradient(90deg,rgba(0,255,255,.05) 1px,transparent 1px);

    background-size:45px 45px;

    pointer-events:none;

    z-index:0;

}

/* CYBER BACKGROUND */

.cyber-bg{

    position:fixed;

    inset:0;

    overflow:hidden;

    pointer-events:none;

    z-index:1;

}

.cyber-bg span{

    position:absolute;

    width:2px;

    height:120px;

    background:rgba(0,255,255,.30);

    animation:cyberMove 8s linear infinite;

}

.cyber-bg span:nth-child(1){left:8%;animation-delay:0s;}
.cyber-bg span:nth-child(2){left:20%;animation-delay:1s;}
.cyber-bg span:nth-child(3){left:34%;animation-delay:2s;}
.cyber-bg span:nth-child(4){left:48%;animation-delay:3s;}
.cyber-bg span:nth-child(5){left:62%;animation-delay:4s;}
.cyber-bg span:nth-child(6){left:76%;animation-delay:5s;}
.cyber-bg span:nth-child(7){left:88%;animation-delay:6s;}
.cyber-bg span:nth-child(8){left:96%;animation-delay:7s;}

@keyframes cyberMove{

    from{

        transform:translateY(-150px);

        opacity:0;

    }

    20%{

        opacity:1;

    }

    to{

        transform:translateY(120vh);

        opacity:0;

    }

}

/* HEADER SPACE */

.topbar{

    margin-bottom:25px;

    position:relative;

    z-index:10;

}

/* DASHBOARD */

.dashboard{

    display:grid;

    grid-template-columns:300px 1fr 330px;

    gap:22px;

    align-items:start;

    position:relative;

    z-index:5;

}

/* PANELS */

.left-panel,
.center-panel,
.right-panel{

    display:flex;

    flex-direction:column;

    gap:22px;

}

/* CARD */

.card{

    background:rgba(15,23,42,.80);

    backdrop-filter:blur(12px);

    border:1px solid rgba(0,255,255,.20);

    border-radius:18px;

    padding:20px;

    transition:.35s;

    box-shadow:0 10px 25px rgba(0,0,0,.45);

}

.card:hover{

    transform:translateY(-6px);

    border-color:#00ffff;

    box-shadow:
    0 0 25px rgba(0,255,255,.25);

}

.card h2{

    color:#00eaff;

    margin-bottom:18px;

    font-size:22px;

}
.detect-btn,
.clear-btn{

  height:55px;

  font-size:17px;

  margin-top:15px;

}
input[type="file"]{

  height:45px;

  font-size:15px;

}
/* SCROLLBAR */

::-webkit-scrollbar{

    width:8px;

}

::-webkit-scrollbar-track{

    background:#111827;

}

::-webkit-scrollbar-thumb{

    background:#00d9ff;

    border-radius:20px;

}

/* RESPONSIVE */

@media(max-width:1200px){

.dashboard{

grid-template-columns:1fr;

}

}
/* ==========================================================
                PROFESSIONAL HEADER
========================================================== */

.topbar{

    display:flex;

    justify-content:space-between;

    align-items:center;

    padding:22px 30px;

    border-radius:18px;

    background:rgba(12,20,35,.82);

    backdrop-filter:blur(15px);

    border:1px solid rgba(0,255,255,.20);

    box-shadow:0 10px 30px rgba(0,0,0,.45);

}

.logo{

    font-size:30px;

    font-weight:700;

    color:#00eaff;

    letter-spacing:2px;

    text-shadow:0 0 15px cyan;

}

.top-center{

    flex:1;

    text-align:center;

}

.top-center h2{

    color:#ffffff;

    font-size:28px;

    margin-bottom:6px;

}

.top-center p{

    color:#8fdcff;

    font-size:15px;

}

.top-right{

    text-align:right;

    min-width:220px;

}

.status-online{

    display:inline-flex;

    align-items:center;

    gap:8px;

    padding:8px 16px;

    border-radius:30px;

    color:#00ff88;

    border:1px solid #00ff88;

    background:rgba(0,255,120,.12);

    font-weight:bold;

    animation:livePulse 1s infinite;

}

.clock{

    margin-top:12px;

    font-size:28px;

    color:#00ffff;

    font-family:Consolas, monospace;

    font-weight:bold;

}

.date{

    margin-top:6px;

    color:#b7c6d9;

    font-size:14px;

}

@keyframes livePulse{

    0%{
        box-shadow:0 0 8px #00ff88;
    }

    50%{
        box-shadow:0 0 22px #00ff88;
    }

    100%{
        box-shadow:0 0 8px #00ff88;
    }

}

/* ==========================
   STATS SECTION
========================== */

.stats{

    display:grid;

    grid-template-columns:repeat(4,1fr);

    gap:20px;

    margin-bottom:24px;

}

.stat-card{

    background:rgba(15,23,42,.82);

    border:1px solid rgba(0,255,255,.18);

    border-radius:18px;

    padding:20px;

    text-align:center;

    backdrop-filter:blur(12px);

    transition:.35s;

}

.stat-card:hover{

    transform:translateY(-6px);

    box-shadow:0 0 25px rgba(0,255,255,.25);

}

.stat-card h3{

    color:#8fdcff;

    font-size:16px;

    margin-bottom:10px;

}

.stat-card h1{

    font-size:36px;

    color:#ffffff;

    margin-bottom:8px;

}

.stat-card small{

    color:#90a9c8;

}

@media(max-width:1200px){

.stats{

grid-template-columns:repeat(2,1fr);

}

}

@media(max-width:700px){

.stats{

grid-template-columns:1fr;

}

.topbar{

flex-direction:column;

gap:20px;

text-align:center;

}

.top-right{

text-align:center;

}

}
/* ==========================================================
   LEFT SIDEBAR
========================================================== */

.upload-box{

    background:rgba(15,23,42,.82);

    border:1px solid rgba(0,255,255,.20);

    border-radius:18px;

    padding:22px;

}

.upload-box h3{

    color:#00eaff;

    font-size:20px;

    margin-bottom:18px;

}

.upload-box input{

    width:100%;

    margin-bottom:15px;

    color:white;

}

/* ================= BUTTONS ================= */

.detect-btn,
.video-btn,
.camera-btn,
.clear-btn{

    width:100%;

    padding:15px;

    margin-top:14px;

    border:none;

    border-radius:14px;

    cursor:pointer;

    color:white;

    font-size:16px;

    font-weight:700;

    transition:.30s;

}

.detect-btn{

    background:linear-gradient(90deg,#ff2d55,#ff0000);

    box-shadow:0 0 20px rgba(255,0,0,.45);

}

.video-btn{

    background:linear-gradient(90deg,#009dff,#005eff);

    box-shadow:0 0 20px rgba(0,170,255,.35);

}

.camera-btn{

    background:linear-gradient(90deg,#00d084,#00a86b);

    box-shadow:0 0 20px rgba(0,255,120,.35);

}

.clear-btn{

    background:linear-gradient(90deg,#555,#222);

}

.detect-btn:hover,
.video-btn:hover,
.camera-btn:hover,
.clear-btn:hover{

    transform:translateY(-4px);

    filter:brightness(1.08);

}

/* ================= AI STATUS ================= */

.ai-status{

    display:flex;

    flex-direction:column;

    gap:12px;

    margin-top:20px;

}

.ai-item{

    display:flex;

    justify-content:space-between;

    align-items:center;

    padding:12px 15px;

    border-radius:12px;

    background:rgba(255,255,255,.05);

    transition:.30s;

}

.ai-item:hover{

    background:rgba(0,255,255,.08);

}

.ai-item span:first-child{

    color:#d5e6ff;

}

.ai-item span:last-child{

    color:#00ff88;

    font-weight:bold;

}

/* ================= THREAT METER ================= */

.sidebar-meter{

    margin-top:20px;

}

.sidebar-meter h4{

    color:#9fdcff;

    margin-bottom:12px;

}

.small-meter{

    width:100%;

    height:12px;

    background:#1b2536;

    border-radius:30px;

    overflow:hidden;

}

.small-meter-fill{

    height:100%;

    background:linear-gradient(
        90deg,
        #00ff88,
        yellow,
        red
    );

    transition:.60s;

}

/* ================= FOOTER ================= */

.sidebar-footer{

    margin-top:18px;

    text-align:center;

    color:#7fd8ff;

    font-size:13px;

    opacity:.75;

}
/* ==========================================================
   AI DETECTION SCREEN
========================================================== */

.center-panel .card{

    min-height:650px;

}

/* IMAGE AREA */

.scan-box{

    position:relative;

    width:100%;

    height:500px;

    overflow:hidden;

    border-radius:18px;

    background:#000;

    border:2px solid rgba(0,255,255,.30);

    display:flex;

    justify-content:center;

    align-items:center;

    box-shadow:
    0 0 30px rgba(0,255,255,.15);

}

/* IMAGE */

.result-image{

    width:100%;

    height:100%;

    object-fit:cover;

}

/* AI SCANNER */

.scanner{

    position:absolute;

    left:0;

    width:100%;

    height:4px;

    background:linear-gradient(
    90deg,
    transparent,
    cyan,
    white,
    cyan,
    transparent);

    box-shadow:
    0 0 20px cyan,
    0 0 40px cyan;

    animation:scannerMove 2.5s linear infinite;

}

@keyframes scannerMove{

    from{

        top:-5px;

    }

    to{

        top:100%;

    }

}

/* CROSSHAIR */

.crosshair{

    position:absolute;

    top:50%;

    left:50%;

    transform:translate(-50%,-50%);

    width:90px;

    height:90px;

    border:3px solid #00ff88;

    border-radius:50%;

    box-shadow:
    0 0 20px #00ff88;

    animation:targetPulse 1.5s infinite;

}

.crosshair::before{

    content:"";

    position:absolute;

    width:140px;

    height:2px;

    background:#00ff88;

    left:-25px;

    top:50%;

}

.crosshair::after{

    content:"";

    position:absolute;

    width:2px;

    height:140px;

    background:#00ff88;

    top:-25px;

    left:50%;

}

@keyframes targetPulse{

    50%{

        transform:translate(-50%,-50%) scale(1.08);

    }

}

/* HUD */

.hud{

    position:absolute;

    padding:8px 15px;

    border-radius:8px;

    background:rgba(0,0,0,.75);

    border:1px solid cyan;

    color:#00ffff;

    font-size:13px;

    font-weight:bold;

    box-shadow:0 0 15px cyan;

}

.top-left{

    top:15px;

    left:15px;

}

.top-right{

    top:15px;

    right:15px;

}

.bottom-left{

    bottom:15px;

    left:15px;

}

.bottom-right{

    bottom:15px;

    right:15px;

}

/* AI CORNERS */

.corner{

    position:absolute;

    width:40px;

    height:40px;

    border:3px solid cyan;

}

.tl{

    top:10px;

    left:10px;

    border-right:none;

    border-bottom:none;

}

.tr{

    top:10px;

    right:10px;

    border-left:none;

    border-bottom:none;

}

.bl{

    bottom:10px;

    left:10px;

    border-right:none;

    border-top:none;

}

.br{

    bottom:10px;

    right:10px;

    border-left:none;

    border-top:none;

}

/* RESULT BOX */

.threat-box{

    margin-top:25px;

    display:flex;

    flex-direction:column;

    gap:18px;

}

.threat-box h3{

    padding:16px;

    border-radius:12px;

    background:rgba(255,255,255,.05);

    display:flex;

    justify-content:space-between;

    font-size:18px;

}

.threat-box span{

    color:#00ffff;

    font-weight:bold;

}
/* ==========================================================
             RIGHT PANEL
========================================================== */

/* THREAT DETAILS */

.threat-card{

    background:rgba(18,25,40,.90);

    border:1px solid rgba(255,0,0,.35);

    border-radius:18px;

    padding:22px;

    box-shadow:0 0 20px rgba(255,0,0,.15);

}

.threat-card h2{

    color:#ff4d4d;

    margin-bottom:20px;

}

.info-row{

    display:flex;

    justify-content:space-between;

    align-items:center;

    padding:14px 15px;

    margin-bottom:12px;

    border-radius:12px;

    background:rgba(255,255,255,.05);

    transition:.30s;

}

.info-row:hover{

    background:rgba(255,0,0,.10);

}

.info-row span:first-child{

    color:#cfdfff;

}

.info-row span:last-child{

    color:#00ffff;

    font-weight:bold;

}

/* CAMERA */

.camera-preview{

    background:rgba(18,25,40,.90);

    border-radius:18px;

    border:1px solid rgba(0,255,255,.20);

    padding:18px;

}

.camera-preview h2{

    color:#00ffff;

    margin-bottom:16px;

}

.camera-screen{

    width:100%;

    height:220px;

    background:#000;

    border-radius:14px;

    overflow:hidden;

    border:2px solid rgba(0,255,255,.20);

    display:flex;

    justify-content:center;

    align-items:center;

}

.camera-screen video{

    width:100%;

    height:100%;

    object-fit:cover;

}

.camera-placeholder{

    color:#00ffff;

    font-size:18px;

    font-weight:bold;

}

/* HISTORY */

.history-card{

    background:rgba(18,25,40,.90);

    border-radius:18px;

    border:1px solid rgba(0,255,255,.20);

    padding:18px;

    max-height:320px;

    overflow-y:auto;

}

.history-card h2{

    color:#00ffff;

    margin-bottom:18px;

}

.history-row{

    padding:12px;

    margin-bottom:12px;

    border-radius:12px;

    background:rgba(255,255,255,.05);

    display:flex;

    flex-direction:column;

    gap:5px;

    transition:.30s;

}

.history-row:hover{

    background:rgba(0,255,255,.08);

}

.history-row span{

    font-size:14px;

    color:#dfefff;

}
/* ==========================================================
              SYSTEM MONITOR & FOOTER
========================================================== */

.system-monitor{

    margin-top:25px;

    padding:25px;

    border-radius:20px;

    background:rgba(15,20,35,.90);

    border:1px solid rgba(0,255,255,.20);

    box-shadow:0 0 25px rgba(0,255,255,.12);

}

.system-monitor h2{

    color:#00ffff;

    margin-bottom:22px;

}

.monitor-grid{

    display:grid;

    grid-template-columns:repeat(4,1fr);

    gap:20px;

}

.monitor-card{

    padding:18px;

    border-radius:16px;

    background:rgba(255,255,255,.04);

    text-align:center;

    transition:.35s;

}

.monitor-card:hover{

    transform:translateY(-5px);

    box-shadow:0 0 20px cyan;

}

.monitor-card h3{

    color:#8fdcff;

    margin-bottom:10px;

}

.monitor-card h1{

    color:white;

    font-size:34px;

    margin-bottom:12px;

}

.progress{

    width:100%;

    height:10px;

    background:#111827;

    border-radius:20px;

    overflow:hidden;

}

.progress-fill{

    height:100%;

    border-radius:20px;

    background:linear-gradient(90deg,#00ffff,#00ff88);

}

/* FOOTER */

.footer{

    margin-top:35px;

    display:flex;

    justify-content:space-between;

    align-items:center;

    padding:18px 25px;

    border-radius:18px;

    background:rgba(15,20,35,.90);

    border:1px solid rgba(0,255,255,.20);

}

.footer-left{

    color:#00ffff;

    font-weight:bold;

}

.footer-center{

    color:#c9dfff;

}

.footer-right{

    color:#00ff88;

    font-weight:bold;

}

/* RESPONSIVE */

@media(max-width:1100px){

.monitor-grid{

grid-template-columns:repeat(2,1fr);

}

}

@media(max-width:700px){

.monitor-grid{

grid-template-columns:1fr;

}

.footer{

flex-direction:column;

gap:10px;

text-align:center;

}

}
/* ===========================
   RED SCREEN FLASH
=========================== */

.screen-flash{

    position:fixed;

    top:0;

    left:0;

    width:100%;

    height:100%;

    background:red;

    opacity:.18;

    pointer-events:none;

    z-index:99999;

    animation:redFlash .35s infinite;

}

@keyframes redFlash{

    0%{
        opacity:.08;
    }

    50%{
        opacity:.35;
    }

    100%{
        opacity:.08;
    }

}
/* ================= DASHBOARD LAYOUT ================= */

.dashboard{
  display:grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap:20px;
  margin-top:25px;
}
.dashboard-card {
    background: rgba(20, 25, 35, 0.65);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(0,255,255,0.2);
    border-radius: 18px;
    box-shadow:
        0 0 20px rgba(0,255,255,0.15),
        inset 0 0 15px rgba(255,255,255,0.03);
    transition: .4s;
}
.dashboard-card:hover{
    transform: translateY(-6px);
    box-shadow:
        0 0 35px rgba(0,255,255,.4);
}
.dashboard-card{

position:relative;

overflow:hidden;

}

.dashboard-card::before{

content:"";

position:absolute;

top:0;

left:-100%;

width:100%;

height:2px;

background:linear-gradient(
90deg,
transparent,
cyan,
transparent);

animation:borderMove 4s linear infinite;

}

@keyframes borderMove{

100%{

left:100%;

}

}

.left-panel,
.center-panel,
.right-panel{
  display:flex;
  flex-direction:column;
  gap:20px;
}



/* ================= CARD DESIGN ================= */

.card{

  background:rgba(20,25,35,0.9);

  border:1px solid rgba(0,255,255,0.2);

  border-radius:18px;

  padding:20px;

  box-shadow:
  0 0 20px rgba(0,255,255,0.08);

  backdrop-filter:blur(10px);

}


.card h2{

  font-size:20px;

  margin-bottom:15px;

  color:#00ffff;

}



/* ================= IMAGE SCAN BOX ================= */

.scan-box{

  position:relative;

  overflow:hidden;

  border-radius:15px;

}


.result-image{

  width:100%;

  border-radius:15px;

  display:block;

}



/* Scanner Animation */

.scanner{

  position:absolute;

  top:0;

  left:0;

  width:100%;

  height:3px;

  background:#00ffff;

  box-shadow:0 0 20px #00ffff;

  animation:scan 3s linear infinite;

}



@keyframes scan{

  0%{
    top:0%;
  }

  100%{
    top:100%;
  }

}



/* ================= HUD STYLE ================= */


.hud{

  position:absolute;

  padding:5px 10px;

  background:rgba(0,0,0,0.6);

  color:#00ffff;

  font-size:12px;

  border-radius:5px;

}


.top-left{
  top:10px;
  left:10px;
}


.top-right{
  top:10px;
  right:10px;
}


.bottom-left{
  bottom:10px;
  left:10px;
}


.bottom-right{
  bottom:10px;
  right:10px;
}



/* ================= BUTTONS ================= */


.detect-btn{

  margin-top:15px;

  padding:12px;

  border:none;

  border-radius:10px;

  background:#00ffff;

  color:black;

  font-weight:bold;

  cursor:pointer;

}


.clear-btn{

  margin-top:10px;

  padding:12px;

  border:none;

  border-radius:10px;

  background:#ff4444;

  color:white;

  cursor:pointer;

}



/* ================= AI ANALYSIS ================= */


.analysis-box p{

  padding:10px;

  border-bottom:1px solid rgba(255,255,255,0.1);

}



/* ================= THREAT STATUS ================= */


.threat-box{

  border:1px solid red;

  padding:15px;

  border-radius:12px;

}


.status-danger{

  margin-top:10px;

  background:red;

  padding:8px;

  text-align:center;

  border-radius:8px;

}



.safe-box{

  border:1px solid #00ff88;

  padding:15px;

  border-radius:12px;

}


.status-safe{

  margin-top:10px;

  background:#00aa66;

  padding:8px;

  text-align:center;

  border-radius:8px;

}



/* ================= LOADER ================= */


.loader{

  text-align:center;

  padding:40px;

}


.scan{

  width:60px;

  height:60px;

  border-radius:50%;

  border:4px solid #00ffff;

  margin:auto;

  animation:rotate 1s linear infinite;

}



@keyframes rotate{

  from{
    transform:rotate(0deg);
  }

  to{
    transform:rotate(360deg);
  }

}



/* ================= RESPONSIVE ================= */


@media(max-width:1000px){

.dashboard{

grid-template-columns:1fr;

}

}
/* ================= TOPBAR PREMIUM ================= */

.topbar{

  display:flex;

  justify-content:space-between;

  align-items:center;

  padding:18px 25px;

  background:rgba(10,15,25,0.95);

  border-radius:18px;

  border:1px solid rgba(0,255,255,0.25);

  box-shadow:
  0 0 25px rgba(0,255,255,0.15);

}


.topbar h1{

  color:#00ffff;

  letter-spacing:2px;

}



/* ================= STATS GRID ================= */


.stats{

  display:grid;

  grid-template-columns:repeat(4,1fr);

  gap:20px;

  margin:25px 0;

}



.stat-card{

  background:rgba(20,25,35,0.9);

  padding:20px;

  border-radius:18px;

  text-align:center;

  border:1px solid rgba(255,255,255,0.1);

  transition:0.3s;

}


.stat-card:hover{

  transform:translateY(-8px);

  box-shadow:
  0 0 25px rgba(0,255,255,0.25);

}



.stat-card h3{

  color:#aaa;

  font-size:15px;

}



.stat-card h1{

  color:white;

  font-size:35px;

  margin:10px 0;

}



.stat-card small{

  color:#00ffff;

}



/* ================= CARD PULSE EFFECT ================= */


.pulse-blue{

  animation:pulseBlue 2s infinite;

}


.pulse-red{

  animation:pulseRed 2s infinite;

}


.pulse-green{

  animation:pulseGreen 2s infinite;

}


.pulse-orange{

  animation:pulseOrange 2s infinite;

}



@keyframes pulseBlue{

50%{
box-shadow:0 0 25px #00ffff;
}

}



@keyframes pulseRed{

50%{
box-shadow:0 0 25px red;
}

}



@keyframes pulseGreen{

50%{
box-shadow:0 0 25px #00ff88;
}

}



@keyframes pulseOrange{

50%{
box-shadow:0 0 25px orange;
}

}



/* ================= ONLINE TEXT ================= */


.online-text{

color:#00ff88 !important;

animation:blink 1.5s infinite;

}



@keyframes blink{

50%{

opacity:0.5;

}

}



/* ================= MOBILE ================= */


@media(max-width:900px){

.stats{

grid-template-columns:1fr 1fr;

}

}


@media(max-width:600px){

.stats{

grid-template-columns:1fr;

}

}
/* ================= GLOBAL AI THEME ================= */


body{

  margin:0;

  background:
  radial-gradient(circle at top,#162238,#050810 60%);

  color:white;

  font-family:
  "Segoe UI",
  sans-serif;

}



/* Main Container */

.app{

  min-height:100vh;

  padding:25px;

}



/* ================= INPUT STYLE ================= */


input[type="file"]{

  width:100%;

  padding:12px;

  background:#0b1220;

  color:white;

  border-radius:10px;

  border:1px solid rgba(0,255,255,0.3);

}



/* ================= GLOW EFFECT ================= */


.card,
.stat-card,
.topbar{

  animation:fadeIn 0.8s ease;

}



@keyframes fadeIn{

from{

opacity:0;

transform:translateY(20px);

}


to{

opacity:1;

transform:translateY(0);

}

}



/* ================= CROSSHAIR ================= */


.crosshair{

position:absolute;

top:50%;

left:50%;

width:40px;

height:40px;

transform:translate(-50%,-50%);

border:2px solid #00ffff;

border-radius:50%;

}



.crosshair:before{

content:"";

position:absolute;

top:50%;

left:-15px;

width:70px;

height:1px;

background:#00ffff;

}



.crosshair:after{

content:"";

position:absolute;

left:50%;

top:-15px;

height:70px;

width:1px;

background:#00ffff;

}



/* ================= CORNER HUD ================= */


.corner{

position:absolute;

width:20px;

height:20px;

border-color:#00ffff;

}



.tl{

top:5px;

left:5px;

border-left:3px solid;

border-top:3px solid;

}



.tr{

top:5px;

right:5px;

border-right:3px solid;

border-top:3px solid;

}



.bl{

bottom:5px;

left:5px;

border-left:3px solid;

border-bottom:3px solid;

}



.br{

bottom:5px;

right:5px;

border-right:3px solid;

border-bottom:3px solid;

}



/* ================= SCROLLBAR ================= */


::-webkit-scrollbar{

width:8px;

}


::-webkit-scrollbar-thumb{

background:#00ffff;

border-radius:10px;

}



/* ================= SMOOTH EFFECT ================= */


button{

transition:0.3s;

}


button:hover{

transform:scale(1.05);

}



/* ================= RESPONSIVE IMAGE ================= */


img{

max-height:450px;

object-fit:contain;

}
card{

  min-height:180px;

}
.left-panel .card{

  min-height:230px;

  justify-content:center;

}
.detect-btn,
.clear-btn{

  height:55px;

  font-size:17px;

  margin-top:15px;

}
input[type="file"]{

  height:45px;

  font-size:15px;

}
.dashboard{

  min-height:650px;

}
.detect-panel{

margin-top:25px;

padding:25px;

background:#131c28;

border:1px solid #00e5ff;

border-radius:18px;

box-shadow:0 0 25px rgba(0,255,255,.15);

}

.detect-panel h2{

text-align:center;

color:#00f2ff;

margin-bottom:20px;

letter-spacing:2px;

}

.detect-controls{

display:flex;

justify-content:space-between;

align-items:center;

gap:15px;

flex-wrap:wrap;

}

.upload-btn,
.detect-btn,
.clear-btn,
.ready-status{

padding:14px 28px;

border-radius:12px;

font-weight:600;

font-size:16px;

}
.section-title{

    font-size:22px;

    font-weight:700;

    color:#00F5FF;

    text-transform:uppercase;

    letter-spacing:2px;

    text-shadow:0 0 10px cyan;

    margin-bottom:20px;

}
.status{

padding:6px 18px;

border-radius:30px;

font-weight:bold;

}

.active{
    background:#00ff95;
    color:#071018;
    box-shadow:0 0 12px rgba(0,255,149,.4);
}

.online{

background:#00d9ff;

color:black;

}

.safe{

background:#00ff95;

color:black;

}

.danger{

background:#ff3030;

color:white;

animation:blink .8s infinite;

}
.status-row{

display:flex;

justify-content:space-between;

align-items:center;

padding:18px;

margin:12px 0;

background:#232833;

border-radius:12px;

transition:.3s;

}

.status-row:hover{

background:#2c3444;

transform:scale(1.02);

}
body{

background:#071018;

background-image:

linear-gradient(rgba(0,255,255,.05) 1px,transparent 1px),

linear-gradient(90deg,rgba(0,255,255,.05) 1px,transparent 1px);

background-size:40px 40px;

}
.glow{

color:#00ffff;

text-shadow:

0 0 5px cyan,

0 0 15px cyan,

0 0 30px cyan;

}
.safe{

color:#00ff95;

font-weight:bold;

text-shadow:0 0 10px #00ff95;

}
.danger{

color:red;

font-weight:bold;

animation:blink .7s infinite;

}

@keyframes blink{

50%{

opacity:.3;

}

}
.live-dot{

width:12px;

height:12px;

background:#00ff95;

border-radius:50%;

animation:pulse 1.3s infinite;

}

@keyframes pulse{

0%{

box-shadow:0 0 0 0 rgba(0,255,149,.8);

}

100%{

box-shadow:0 0 0 18px transparent;

}

}
.analysis-grid{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
    gap:20px;
    margin-top:20px;
}

.analysis-card{
    height: 180px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
}
.analysis-card:hover{
    transform:translateY(-8px) scale(1.02);
    border-color:#00ffff;
}

.card-icon{
    font-size:42px;
    margin-bottom:15px;
}
.card-title{
    font-size:18px;
    color:#bfc8d8;
    margin-bottom:12px;
}

.card-value{
    margin-top:15px;
    font-size:34px;
    font-weight:700;
}

.safe{
    color:#00ff95;
    text-shadow:0 0 10px #00ff95;
}

.active{
    color:#00ffff;
    text-shadow:0 0 10px cyan;
}

.danger{
    color:#ff4040;
    animation:blink .8s infinite;
}

@keyframes blink{
    50%{
        opacity:.4;
    }
}
.status-pill{
    padding:8px 20px;
    border-radius:30px;
    font-weight:bold;
    font-size:15px;
}