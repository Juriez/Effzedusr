import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LowLightUploadPage() {
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const navigate = useNavigate();

  const uploadFile = async () => {
    if (!imageFile) {
      setStatus("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      setStatus("Uploading low-light image...");

      const res = await axios.post(
        "http://localhost:3000/upload/LowLight",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setStatus("Low-light image uploaded successfully ✅");
      setUploaded(true);
      setImageFile(null);
      document.getElementById("LowLightInput").value = "";

    } catch (err) {
      console.error(err);
      if (err.response) {
        setStatus(`Upload failed ❌ [${err.response.status}]`);
      } else if (err.request) {
        setStatus("Upload failed ❌ [Network/CORS issue]");
      } else {
        setStatus(`Upload failed ❌ [${err.message}]`);
      }
    }
  };

  const styles = {
    container: {
      minHeight: "calc(100vh - 72px)",
      background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 40px"
    },
    card: {
      width: "100%",
      maxWidth: "700px",
      background: "white",
      borderRadius: "20px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      overflow: "hidden"
    },
    header: {
      background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
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
      background: "white"
    },
    button: {
      background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
      color: "white",
      border: "none",
      padding: "14px 32px",
      borderRadius: "10px",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      boxShadow: "0 4px 6px rgba(79, 70, 229, 0.4)"
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
      background: uploaded 
        ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" 
        : "#d1d5db",
      color: "white",
      border: "none",
      padding: "18px",
      borderRadius: "10px",
      fontSize: "17px",
      fontWeight: "600",
      cursor: uploaded ? "pointer" : "not-allowed",
      transition: "all 0.3s ease",
      boxShadow: uploaded ? "0 4px 6px rgba(16, 185, 129, 0.4)" : "none"
    },
    infoBox: {
      background: "#eff6ff",
      border: "2px solid #bfdbfe",
      padding: "25px",
      borderRadius: "10px",
      color: "#1e40af",
      fontSize: "15px",
      lineHeight: "1.7",
      marginTop: "25px"
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>🌙 Low-Light Image Enhancement</h1>
          <p style={styles.subtitle}>Upload a low-light image for gamma correction enhancement</p>
        </div>

        <div style={styles.content}>
          {status && (
            <div style={styles.statusBar}>
              {status}
            </div>
          )}

          <div style={styles.uploadCard}>
            {uploaded && (
              <div style={styles.successBadge}>✓ Uploaded</div>
            )}
            <label style={styles.label}>🌃 Low-Light Image</label>
            <input
              type="file"
              id="LowLightInput"
              style={styles.fileInput}
              onChange={(e) => setImageFile(e.target.files[0])}
              accept="image/*"
            />
            <button
              style={styles.button}
              onClick={uploadFile}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 12px rgba(79, 70, 229, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 6px rgba(79, 70, 229, 0.4)";
              }}
            >
              Upload Image
            </button>
          </div>

          <button
            style={styles.nextButton}
            onClick={() => navigate("/lowlight/process")}
            disabled={!uploaded}
            onMouseEnter={(e) => {
              if (uploaded) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 12px rgba(16, 185, 129, 0.5)";
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = uploaded ? "0 4px 6px rgba(16, 185, 129, 0.4)" : "none";
            }}
          >
            {uploaded ? "Continue to Enhancement →" : "Upload image to continue"}
          </button>

          <div style={styles.infoBox}>
            <strong>💡 About Low-Light Enhancement:</strong>
            <ul style={{ margin: "12px 0 0 0", paddingLeft: "22px" }}>
              <li>Adaptive gamma correction for dark images</li>
              <li>Preserves image details and colors</li>
              <li>Removes noise and enhances visibility</li>
              <li>Supports JPG, PNG, TIFF, BMP, WEBP formats</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}