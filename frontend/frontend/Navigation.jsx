// // import React from "react";
// // import { Link, useLocation } from "react-router-dom";

// // export default function Navigation() {
// //     const location = useLocation();

// //     const styles = {
// //         nav: {
// //             background: "rgba(255, 255, 255, 0.98)",
// //             boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
// //             padding: "0",
// //             position: "sticky",
// //             top: 0,
// //             zIndex: 1000,
// //             backdropFilter: "blur(10px)"
// //         },
// //         container: {
// //             width: "100%",
// //             maxWidth: "none",  // Remove max-width limitation
// //             display: "flex",
// //             justifyContent: "space-between",
// //             alignItems: "center",
// //             padding: "20px 60px",
// //             margin: "0 auto"
// //         },
// //     logo: {
// //             fontSize: "26px",
// //             fontWeight: "700",
// //             background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
// //             WebkitBackgroundClip: "text",
// //             WebkitTextFillColor: "transparent",
// //             backgroundClip: "text"
// //         },
// //         menu: {
// //             display: "flex",
// //             gap: "15px",
// //             listStyle: "none",
// //             margin: 0,
// //             padding: 0
// //         },
// //         link: {
// //             textDecoration: "none",
// //             color: "#4b5563",
// //             padding: "12px 25px",
// //             borderRadius: "10px",
// //             fontWeight: "600",
// //             fontSize: "15px",
// //             transition: "all 0.3s ease"
// //         },
// //         activeLink: {
// //             background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
// //             color: "white",
// //             boxShadow: "0 4px 6px rgba(102, 126, 234, 0.4)"
// //         }
// //     };

// //     const isActive = (path) => location.pathname === path;

// //     return (
// //         <nav style={styles.nav}>
// //             <div style={styles.container}>
// //                 <div style={styles.logo}>🎯 ZeDuSR</div>
// //                 <ul style={styles.menu}>
// //                     <li>
// //                         <Link
// //                             to="/"
// //                             style={{
// //                                 ...styles.link,
// //                                 ...(isActive("/") ? styles.activeLink : {})
// //                             }}
// //                         >
// //                             📤 Upload
// //                         </Link>
// //                     </li>
// //                     <li>
// //                         <Link
// //                             to="/process"
// //                             style={{
// //                                 ...styles.link,
// //                                 ...(isActive("/process") ? styles.activeLink : {})
// //                             }}
// //                         >
// //                             ⚙️ Process
// //                         </Link>
// //                     </li>
// //                     <li>
// //                         <Link
// //                             to="/results"
// //                             style={{
// //                                 ...styles.link,
// //                                 ...(isActive("/results") ? styles.activeLink : {})
// //                             }}
// //                         >
// //                             🖼️ Results
// //                         </Link>
// //                     </li>
// //                 </ul>
// //             </div>
// //         </nav>
// //     );
// // }

// import React from "react";
// import { Link, useLocation } from "react-router-dom";

// export default function Navigation() {
//   const location = useLocation();

//   const styles = {
//     nav: {
//       background: "rgba(255, 255, 255, 0.98)",
//       boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//       padding: "0",
//       position: "sticky",
//       top: 0,
//       zIndex: 1000,
//       backdropFilter: "blur(10px)"
//     },
//     container: {
//       width: "100%",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       padding: "20px 60px"
//     },
//     logo: {
//       fontSize: "26px",
//       fontWeight: "700",
//       background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//       WebkitBackgroundClip: "text",
//       WebkitTextFillColor: "transparent",
//       backgroundClip: "text"
//     },
//     menu: {
//       display: "flex",
//       gap: "15px",
//       listStyle: "none",
//       margin: 0,
//       padding: 0
//     },
//     link: {
//       textDecoration: "none",
//       color: "#4b5563",
//       padding: "12px 25px",
//       borderRadius: "10px",
//       fontWeight: "600",
//       fontSize: "15px",
//       transition: "all 0.3s ease"
//     },
//     activeLink: {
//       background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//       color: "white",
//       boxShadow: "0 4px 6px rgba(102, 126, 234, 0.4)"
//     },
//     separator: {
//       width: "2px",
//       height: "30px",
//       background: "#d1d5db",
//       margin: "0 10px"
//     }
//   };

//   const isActive = (path) => location.pathname === path;
//   const isLowLightActive = () => location.pathname.startsWith("/lowlight");

//   return (
//     <nav style={styles.nav}>
//       <div style={styles.container}>
//         <div style={styles.logo}>🎯 ZeDuSR</div>
//         <ul style={styles.menu}>
//           {/* ZeDuSR Section */}
//           <li>
//             <Link 
//               to="/" 
//               style={{
//                 ...styles.link,
//                 ...(isActive("/") ? styles.activeLink : {})
//               }}
//             >
//               📤 Upload
//             </Link>
//           </li>
//           <li>
//             <Link 
//               to="/process" 
//               style={{
//                 ...styles.link,
//                 ...(isActive("/process") ? styles.activeLink : {})
//               }}
//             >
//               ⚙️ Process
//             </Link>
//           </li>
//           <li>
//             <Link 
//               to="/results" 
//               style={{
//                 ...styles.link,
//                 ...(isActive("/results") ? styles.activeLink : {})
//               }}
//             >
//               🖼️ Results
//             </Link>
//           </li>

//           {/* Separator */}
//           <li style={styles.separator}></li>

//           {/* Low Light Enhancement Section */}
//           <li>
//             <Link 
//               to="/lowlight" 
//               style={{
//                 ...styles.link,
//                 ...(isActive("/lowlight") ? styles.activeLink : {})
//               }}
//             >
//               🌙 Low Light
//             </Link>
//           </li>
//           <li>
//             <Link 
//               to="/lowlight/process" 
//               style={{
//                 ...styles.link,
//                 ...(isActive("/lowlight/process") ? styles.activeLink : {})
//               }}
//             >
//               ✨ Enhance
//             </Link>
//           </li>
//           <li>
//             <Link 
//               to="/lowlight/results" 
//               style={{
//                 ...styles.link,
//                 ...(isActive("/lowlight/results") ? styles.activeLink : {})
//               }}
//             >
//               📊 Results
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }


import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
  const location = useLocation();

  const styles = {
    nav: {
      background: "rgba(255, 255, 255, 0.98)",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      padding: "0",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      backdropFilter: "blur(10px)"
    },
    container: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 60px"
    },
    leftSection: {
      display: "flex",
      alignItems: "center",
      gap: "30px"
    },
    logo: {
      fontSize: "26px",
      fontWeight: "700",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      cursor: "pointer"
    },
    menu: {
      display: "flex",
      gap: "15px",
      listStyle: "none",
      margin: 0,
      padding: 0,
      alignItems: "center"
    },
    link: {
      textDecoration: "none",
      color: "#4b5563",
      padding: "12px 25px",
      borderRadius: "10px",
      fontWeight: "600",
      fontSize: "15px",
      transition: "all 0.3s ease"
    },
    activeLink: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      boxShadow: "0 4px 6px rgba(102, 126, 234, 0.4)"
    },
    activeLowLight: {
      background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
      color: "white",
      boxShadow: "0 4px 6px rgba(79, 70, 229, 0.4)"
    },
    separator: {
      width: "2px",
      height: "30px",
      background: "#d1d5db",
      margin: "0"
    },
    homeButton: {
      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      color: "white",
      padding: "12px 25px",
      borderRadius: "10px",
      fontWeight: "600",
      fontSize: "15px",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 6px rgba(16, 185, 129, 0.4)"
    }
  };

  const isActive = (path) => location.pathname === path;
  const isZeDuSRActive = () => location.pathname.startsWith("/zedusr");
  const isLowLightActive = () => location.pathname.startsWith("/lowlight");
  const isHomePage = () => location.pathname === "/";

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.leftSection}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div style={styles.logo}>🎨 Image Enhancement Suite</div>
          </Link>
        </div>

        <ul style={styles.menu}>
          {/* Home Button */}
          {!isHomePage() && (
            <li>
              <Link to="/">
                <button
                  style={styles.homeButton}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 6px 12px rgba(16, 185, 129, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 6px rgba(16, 185, 129, 0.4)";
                  }}
                >
                  🏠 Home
                </button>
              </Link>
            </li>
          )}

          {/* ZeDuSR Section - Only show if in ZeDuSR workflow */}
          {isZeDuSRActive() && (
            <>
              <li style={styles.separator}></li>
              <li>
                <Link 
                  to="/zedusr" 
                  style={{
                    ...styles.link,
                    ...(isActive("/zedusr") ? styles.activeLink : {})
                  }}
                >
                  📤 Upload
                </Link>
              </li>
              <li>
                <Link 
                  to="/zedusr/process" 
                  style={{
                    ...styles.link,
                    ...(isActive("/zedusr/process") ? styles.activeLink : {})
                  }}
                >
                  ⚙️ Process
                </Link>
              </li>
              <li>
                <Link 
                  to="/zedusr/results" 
                  style={{
                    ...styles.link,
                    ...(isActive("/zedusr/results") ? styles.activeLink : {})
                  }}
                >
                  🖼️ Results
                </Link>
              </li>
            </>
          )}

          {/* Low Light Section - Only show if in Low Light workflow */}
          {isLowLightActive() && (
            <>
              <li style={styles.separator}></li>
              <li>
                <Link 
                  to="/lowlight" 
                  style={{
                    ...styles.link,
                    ...(isActive("/lowlight") ? styles.activeLowLight : {})
                  }}
                >
                  🌙 Upload
                </Link>
              </li>
              <li>
                <Link 
                  to="/lowlight/process" 
                  style={{
                    ...styles.link,
                    ...(isActive("/lowlight/process") ? styles.activeLowLight : {})
                  }}
                >
                  ✨ Enhance
                </Link>
              </li>
              <li>
                <Link 
                  to="/lowlight/results" 
                  style={{
                    ...styles.link,
                    ...(isActive("/lowlight/results") ? styles.activeLowLight : {})
                  }}
                >
                  📊 Results
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}