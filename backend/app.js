
const { spawn } = require("child_process");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = 3000;
const { exec } = require("child_process");

app.use(cors()); 
app.use(express.json());


/* -------------------- HELLO WORLD API -------------------- */
app.get("/hello", (req, res) => {
  res.json({ message: "Hello World 👋" });
});

/* -------------------- FILE UPLOAD CONFIG -------------------- */
const storage = multer.diskStorage({
  destination: "files/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    const timestamp = Date.now();

    cb(null, `${base}${ext}`);
  }
});

const upload = multer({ storage });

/* -------------------- FILE UPLOAD API -------------------- */
app.post("/upload/WideView", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const sourcePath = req.file.path;
  const targetDir = path.join(__dirname, "..", "RealworldData", "Data","HighRes", "WideView");
  const targetPath = path.join(targetDir, req.file.filename);

  // ensure destination directory exists
  fs.mkdirSync(targetDir, { recursive: true });

  // copy file using streams
  const readStream = fs.createReadStream(sourcePath);
  const writeStream = fs.createWriteStream(targetPath);

  readStream.pipe(writeStream);

  writeStream.on("finish", () => {
    res.json({
      message: "File uploaded and copied successfully",
      storedFileName: req.file.filename
    });
  });

  writeStream.on("error", (err) => {
    console.error(err);
    res.status(500).json({ error: "File copy failed" });
  });
});


app.post("/upload/TeleView", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const sourcePath = req.file.path;
  const targetDir = path.join(__dirname, "..", "RealworldData", "Data","HighRes", "TeleView");
  const targetPath = path.join(targetDir, req.file.filename);

  // ensure destination directory exists
  fs.mkdirSync(targetDir, { recursive: true });

  // copy file using streams
  const readStream = fs.createReadStream(sourcePath);
  const writeStream = fs.createWriteStream(targetPath);

  readStream.pipe(writeStream);

  writeStream.on("finish", () => {
    res.json({
      message: "File uploaded and copied successfully",
      storedFileName: req.file.filename
    });
  });

  writeStream.on("error", (err) => {
    console.error(err);
    res.status(500).json({ error: "File copy failed" });
  });
});

/* -------------------- FILE SERVER -------------------- */
app.use(
  "/Data",
  express.static(path.join(__dirname, "..", "RealworldData", "Data"))

);

app.use(
  "/SR",
  express.static(path.join(__dirname, "..", "SR"))

);

app.post("/runPipeline", async (req, res) => {
  const { ImageName } = req.body;

  if (!ImageName) {
    return res.status(400).json({ error: "ImageName is required" });
  }

  const scriptPath = path.join(__dirname, "run_whole_project.ps1");

  const ps = spawn("powershell.exe", [
    "-ExecutionPolicy", "Bypass",
    "-File", scriptPath,
    "-ImageName", ImageName
  ]);

  let errorOutput = "";

  ps.stdout.on("data", (data) => {
    console.log(`PIPELINE: ${data}`);
  });

  ps.stderr.on("data", (data) => {
    console.error(`PIPELINE ERROR: ${data}`);
    errorOutput += data.toString();
  });

  ps.on("close", (code) => {
    if (code === 0) {
      return res.json({
        status: "success",
        message: "Pipeline completed successfully"
      });
    } else {
      return res.status(500).json({
        status: "failure",
        message: "Pipeline execution failed",
        error: errorOutput
      });
    }
  });

  ps.on("error", (err) => {
    console.error(err);
    res.status(500).json({
      status: "failure",
      message: "Failed to start pipeline"
    });
  });
});


/* -------------------- LOW LIGHT UPLOAD API -------------------- */
app.post("/upload/LowLight", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const sourcePath = req.file.path;
  const targetDir = path.join(__dirname, "..", "Low_Light_Image_Enhancement", "Input_images");
  const targetPath = path.join(targetDir, req.file.filename);

  // ensure destination directory exists
  fs.mkdirSync(targetDir, { recursive: true });

  // copy file using streams
  const readStream = fs.createReadStream(sourcePath);
  const writeStream = fs.createWriteStream(targetPath);

  readStream.pipe(writeStream);

  writeStream.on("finish", () => {
    res.json({
      message: "Low-light image uploaded successfully",
      storedFileName: req.file.filename
    });
  });

  writeStream.on("error", (err) => {
    console.error(err);
    res.status(500).json({ error: "File copy failed" });
  });
});

/* -------------------- LOW LIGHT FILE SERVER -------------------- */
app.use(
  "/LowLight",
  express.static(path.join(__dirname, "..", "Low_Light_Image_Enhancement"))
);

/* -------------------- LOW LIGHT ENHANCEMENT PIPELINE -------------------- */
app.post("/runLowLightEnhancement", async (req, res) => {
  const { ImageName, GammaMax } = req.body;

  if (!ImageName) {
    return res.status(400).json({ error: "ImageName is required" });
  }

  const gammaValue = GammaMax || 6.0;
  const scriptPath = path.join(__dirname, "..", "Low_Light_Image_Enhancement", "Low_light_image_enhancement.py");
  const inputDir = path.join(__dirname, "..", "Low_Light_Image_Enhancement", "Input_images");
  const outputDir = path.join(__dirname, "..", "Low_Light_Image_Enhancement", "results");

  // Python command
  const pythonCmd = `python "${scriptPath}" --input_dir "${inputDir}" --output_dir "${outputDir}" --gamma_max ${gammaValue}`;

  exec(pythonCmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json({
        status: "failure",
        message: "Enhancement execution failed",
        error: error.message
      });
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }

    console.log(`stdout: ${stdout}`);

    return res.json({
      status: "success",
      message: "Low-light enhancement completed successfully"
    });
  });
});

/* -------------------- SERVER START -------------------- */
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📂 Files available at http://localhost:${PORT}/files`);
});


