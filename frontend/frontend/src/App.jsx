
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navigation from "../Navigation";
// import UploadPage from "../UploadImage";
// import ProcessPage from "../ProcessPage";
// import ResultsPage from "../ResultsPage";
// import LowLightUploadPage from "../LowLightUploadPage";
// import LowLightProcessPage from "../LowLightProcessPage";
// import LowLightResultsPage from "../LowLightResultsPage";

// export default function App() {
//   return (
//     <Router>
//       <div style={{ minHeight: "100vh", background: "#f3f4f6" }}>
//         <Navigation />
//         <Routes>
//           {/* ZeDuSR Routes */}
//           <Route path="/" element={<UploadPage />} />
//           <Route path="/process" element={<ProcessPage />} />
//           <Route path="/results" element={<ResultsPage />} />
          
//           {/* Low Light Enhancement Routes */}
//           <Route path="/lowlight" element={<LowLightUploadPage />} />
//           <Route path="/lowlight/process" element={<LowLightProcessPage />} />
//           <Route path="/lowlight/results" element={<LowLightResultsPage />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "../Navigation";
import HomePage from "../HomePage";
import UploadPage from "../UploadImage";
import ProcessPage from "../ProcessPage";
import ResultsPage from "../ResultsPage";
import LowLightUploadPage from "../LowLightUploadPage";
import LowLightProcessPage from "../LowLightProcessPage";
import LowLightResultsPage from "../LowLightResultsPage";

export default function App() {
  return (
    <Router>
      <div style={{ minHeight: "100vh", background: "#f3f4f6" }}>
        <Navigation />
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<HomePage />} />
          
          {/* ZeDuSR Routes */}
          <Route path="/zedusr" element={<UploadPage />} />
          <Route path="/zedusr/process" element={<ProcessPage />} />
          <Route path="/zedusr/results" element={<ResultsPage />} />
          
          {/* Low Light Enhancement Routes */}
          <Route path="/lowlight" element={<LowLightUploadPage />} />
          <Route path="/lowlight/process" element={<LowLightProcessPage />} />
          <Route path="/lowlight/results" element={<LowLightResultsPage />} />
        </Routes>
      </div>
    </Router>
  );
}