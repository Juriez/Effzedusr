import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LowLightProcessPage() {
  const [imageName, setImageName] = useState("");
  const [gammaMax, setGammaMax] = useState(6.0);
  const [status, setStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processComplete, setProcessComplete] = useState(false);
  const navigate = useNavigate();

  const runEnhancement = async () => {
    if (!imageName) {
      setStatus("Please enter image name for processing");
      return;
    }

    try {
      setIsProcessing(true);
      setStatus("Enhancing low-light image... ⏳");

      const res = await axios.post(
        "http://localhost:3000/runLowLightEnhancement",
        { 
          ImageName: imageName,
          GammaMax: gammaMax
        }
      );

      if (res.data.status === "success") {
        setStatus("Enhancement completed successfully ✅");
        setProcessComplete(true);
        localStorage.setItem("lowLightImageName", imageName);
      } else {
        setStatus("Enhancement failed ❌");
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        setStatus(`Enhancement failed ❌ [${err.response.status}]`);
      } else if (err.request) {
        setStatus("Enhancement failed ❌ [Network/CORS issue]");
      } else {
        setStatus(`Enhancement failed ❌ [${err.message}]`);
      }
    } finally {
      setIsProcessing(false);
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
      maxWidth: "800px",
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
    processCard: {
      background: "#fef3c7",
      padding: "35px",
      borderRadius: "15px",
      border: "3px solid #fbbf24",
      marginBottom: "30px"
    },
    label: {
      display: "block",
      fontSize: "18px",
      fontWeight: "600",
      color: "#374151",
      marginBottom: "18px"
    },
    inputGroup: {
      marginBottom: "25px"
    },
    textInput: {
      width: "100%",
      padding: "16px",
      fontSize: "15px",
      border: "2px solid #fbbf24",
      borderRadius: "10px",
      background: "white",
      marginBottom: "10px"
    },
    rangeContainer: {
      marginTop: "10px"
    },
    rangeInput: {
      width: "100%",
      height: "8px",
      borderRadius: "5px",
      background: "#e5e7eb",
      outline: "none"
    },
    rangeValue: {
      display: "block",
      textAlign: "center",
      marginTop: "10px",
      fontSize: "16px",
      fontWeight: "600",
      color: "#4f46e5"
    },
    button: {
      width: "100%",
      background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
      color: "white",
      border: "none",
      padding: "16px 32px",
      borderRadius: "10px",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "transform 0.2s ease",
      boxShadow: "0 4px 6px rgba(79, 70, 229, 0.4)"
    },
    statusBar: {
      padding: "22px",
      textAlign: "center",
      fontSize: "15px",
      fontWeight: "600",
      background: "#f3f4f6",
      color: "#374151",
      borderRadius: "10px",
      marginBottom: "25px"
    },
    progressBar: {
      width: "100%",
      height: "8px",
      background: "#e5e7eb",
      borderRadius: "4px",
      overflow: "hidden",
      marginTop: "12px"
    },
    progressFill: {
      height: "100%",
      background: "linear-gradient(90deg, #4f46e5, #7c3aed)",
      animation: "progress 2s ease-in-out infinite"
    },
    viewResultsButton: {
      width: "100%",
      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      color: "white",
      border: "none",
      padding: "18px",
      borderRadius: "10px",
      fontSize: "17px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 6px rgba(16, 185, 129, 0.4)"
    },
    infoBox: {
      background: "#eff6ff",
      border: "2px solid #bfdbfe",
      padding: "25px",
      borderRadius: "10px",
      color: "#1e40af",
      fontSize: "15px",
      lineHeight: "1.7"
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes progress {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(400%); }
          }
        `}
      </style>
      
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>✨ Enhance Low-Light Image</h1>
          <p style={styles.subtitle}>Configure settings and start the enhancement process</p>
        </div>

        <div style={styles.content}>
          {status && (
            <div style={styles.statusBar}>
              {status}
              {isProcessing && (
                <div style={styles.progressBar}>
                  <div style={styles.progressFill}></div>
                </div>
              )}
            </div>
          )}

          <div style={styles.processCard}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>🏷️ Image Name</label>
              <input
                type="text"
                style={styles.textInput}
                value={imageName}
                onChange={(e) => setImageName(e.target.value)}
                placeholder="e.g., dark_image.jpg"
                disabled={isProcessing}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>⚙️ Gamma Max Value (1.0 - 10.0)</label>
              <div style={styles.rangeContainer}>
                <input
                  type="range"
                  style={styles.rangeInput}
                  min="1.0"
                  max="10.0"
                  step="0.5"
                  value={gammaMax}
                  onChange={(e) => setGammaMax(parseFloat(e.target.value))}
                  disabled={isProcessing}
                />
                <span style={styles.rangeValue}>Gamma Max: {gammaMax}</span>
              </div>
            </div>

            <button
              style={{
                ...styles.button,
                opacity: isProcessing ? 0.6 : 1,
                cursor: isProcessing ? "not-allowed" : "pointer"
              }}
              onClick={runEnhancement}
              disabled={isProcessing}
              onMouseEnter={(e) => {
                if (!isProcessing) {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 6px 12px rgba(79, 70, 229, 0.5)";
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 6px rgba(79, 70, 229, 0.4)";
              }}
            >
              {isProcessing ? "Processing..." : "Start Enhancement"}
            </button>
          </div>

          {processComplete && (
            <button
              style={styles.viewResultsButton}
              onClick={() => navigate("/lowlight/results")}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 12px rgba(16, 185, 129, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 6px rgba(16, 185, 129, 0.4)";
              }}
            >
              View Results →
            </button>
          )}

          {!processComplete && (
            <div style={styles.infoBox}>
              <strong>💡 Enhancement Process:</strong>
              <ul style={{ margin: "12px 0 0 0", paddingLeft: "22px" }}>
                <li>Adaptive gamma correction based on pixel intensity</li>
                <li>Noise reduction using Gaussian blur</li>
                <li>Atmospheric light estimation</li>
                <li>Transmission map computation</li>
                <li>Image recovery and contrast adjustment</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}