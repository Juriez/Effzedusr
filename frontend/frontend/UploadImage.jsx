// import React, { useState } from "react";
// import axios from "axios";

// export default function UploadPanel() {
//   const [wideFile, setWideFile] = useState(null);
//   const [teleFile, setTeleFile] = useState(null);
//   const [status, setStatus] = useState("");
//   const [imageName, setImageName] = useState(""); // for pipeline

//   // Reusable upload function
//   const uploadFile = async (file, endpoint) => {
//     if (!file) {
//       setStatus(`No file selected for ${endpoint}`);
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setStatus(`Uploading ${endpoint}...`);

//       const res = await axios.post(
//         `http://localhost:3000/upload/${endpoint}`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       setStatus(`${endpoint} uploaded successfully ✅`);

//       // reset the input
//       if (endpoint === "WideView") setWideFile(null);
//       if (endpoint === "TeleView") setTeleFile(null);

//       document.getElementById(`${endpoint}Input`).value = "";

//     } catch (err) {
//       console.error(err);
//       if (err.response) {
//         setStatus(`${endpoint} upload failed ❌ [${err.response.status}]`);
//       } else if (err.request) {
//         setStatus(`${endpoint} upload failed ❌ [Network/CORS issue]`);
//       } else {
//         setStatus(`${endpoint} upload failed ❌ [${err.message}]`);
//       }
//     }
//   };

//   // Pipeline trigger function
//   const runPipeline = async () => {
//     if (!imageName) {
//       setStatus("Please enter ImageName for processing");
//       return;
//     }

//     try {
//       setStatus("Pipeline running... ⏳");

//       const res = await axios.post(
//         "http://localhost:3000/runPipeline",
//         { ImageName: imageName }
//       );

//       if (res.data.status === "success") {
//         setStatus("Pipeline completed successfully ✅");
//       } else {
//         setStatus("Pipeline failed ❌");
//       }
//     } catch (err) {
//       console.error(err);
//       if (err.response) {
//         setStatus(`Pipeline failed ❌ [${err.response.status}]`);
//       } else if (err.request) {
//         setStatus("Pipeline failed ❌ [Network/CORS issue]");
//       } else {
//         setStatus(`Pipeline failed ❌ [${err.message}]`);
//       }
//     }
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "500px" }}>
//       <h2>ZeDuSR Upload & Process Panel</h2>

//       {/* WideView */}
//       <div style={{ marginBottom: "20px" }}>
//         <label>Wide View Upload</label><br />
//         <input
//           type="file"
//           id="WideViewInput"
//           onChange={(e) => setWideFile(e.target.files[0])}
//         />
//         <button
//           style={{ marginLeft: "10px" }}
//           onClick={() => uploadFile(wideFile, "WideView")}
//         >
//           Upload WideView
//         </button>
//       </div>

//       {/* TeleView */}
//       <div style={{ marginBottom: "20px" }}>
//         <label>Tele View Upload</label><br />
//         <input
//           type="file"
//           id="TeleViewInput"
//           onChange={(e) => setTeleFile(e.target.files[0])}
//         />
//         <button
//           style={{ marginLeft: "10px" }}
//           onClick={() => uploadFile(teleFile, "TeleView")}
//         >
//           Upload TeleView
//         </button>
//       </div>

//       {/* Pipeline */}
//       <div style={{ marginBottom: "20px" }}>
//         <label>Image Name for Processing:</label><br />
//         <input
//           type="text"
//           value={imageName}
//           onChange={(e) => setImageName(e.target.value)}
//           placeholder="e.g., Car"
//         />
//         <button
//           style={{ marginLeft: "10px" }}
//           onClick={runPipeline}
//         >
//           Process
//         </button>
//       </div>
//       <label> Resized TeleView Image:</label><br /><br />
//       <img
//         src={`http://localhost:3000/Data/TeleView/${imageName.split(".")[0]}.jpeg`}
//         alt="ZeDuSR Logo"
//         style={{ width: "200px", marginBottom: "20px" }}
//       />

//       <label> Resized WideView Image:</label><br /><br />
//       <img
//         src={`http://localhost:3000/Data/WideView/${imageName.split(".")[0]}.jpeg`}
//         alt="ZeDuSR Logo"
//         style={{ width: "200px", marginBottom: "20px" }}
//       />

//       <img
//         src={`http://localhost:3000/Data/WideView/${imageName.split(".")[0]}.jpeg`}
//         alt="ZeDuSR Logo"
//         style={{ width: "200px", marginBottom: "20px" }}
//       />

//       <label> Aligned Image:</label><br /><br />
//        <img
//         src={`http://localhost:3000/Data/DlAlign/iPhone11_wideSRTele/${imageName.split(".")[0]}/out_20_warp.png`}
//         alt="ZeDuSR Logo 2"
//         style={{ width: "200px", marginBottom: "20px" }}
//       />

//       <label> Enhanced Final Output Image:</label><br /><br />      
//       <img
//         src={`http://localhost:3000/SR/Results_Real_${imageName.split(".")[0]}/iPhone11_wideSRTele/${imageName.split(".")[0]}/out_200SR.png`}
//         alt="ZeDuSR Logo 2"
//         style={{ width: "200px", marginBottom: "20px" }}
//       />

//       <p>{status}</p>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import axios from "axios";

// export default function UploadPanel() {
//   const [wideFile, setWideFile] = useState(null);
//   const [teleFile, setTeleFile] = useState(null);
//   const [status, setStatus] = useState("");
//   const [imageName, setImageName] = useState("");

//   const uploadFile = async (file, endpoint) => {
//     if (!file) {
//       setStatus(`No file selected for ${endpoint}`);
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setStatus(`Uploading ${endpoint}...`);

//       const res = await axios.post(
//         `http://localhost:3000/upload/${endpoint}`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       setStatus(`${endpoint} uploaded successfully ✅`);

//       if (endpoint === "WideView") setWideFile(null);
//       if (endpoint === "TeleView") setTeleFile(null);

//       document.getElementById(`${endpoint}Input`).value = "";

//     } catch (err) {
//       console.error(err);
//       if (err.response) {
//         setStatus(`${endpoint} upload failed ❌ [${err.response.status}]`);
//       } else if (err.request) {
//         setStatus(`${endpoint} upload failed ❌ [Network/CORS issue]`);
//       } else {
//         setStatus(`${endpoint} upload failed ❌ [${err.message}]`);
//       }
//     }
//   };

//   const runPipeline = async () => {
//     if (!imageName) {
//       setStatus("Please enter ImageName for processing");
//       return;
//     }

//     try {
//       setStatus("Pipeline running... ⏳");

//       const res = await axios.post(
//         "http://localhost:3000/runPipeline",
//         { ImageName: imageName }
//       );

//       if (res.data.status === "success") {
//         setStatus("Pipeline completed successfully ✅");
//       } else {
//         setStatus("Pipeline failed ❌");
//       }
//     } catch (err) {
//       console.error(err);
//       if (err.response) {
//         setStatus(`Pipeline failed ❌ [${err.response.status}]`);
//       } else if (err.request) {
//         setStatus("Pipeline failed ❌ [Network/CORS issue]");
//       } else {
//         setStatus(`Pipeline failed ❌ [${err.message}]`);
//       }
//     }
//   };

//   const styles = {
//     container: {
//       minHeight: "100vh",
//       background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//       padding: "40px 20px",
//       fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
//     },
//     mainCard: {
//       maxWidth: "1200px",
//       margin: "0 auto",
//       background: "white",
//       borderRadius: "20px",
//       boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
//       overflow: "hidden"
//     },
//     header: {
//       background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//       padding: "30px",
//       textAlign: "center",
//       color: "white"
//     },
//     title: {
//       margin: 0,
//       fontSize: "32px",
//       fontWeight: "600",
//       letterSpacing: "1px"
//     },
//     section: {
//       padding: "30px",
//       borderBottom: "1px solid #e5e7eb"
//     },
//     sectionTitle: {
//       fontSize: "20px",
//       fontWeight: "600",
//       color: "#374151",
//       marginBottom: "20px",
//       display: "flex",
//       alignItems: "center",
//       gap: "10px"
//     },
//     uploadCard: {
//       background: "#f9fafb",
//       padding: "20px",
//       borderRadius: "12px",
//       marginBottom: "15px",
//       border: "2px dashed #d1d5db",
//       transition: "all 0.3s ease"
//     },
//     label: {
//       display: "block",
//       fontSize: "14px",
//       fontWeight: "600",
//       color: "#4b5563",
//       marginBottom: "10px"
//     },
//     fileInput: {
//       display: "block",
//       width: "100%",
//       padding: "10px",
//       fontSize: "14px",
//       border: "1px solid #d1d5db",
//       borderRadius: "8px",
//       marginBottom: "10px",
//       background: "white"
//     },
//     button: {
//       background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//       color: "white",
//       border: "none",
//       padding: "12px 24px",
//       borderRadius: "8px",
//       fontSize: "14px",
//       fontWeight: "600",
//       cursor: "pointer",
//       transition: "transform 0.2s ease, box-shadow 0.2s ease",
//       boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
//     },
//     processSection: {
//       background: "#fef3c7",
//       padding: "25px",
//       borderRadius: "12px",
//       border: "2px solid #fbbf24"
//     },
//     textInput: {
//       width: "calc(100% - 120px)",
//       padding: "12px",
//       fontSize: "14px",
//       border: "1px solid #d1d5db",
//       borderRadius: "8px",
//       marginRight: "10px"
//     },
//     statusBar: {
//       padding: "15px",
//       textAlign: "center",
//       fontSize: "14px",
//       fontWeight: "600",
//       background: "#f3f4f6",
//       color: "#374151",
//       minHeight: "20px"
//     },
//     outputsSection: {
//       padding: "30px",
//       background: "#f9fafb"
//     },
//     outputGrid: {
//       display: "grid",
//       gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
//       gap: "25px",
//       marginTop: "20px"
//     },
//     outputCard: {
//       background: "white",
//       padding: "20px",
//       borderRadius: "12px",
//       boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
//       textAlign: "center"
//     },
//     outputLabel: {
//       fontSize: "14px",
//       fontWeight: "600",
//       color: "#374151",
//       marginBottom: "15px",
//       display: "block"
//     },
//     outputImage: {
//       width: "100%",
//       height: "200px",
//       objectFit: "cover",
//       borderRadius: "8px",
//       border: "2px solid #e5e7eb"
//     },
//     icon: {
//       fontSize: "20px"
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.mainCard}>
//         <div style={styles.header}>
//           <h1 style={styles.title}> ZeDuSR Processing Panel</h1>
//           <p style={{ margin: "10px 0 0 0", opacity: 0.9 }}>Upload, Process & Enhance Your Images</p>
//         </div>

//         <div style={styles.section}>
//           <h2 style={styles.sectionTitle}>
//             <span style={styles.icon}>📤</span>
//             Upload Images
//           </h2>

//           <div style={styles.uploadCard}>
//             <label style={styles.label}>Wide View Image</label>
//             <input
//               type="file"
//               id="WideViewInput"
//               style={styles.fileInput}
//               onChange={(e) => setWideFile(e.target.files[0])}
//             />
//             <button
//               style={styles.button}
//               onClick={() => uploadFile(wideFile, "WideView")}
//               onMouseEnter={(e) => {
//                 e.target.style.transform = "translateY(-2px)";
//                 e.target.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.transform = "translateY(0)";
//                 e.target.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
//               }}
//             >
//               Upload WideView
//             </button>
//           </div>

//           <div style={styles.uploadCard}>
//             <label style={styles.label}>Tele View Image</label>
//             <input
//               type="file"
//               id="TeleViewInput"
//               style={styles.fileInput}
//               onChange={(e) => setTeleFile(e.target.files[0])}
//             />
//             <button
//               style={styles.button}
//               onClick={() => uploadFile(teleFile, "TeleView")}
//               onMouseEnter={(e) => {
//                 e.target.style.transform = "translateY(-2px)";
//                 e.target.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.transform = "translateY(0)";
//                 e.target.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
//               }}
//             >
//               Upload TeleView
//             </button>
//           </div>
//         </div>

//         <div style={styles.section}>
//           <h2 style={styles.sectionTitle}>
//             <span style={styles.icon}>⚙️</span>
//             Process Images
//           </h2>
//           <div style={styles.processSection}>
//             <label style={styles.label}>Image Name for Processing</label>
//             <div style={{ display: "flex", alignItems: "center" }}>
//               <input
//                 type="text"
//                 style={styles.textInput}
//                 value={imageName}
//                 onChange={(e) => setImageName(e.target.value)}
//                 placeholder="e.g., Car"
//               />
//               <button
//                 style={styles.button}
//                 onClick={runPipeline}
//                 onMouseEnter={(e) => {
//                   e.target.style.transform = "translateY(-2px)";
//                   e.target.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.transform = "translateY(0)";
//                   e.target.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
//                 }}
//               >
//                 Process
//               </button>
//             </div>
//           </div>
//         </div>

//         <div style={styles.statusBar}>
//           {status || "Ready to upload and process"}
//         </div>

//         <div style={styles.outputsSection}>
//           <h2 style={styles.sectionTitle}>
//             <span style={styles.icon}>🖼️</span>
//             Processed Outputs
//           </h2>

//           <div style={styles.outputGrid}>
//             <div style={styles.outputCard}>
//               <label style={styles.outputLabel}>Resized TeleView</label>
//               <img
//                 src={`http://localhost:3000/Data/TeleView/${imageName.split(".")[0]}.jpeg`}
//                 alt="Resized TeleView"
//                 style={styles.outputImage}
//               />
//             </div>

//             <div style={styles.outputCard}>
//               <label style={styles.outputLabel}>Resized WideView</label>
//               <img
//                 src={`http://localhost:3000/Data/WideView/${imageName.split(".")[0]}.jpeg`}
//                 alt="Resized WideView"
//                 style={styles.outputImage}
//               />
//             </div>

//             <div style={styles.outputCard}>
//               <label style={styles.outputLabel}>Aligned Image</label>
//               <img
//                 src={`http://localhost:3000/Data/DIAlign/iPhone11_wideSRTele/${imageName.split(".")[0]}/out_20_warp.png`}
//                 alt="Aligned Image"
//                 style={styles.outputImage}
//               />
//             </div>

//             <div style={styles.outputCard}>
//               <label style={styles.outputLabel}>Enhanced Final Output</label>
//               <img
//                 src={`http://localhost:3000/SR/Results_Real_${imageName.split(".")[0]}/iPhone11_wideSRTele/${imageName.split(".")[0]}/out_200SR.png`}
//                 alt="Enhanced Final Output"
//                 style={styles.outputImage}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UploadPage() {
  const [wideFile, setWideFile] = useState(null);
  const [teleFile, setTeleFile] = useState(null);
  const [status, setStatus] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState({ wide: false, tele: false });
  const navigate = useNavigate();

  const uploadFile = async (file, endpoint) => {
    if (!file) {
      setStatus(`No file selected for ${endpoint}`);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setStatus(`Uploading ${endpoint}...`);

      const res = await axios.post(
        `http://localhost:3000/upload/${endpoint}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setStatus(`${endpoint} uploaded successfully ✅`);

      if (endpoint === "WideView") {
        setUploadedFiles(prev => ({ ...prev, wide: true }));
        setWideFile(null);
      }
      if (endpoint === "TeleView") {
        setUploadedFiles(prev => ({ ...prev, tele: true }));
        setTeleFile(null);
      }

      document.getElementById(`${endpoint}Input`).value = "";

    } catch (err) {
      console.error(err);
      if (err.response) {
        setStatus(`${endpoint} upload failed ❌ [${err.response.status}]`);
      } else if (err.request) {
        setStatus(`${endpoint} upload failed ❌ [Network/CORS issue]`);
      } else {
        setStatus(`${endpoint} upload failed ❌ [${err.message}]`);
      }
    }
  };

  const styles = {
    container: {
      minHeight: "calc(100vh - 72px)",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 40px"
    },
    card: {
      width: "100%",
      maxWidth: "900px",
      background: "white",
      borderRadius: "20px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      overflow: "hidden"
    },
    header: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "50px 40px",
      textAlign: "center",
      color: "white"
    },
    title: {
      margin: 0,
      fontSize: "36px",
      fontWeight: "600",
      letterSpacing: "0.5px"
    },
    subtitle: {
      margin: "15px 0 0 0",
      opacity: 0.95,
      fontSize: "17px"
    },
    content: {
      padding: "50px 40px"
    },
    uploadSection: {
      marginBottom: "30px"
    },
    uploadCard: {
      background: "#f9fafb",
      padding: "35px",
      borderRadius: "15px",
      border: "2px dashed #d1d5db",
      marginBottom: "25px",
      position: "relative",
      transition: "all 0.3s ease"
    },
    successBadge: {
      position: "absolute",
      top: "20px",
      right: "20px",
      background: "#10b981",
      color: "white",
      padding: "8px 16px",
      borderRadius: "20px",
      fontSize: "13px",
      fontWeight: "600",
      boxShadow: "0 2px 4px rgba(16, 185, 129, 0.3)"
    },
    label: {
      display: "block",
      fontSize: "18px",
      fontWeight: "600",
      color: "#374151",
      marginBottom: "18px"
    },
    fileInput: {
      display: "block",
      width: "100%",
      padding: "14px",
      fontSize: "15px",
      border: "2px solid #d1d5db",
      borderRadius: "10px",
      marginBottom: "18px",
      background: "white",
      transition: "border-color 0.3s ease"
    },
    button: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      border: "none",
      padding: "14px 32px",
      borderRadius: "10px",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      boxShadow: "0 4px 6px rgba(102, 126, 234, 0.4)"
    },
    statusBar: {
      padding: "20px",
      textAlign: "center",
      fontSize: "15px",
      fontWeight: "600",
      background: "#f3f4f6",
      color: "#374151",
      borderRadius: "10px",
      marginBottom: "25px"
    },
    nextButton: {
      width: "100%",
      background: uploadedFiles.wide && uploadedFiles.tele
        ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
        : "#d1d5db",
      color: "white",
      border: "none",
      padding: "18px",
      borderRadius: "10px",
      fontSize: "17px",
      fontWeight: "600",
      cursor: uploadedFiles.wide && uploadedFiles.tele ? "pointer" : "not-allowed",
      transition: "all 0.3s ease",
      boxShadow: uploadedFiles.wide && uploadedFiles.tele ? "0 4px 6px rgba(16, 185, 129, 0.4)" : "none"
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>📤 Upload Images</h1>
          <p style={styles.subtitle}>Upload both Wide View and Tele View images to begin processing</p>
        </div>

        <div style={styles.content}>
          {status && (
            <div style={styles.statusBar}>
              {status}
            </div>
          )}

          <div style={styles.uploadSection}>
            <div style={styles.uploadCard}>
              {uploadedFiles.wide && (
                <div style={styles.successBadge}>✓ Uploaded</div>
              )}
              <label style={styles.label}>📷 Wide View Image</label>
              <input
                type="file"
                id="WideViewInput"
                style={styles.fileInput}
                onChange={(e) => setWideFile(e.target.files[0])}
              />
              <button
                style={styles.button}
                onClick={() => uploadFile(wideFile, "WideView")}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 6px 12px rgba(102, 126, 234, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 6px rgba(102, 126, 234, 0.4)";
                }}
              >
                Upload WideView
              </button>
            </div>

            <div style={styles.uploadCard}>
              {uploadedFiles.tele && (
                <div style={styles.successBadge}>✓ Uploaded</div>
              )}
              <label style={styles.label}>🔭 Tele View Image</label>
              <input
                type="file"
                id="TeleViewInput"
                style={styles.fileInput}
                onChange={(e) => setTeleFile(e.target.files[0])}
              />
              <button
                style={styles.button}
                onClick={() => uploadFile(teleFile, "TeleView")}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 6px 12px rgba(102, 126, 234, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 6px rgba(102, 126, 234, 0.4)";
                }}
              >
                Upload TeleView
              </button>
            </div>
          </div>

          <button
            style={styles.nextButton}
            onClick={() => navigate("/zedusr/process")}
            disabled={!uploadedFiles.wide || !uploadedFiles.tele}
            onMouseEnter={(e) => {
              if (uploadedFiles.wide && uploadedFiles.tele) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 12px rgba(16, 185, 129, 0.5)";
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = uploadedFiles.wide && uploadedFiles.tele ? "0 4px 6px rgba(16, 185, 129, 0.4)" : "none";
            }}
          >
            {uploadedFiles.wide && uploadedFiles.tele
              ? "Continue to Processing →"
              : "Upload both images to continue"}
          </button>
        </div>
      </div>
    </div>
  );
}