import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px"
    },
    contentWrapper: {
      maxWidth: "1400px",
      width: "100%"
    },
    header: {
      textAlign: "center",
      marginBottom: "60px",
      color: "white"
    },
    mainTitle: {
      fontSize: "56px",
      fontWeight: "700",
      margin: "0 0 20px 0",
      letterSpacing: "1px",
      textShadow: "0 4px 6px rgba(0,0,0,0.3)"
    },
    subtitle: {
      fontSize: "24px",
      fontWeight: "400",
      opacity: 0.95,
      margin: 0,
      textShadow: "0 2px 4px rgba(0,0,0,0.2)"
    },
    cardsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
      gap: "40px",
      marginTop: "50px"
    },
    card: {
      background: "white",
      borderRadius: "20px",
      padding: "50px 40px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      transition: "all 0.3s ease",
      cursor: "pointer",
      textAlign: "center",
      position: "relative",
      overflow: "hidden"
    },
    cardIcon: {
      fontSize: "80px",
      marginBottom: "25px",
      display: "block"
    },
    cardTitle: {
      fontSize: "32px",
      fontWeight: "600",
      color: "#374151",
      marginBottom: "20px"
    },
    cardDescription: {
      fontSize: "16px",
      color: "#6b7280",
      lineHeight: "1.8",
      marginBottom: "30px",
      minHeight: "120px"
    },
    cardButton: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      border: "none",
      padding: "16px 40px",
      borderRadius: "12px",
      fontSize: "18px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 6px rgba(102, 126, 234, 0.4)",
      width: "100%"
    },
    lowLightCard: {
      background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)"
    },
    featuresList: {
      listStyle: "none",
      padding: 0,
      margin: "25px 0",
      textAlign: "left"
    },
    featureItem: {
      fontSize: "15px",
      color: "#4b5563",
      padding: "8px 0",
      paddingLeft: "30px",
      position: "relative"
    },
    featureIcon: {
      position: "absolute",
      left: "0",
      top: "8px"
    },
    badge: {
      position: "absolute",
      top: "20px",
      right: "20px",
      background: "#10b981",
      color: "white",
      padding: "6px 14px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600"
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        {/* Header Section */}
        <div style={styles.header}>
          <h1 style={styles.mainTitle}>🎨 Welcome to Image Enhancement Suite</h1>
          <p style={styles.subtitle}>
            Professional AI-Powered Image Processing Solutions
          </p>
        </div>

        {/* Cards Container */}
        <div style={styles.cardsContainer}>
          {/* Low-Light Enhancement Card */}
          <div
            style={styles.card}
            onClick={() => navigate("/lowlight")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow = "0 30px 80px rgba(79, 70, 229, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.3)";
            }}
          >
            <div style={styles.badge}>AI Powered</div>
            <span style={styles.cardIcon}>🌙</span>
            <h2 style={styles.cardTitle}>Low-Light Image Enhancement</h2>
            <p style={styles.cardDescription}>
              Transform dark, underexposed images into bright, clear visuals using advanced 
              adaptive gamma correction and atmospheric light estimation algorithms.
            </p>

            <ul style={styles.featuresList}>
              <li style={styles.featureItem}>
                <span style={styles.featureIcon}>✨</span>
                Adaptive gamma correction
              </li>
              <li style={styles.featureItem}>
                <span style={styles.featureIcon}>🎯</span>
                Noise reduction & denoising
              </li>
              <li style={styles.featureItem}>
                <span style={styles.featureIcon}>🔍</span>
                Detail preservation
              </li>
              <li style={styles.featureItem}>
                <span style={styles.featureIcon}>⚡</span>
                Fast processing pipeline
              </li>
            </ul>

            <button
              style={{
                ...styles.cardButton,
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow = "0 6px 20px rgba(79, 70, 229, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 4px 6px rgba(79, 70, 229, 0.4)";
              }}
            >
              Start Enhancement →
            </button>
          </div>

          {/* ZeDuSR Card */}
          <div
            style={styles.card}
            onClick={() => navigate("/zedusr")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow = "0 30px 80px rgba(102, 126, 234, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.3)";
            }}
          >
            <div style={styles.badge}>Advanced</div>
            <span style={styles.cardIcon}>🎯</span>
            <h2 style={styles.cardTitle}>Zero-Shot Dual Lens Super Resolution</h2>
            <p style={styles.cardDescription}>
              Achieve remarkable image quality by combining wide-angle and telephoto views 
              using cutting-edge zero-shot learning and dual-lens fusion technology.
            </p>

            <ul style={styles.featuresList}>
              <li style={styles.featureItem}>
                <span style={styles.featureIcon}>📸</span>
                Dual-lens image fusion
              </li>
              <li style={styles.featureItem}>
                <span style={styles.featureIcon}>🎨</span>
                Super-resolution enhancement
              </li>
              <li style={styles.featureItem}>
                <span style={styles.featureIcon}>🔄</span>
                Deep learning alignment
              </li>
              <li style={styles.featureItem}>
                <span style={styles.featureIcon}>🏆</span>
                Professional quality output
              </li>
            </ul>

            <button
              style={styles.cardButton}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 4px 6px rgba(102, 126, 234, 0.4)";
              }}
            >
              Start Processing →
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div style={{
          textAlign: "center",
          marginTop: "60px",
          color: "white",
          opacity: 0.9
        }}>
          <p style={{ fontSize: "16px", margin: 0 }}>
            Select your enhancement method to get started
          </p>
        </div>
      </div>
    </div>
  );
}