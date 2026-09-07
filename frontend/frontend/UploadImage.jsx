
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