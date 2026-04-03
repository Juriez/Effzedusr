import React, { useState, useEffect } from "react";

export default function ResultsPage() {
    const [imageName, setImageName] = useState("");
    const [downloading, setDownloading] = useState(false);

    useEffect(() => {
        const storedName = localStorage.getItem("processedImageName");
        if (storedName) {
            setImageName(storedName);
        }
    }, []);

    const downloadImage = async () => {
        try {
            setDownloading(true);
            const imageUrl = `http://localhost:3000/SR/Results_Real_${imageName.split(".")[0]}/iPhone11_wideSRTele/${imageName.split(".")[0]}/out_200SR.png`;

            const response = await fetch(imageUrl);
            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${imageName.split(".")[0]}_enhanced_SR.png`;
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
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start"
        },
        contentWrapper: {
            width: "100%",
            maxWidth: "1800px"  // Increase this or remove it entirely
        },
        card: {
            background: "white",
            borderRadius: "20px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            overflow: "hidden"
        },
        header: {
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
            marginBottom: "70px"
        },
        sectionTitle: {
            fontSize: "28px",
            fontWeight: "600",
            color: "#374151",
            marginBottom: "35px",
            paddingBottom: "20px",
            borderBottom: "4px solid #667eea"
        },
        grid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
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
            height: "400px",
            objectFit: "cover",
            borderRadius: "12px",
            border: "3px solid #e5e7eb",
            cursor: "pointer",
            transition: "transform 0.2s ease"
        },
        imageDescription: {
            marginTop: "18px",
            fontSize: "15px",
            color: "#6b7280",
            lineHeight: "1.6"
        },
        finalOutputCard: {
            background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
            padding: "45px",
            borderRadius: "15px",
            boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
            border: "4px solid #fbbf24"
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
            alignItems: "center",
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
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
            padding: "18px 40px",
            borderRadius: "12px",
            fontSize: "18px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 6px rgba(102, 126, 234, 0.4)",
            display: "flex",
            alignItems: "center",
            gap: "12px"
        },
        downloadInfo: {
            marginTop: "25px",
            padding: "20px",
            background: "rgba(255, 255, 255, 0.7)",
            borderRadius: "10px",
            fontSize: "15px",
            color: "#92400e",
            textAlign: "center"
        }
    };

    if (!imageName) {
        return (
            <div style={styles.container}>
                <div style={styles.contentWrapper}>
                    <div style={styles.card}>
                        <div style={styles.header}>
                            <h1 style={styles.title}>🖼️ Processing Results</h1>
                            <p style={styles.subtitle}>View all processed outputs</p>
                        </div>
                        <div style={styles.noDataMessage}>
                            <h2 style={{ fontSize: "32px", marginBottom: "18px" }}>No processed images available</h2>
                            <p style={{ fontSize: "18px" }}>Please upload and process images first.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const finalImageUrl = `http://localhost:3000/SR/Results_Real_${imageName.split(".")[0]}/iPhone11_wideSRTele/${imageName.split(".")[0]}/out_5SR.png`;

    return (
        <div style={styles.container}>
            <div style={styles.contentWrapper}>
                <div style={styles.card}>
                    <div style={styles.header}>
                        <h1 style={styles.title}>🖼️ Processing Results</h1>
                        <p style={styles.subtitle}>Image: {imageName}</p>
                    </div>

                    <div style={styles.content}>
                        {/* Input Images Section */}
                        <div style={styles.section}>
                            <h2 style={styles.sectionTitle}>📥 Input Images (Resized)</h2>
                            <div style={styles.grid}>
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
                                        <span>🔭</span> Resized TeleView
                                    </div>
                                    <img
                                        src={`http://localhost:3000/Data/TeleView/${imageName.split(".")[0]}.jpeg`}
                                        alt="Resized TeleView"
                                        style={styles.image}
                                        onClick={(e) => window.open(e.target.src, '_blank')}
                                        onMouseEnter={(e) => e.target.style.transform = "scale(1.02)"}
                                        onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                                        onError={(e) => {
                                            // If .jpeg fails, try .jpg
                                            e.target.src = `http://localhost:3000/Data/TeleView/${imageName.split(".")[0]}.jpg`;
                                        }}
                                    />
                                    <p style={styles.imageDescription}>
                                        Telephoto lens capture resized for processing pipeline
                                    </p>
                                </div>

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
                                        <span>📷</span> Resized WideView
                                    </div>
                                    <img
                                        src={`http://localhost:3000/Data/WideView/${imageName.split(".")[0]}.jpeg`}
                                        alt="Resized WideView"
                                        style={styles.image}
                                        onClick={(e) => window.open(e.target.src, '_blank')}
                                        onMouseEnter={(e) => e.target.style.transform = "scale(1.02)"}
                                        onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                                        onError={(e) => {
                                            // If .jpeg fails, try .jpg
                                            e.target.src = `http://localhost:3000/Data/WideView/${imageName.split(".")[0]}.jpg`;
                                        }}
                                    />
                                    <p style={styles.imageDescription}>
                                        Wide-angle lens capture resized for processing pipeline
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Intermediate Processing Section */}
                        <div style={styles.section}>
                            <h2 style={styles.sectionTitle}>🔄 Intermediate Processing</h2>
                            <div style={styles.grid}>
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
                                        <span>🎯</span> Aligned Image
                                    </div>
                                    <img
                                        src={`http://localhost:3000/Data/DIAlign/iPhone11_wideSRTele/${imageName.split(".")[0]}/out_20_warp.png`}
                                        alt="Aligned Image"
                                        style={styles.image}
                                        onClick={(e) => window.open(e.target.src, '_blank')}
                                        onMouseEnter={(e) => e.target.style.transform = "scale(1.02)"}
                                        onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                                        onError={(e) => {
                                            console.log("Failed to load aligned image from:", e.target.src);
                                            e.target.style.border = "3px solid #ef4444";
                                            e.target.alt = "Image not found - check path";
                                        }}
                                    />
                                    <p style={styles.imageDescription}>
                                        Deep learning alignment between wide and tele views for optimal fusion
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Final Output Section */}
                        <div style={styles.section}>
                            <h2 style={styles.sectionTitle}>
                                ✨ Final Enhanced Output
                                <span style={styles.badge}>BEST QUALITY</span>
                            </h2>
                            <div
                                style={styles.finalOutputCard}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "scale(1.01)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "scale(1)";
                                }}
                            >
                                <div style={{ ...styles.imageLabel, fontSize: "24px", marginBottom: "25px" }}>
                                    <span>🎨</span> Super-Resolution Enhanced Image
                                </div>
                                <img
                                    src={finalImageUrl}
                                    alt="Enhanced Final Output"
                                    style={{ ...styles.image, height: "550px", border: "4px solid #fbbf24" }}
                                    onClick={(e) => window.open(e.target.src, '_blank')}
                                    onMouseEnter={(e) => e.target.style.transform = "scale(1.02)"}
                                    onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                                />
                                <p style={{ ...styles.imageDescription, color: "#92400e", fontWeight: 600, marginTop: "20px", fontSize: "16px" }}>
                                    Final super-resolution output combining both views for maximum detail and quality.
                                </p>

                                {/* Download Section */}
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
                                        {downloading ? "Downloading..." : "Download Enhanced Image"}
                                    </button>

                                    <button
                                        style={styles.viewButton}
                                        onClick={() => window.open(finalImageUrl, '_blank')}
                                        onMouseEnter={(e) => {
                                            e.target.style.transform = "translateY(-3px)";
                                            e.target.style.boxShadow = "0 8px 16px rgba(102, 126, 234, 0.5)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.transform = "translateY(0)";
                                            e.target.style.boxShadow = "0 4px 6px rgba(102, 126, 234, 0.4)";
                                        }}
                                    >
                                        <span style={{ fontSize: "24px" }}>🔍</span>
                                        View Full Size
                                    </button>
                                </div>

                                <div style={styles.downloadInfo}>
                                    📁 File will be saved as: <strong>{imageName.split(".")[0]}_enhanced_SR.png</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}