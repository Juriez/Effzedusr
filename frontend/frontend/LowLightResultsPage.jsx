import React, { useState, useEffect } from "react";

export default function LowLightResultsPage() {
  const [imageName, setImageName] = useState("");
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("lowLightImageName");
    if (storedName) {
      setImageName(storedName);
    }
  }, []);

  const downloadImage = async () => {
    try {
      setDownloading(true);
      const imageUrl = `http://localhost:3000/LowLight/Output/Input_images/${imageName.split(".")[0]}.png`;
      
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${imageName.split(".")[0]}_enhanced.png`;
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      setDownloading(false);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download image. Please try again.");
      setDownloading(false);
    }
  };

  const styles = {
    container: {
      minHeight: "calc(100vh - 72px)",
      background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
      padding: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start"
    },
    contentWrapper: {
      width: "100%",
      maxWidth: "1600px"
    },
    card: {
      background: "white",
      borderRadius: "20px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      overflow: "hidden"
    },
    header: {
      background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
      padding: "50px 60px",
      textAlign: "center",
      color: "white"
    },
    title: {
      margin: 0,
      fontSize: "40px",
      fontWeight: "600",
      letterSpacing: "0.5px"
    },
    subtitle: {
      margin: "15px 0 0 0",
      opacity: 0.95,
      fontSize: "18px"
    },
    content: {
      padding: "60px"
    },
    section: {
      marginBottom: "50px"
    },
    sectionTitle: {
      fontSize: "28px",
      fontWeight: "600",
      color: "#374151",
      marginBottom: "35px",
      paddingBottom: "20px",
      borderBottom: "4px solid #4f46e5"
    },
    comparisonGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "40px"
    },
    imageCard: {
      background: "#f9fafb",
      padding: "35px",
      borderRadius: "15px",
      boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease"
    },
    imageLabel: {
      fontSize: "22px",
      fontWeight: "600",
      color: "#374151",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      gap: "12px"
    },
    image: {
      width: "100%",
      height: "450px",
      objectFit: "contain",
      borderRadius: "12px",
      border: "3px solid #e5e7eb",
      cursor: "pointer",
      transition: "transform 0.2s ease",
      background: "#000"
    },
    imageDescription: {
      marginTop: "18px",
      fontSize: "15px",
      color: "#6b7280",
      lineHeight: "1.6"
    },
    badge: {
      display: "inline-block",
      background: "#10b981",
      color: "white",
      padding: "8px 16px",
      borderRadius: "15px",
      fontSize: "14px",
      fontWeight: "600",
      marginLeft: "15px"
    },
    noDataMessage: {
      textAlign: "center",
      padding: "100px 40px",
      color: "#6b7280"
    },
    downloadSection: {
      marginTop: "30px",
      display: "flex",
      gap: "20px",
      justifyContent: "center",
      flexWrap: "wrap"
    },
    downloadButton: {
      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      color: "white",
      border: "none",
      padding: "18px 40px",
      borderRadius: "12px",
      fontSize: "18px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 6px rgba(16, 185, 129, 0.4)",
      display: "flex",
      alignItems: "center",
      gap: "12px"
    },
    viewButton: {
      background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
      color: "white",
      border: "none",
      padding: "18px 40px",
      borderRadius: "12px",
      fontSize: "18px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 6px rgba(79, 70, 229, 0.4)",
      display: "flex",
      alignItems: "center",
      gap: "12px"
    }
  };

  if (!imageName) {
    return (
      <div style={styles.container}>
        <div style={styles.contentWrapper}>
          <div style={styles.card}>
            <div style={styles.header}>
              <h1 style={styles.title}>📊 Enhancement Results</h1>
              <p style={styles.subtitle}>View before and after comparison</p>
            </div>
            <div style={styles.noDataMessage}>
              <h2 style={{ fontSize: "32px", marginBottom: "18px" }}>No results available</h2>
              <p style={{ fontSize: "18px" }}>Please upload and process an image first.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const originalImageUrl = `http://localhost:3000/LowLight/Input_images/${imageName}`;
  const enhancedImageUrl = `http://localhost:3000/LowLight/results/Output/Input_images/${imageName.split(".")[0]}.png`;

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <div style={styles.card}>
          <div style={styles.header}>
            <h1 style={styles.title}>📊 Enhancement Results</h1>
            <p style={styles.subtitle}>Image: {imageName}</p>
          </div>

          <div style={styles.content}>
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>
                🔍 Before & After Comparison
                <span style={styles.badge}>ENHANCED</span>
              </h2>
              
              <div style={styles.comparisonGrid}>
                {/* Original Image */}
                <div 
                  style={styles.imageCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.1)";
                  }}
                >
                  <div style={styles.imageLabel}>
                    <span>🌑</span> Original (Low-Light)
                  </div>
                  <img
                    src={originalImageUrl}
                    alt="Original Low-Light"
                    style={styles.image}
                    onClick={(e) => window.open(e.target.src, '_blank')}
                    onMouseEnter={(e) => e.target.style.transform = "scale(1.02)"}
                    onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                    onError={(e) => {
                      e.target.src = `http://localhost:3000/LowLight/Input_images/${imageName.split(".")[0]}.jpg`;
                    }}
                  />
                  <p style={styles.imageDescription}>
                    Original image captured in low-light conditions with poor visibility
                  </p>
                </div>

                {/* Enhanced Image */}
                <div 
                  style={{
                    ...styles.imageCard,
                    background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
                    border: "3px solid #fbbf24"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 12px 24px rgba(251, 191, 36, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.1)";
                  }}
                >
                  <div style={{...styles.imageLabel, color: "#92400e"}}>
                    <span>✨</span> Enhanced (Gamma Corrected)
                  </div>
                  <img
                    src={enhancedImageUrl}
                    alt="Enhanced"
                    style={{...styles.image, border: "3px solid #fbbf24"}}
                    onClick={(e) => window.open(e.target.src, '_blank')}
                    onMouseEnter={(e) => e.target.style.transform = "scale(1.02)"}
                    onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                  />
                  <p style={{...styles.imageDescription, color: "#92400e", fontWeight: 600}}>
                    Enhanced image with improved brightness, contrast, and visibility
                  </p>

                  <div style={styles.downloadSection}>
                    <button
                      style={{
                        ...styles.downloadButton,
                        opacity: downloading ? 0.6 : 1,
                        cursor: downloading ? "not-allowed" : "pointer"
                      }}
                      onClick={downloadImage}
                      disabled={downloading}
                      onMouseEnter={(e) => {
                        if (!downloading) {
                          e.target.style.transform = "translateY(-3px)";
                          e.target.style.boxShadow = "0 8px 16px rgba(16, 185, 129, 0.5)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "0 4px 6px rgba(16, 185, 129, 0.4)";
                      }}
                    >
                      <span style={{ fontSize: "24px" }}>⬇️</span>
                      {downloading ? "Downloading..." : "Download Enhanced"}
                    </button>

                    <button
                      style={styles.viewButton}
                      onClick={() => window.open(enhancedImageUrl, '_blank')}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "translateY(-3px)";
                        e.target.style.boxShadow = "0 8px 16px rgba(79, 70, 229, 0.5)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "0 4px 6px rgba(79, 70, 229, 0.4)";
                      }}
                    >
                      <span style={{ fontSize: "24px" }}>🔍</span>
                      View Full Size
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}