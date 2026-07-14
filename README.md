# 🚀 EffZeDuSR Real-World Image Super-Resolution Pipeline

A complete end-to-end pipeline for **real-world image alignment and zero-shot super-resolution (ZSSR)**. This project processes wide and telephoto image pairs, aligns them through multiple stages, and generates a high-quality enhanced output.

---

## 📌 Overview

EffZeDuSR is designed to tackle real-world super-resolution challenges by combining:

* Classical computer vision (SIFT alignment)
* Color correction techniques
* Deep iterative alignment
* Zero-shot super-resolution (ZSSR)

The pipeline ensures robust enhancement even with real-world distortions such as misalignment, exposure differences, and noise.

---

## ⚙️ Pipeline Architecture

The execution flow consists of **five sequential stages**:

### 1. Image Resizing

* Standardizes input dimensions
* Ensures compatibility for alignment stages

### 2. SIFT-Based Pre-Alignment

* Aligns wide-view and tele-view images
* Uses feature matching for geometric consistency

### 3. Color & Luminance Correction

* Matches brightness and color distributions
* Reduces domain gap between input images

### 4. Iterative Deep Alignment

* Refines alignment using learning-based optimization
* Produces warped outputs and patch similarity maps

### 5. Zero-Shot Super Resolution (ZSSR)

* Trains per-image model at inference time
* Generates the final high-resolution output

---

## ▶️ Running via PowerShell Script

### 🔹 Command

```powershell
.\run_whole_project.ps1 -ImageName "Car.jpeg"
```

### 🔹 Description

This script automates the **entire pipeline**, executing all stages sequentially.

### 🔹 Input Requirement

* `ImageName`: Name of the input image (must exist in dataset folders)

### 🔹 Output Locations

After execution, results will be available in:

```
RealworldData\Data\TeleView_SIFTAlign
RealworldData\Data\WideView_crop
RealworldData\Data\DIAlign
SR\Results_Real_<ImageName>
```

---

## 🌐 Running via Web Interface (Recommended for Ease)

You can also run the project through a **browser-based UI**.

## Requirements

### Environment

- Python 3.13.1
- Node.js v22.12.0
- npm v10.9.0

### Python Dependencies

```txt
numpy==2.2.2
pandas==2.2.3
pillow==11.3.0
matplotlib==3.10.6
nltk==3.9.2
opencv-python==4.12.0.88
scikit-learn==1.6.1
scikit-image==0.25.2
scipy==1.15.1
seaborn==0.13.2
torch==2.8.0
torchvision==0.23.0
tqdm==4.67.1
```

### 🔹 Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/Juriez/Effzedusr.git
cd Effzedusr
```

2. Install requirements:
```bash
   pip install -r requirements.txt
```
3. Install dependencies:

```bash
npm install
```
4. Download Pre-trained Models

This project requires two pretrained components:

## VGG16 (for perceptual loss)
## META-RCAN (for super-resolution refinement)

## 1. VGG16 (Perceptual Network)
Download Link

### Download pretrained VGG16 weights:

https://download.pytorch.org/models/vgg16-397923af.pth

### Placement

Place the file in:
```text
preTrained/
└── vgg16-397923af.pth
```
### Load in Code (Alignment/utils/loss.py)
Replace the local path with the following:
```bash
vgg = vgg16
current_dir = os.path.dirname(os.path.abspath(__file__))
vgg_path = os.path.abspath(os.path.join(current_dir, '..', '..', 'preTrained', 'vgg16-397923.pth'))
vgg.load_state_dict(torch.load(vgg_path))
```
## 2. META-RCAN (Super-Resolution Model)

### Download META-RCAN from the official RCAN repository:

https://github.com/yulunzhang/RCAN

### Clone the repository:
```bash
git clone https://github.com/yulunzhang/RCAN.git
```
### Download pretrained META-RCAN weights.
Place the pretrained model in:
```text
SR/
└── models/
    └── preTrained/
        └── RCAN_BIX4.pt
```
Change the pretrained path in SR/models/model.py.

5. Start the frontend:

```bash
npm run dev
```

6. Start the backend:

```bash
node app.js
```

---

### Datasets
The proposed Real-Time Photo Enhancer is evaluated using two well-established public datasets, corresponding to each of the primary modules:

1. Dual-Camera Super-Resolution (EffZeDuSR)
For the EffZeDuSR module, we utilize the [CameraFusion](https://github.com/Tengfei-Wang/DCSR) Dataset.

Details: This dataset provides paired wide-angle and telephoto images captured simultaneously from smartphone dual-camera systems, featuring a wide-angle view (26mm lens) and a telephoto view (52mm lens) to evaluate realistic reference-based super-resolution.

2. Low-Light Image Enhancement (LLIE)
For the low-light enhancement module, we employ the [LOL (LOw-Light)](https://daooshee.github.io/BMVC2018website/) Dataset.

Details: The LOL dataset contains real-world low-light images paired with their corresponding normal-light reference images. It is the benchmark standard for training and evaluating supervised low-light image decomposition and enhancement models.

## User interface and manual
Users access the Real-Time Dual-Lens Photo Enhancer through any modern web browser. The clean and intuitive home page provides two distinct modes: Zero-Shot Dual-Lens Super-Resolution and Low-Light Image Enhancement. Both modules feature a step-by-step guided interface with progress indicators, intermediate result previews and one-click download options.

### EffZeDuSR
In this mode, users upload a pair of simultaneously captured TeleView and WideView images. The system automatically executes the full pipeline (pre-alignment, color correction, deep alignment and Meta-RCAN super-resolution) and generates a high-resolution wide-angle output that combines broad scene coverage with telephoto-level sharpness.
<img width="753" height="729" alt="image" src="https://github.com/user-attachments/assets/bb85488e-6d96-42f6-8e1f-2d5251ced655" />
#### Output after Alignment procedure
<img width="957" height="636" alt="image" src="https://github.com/user-attachments/assets/b23a1710-37b6-4e3e-a0a5-37c16b59ecab" />

#### Final super resolution output combining both views for maximum detail and quality:
<img width="646" height="712" alt="image" src="https://github.com/user-attachments/assets/3721f2c0-ef31-4a79-be1f-4c14adec7a74" />

### Low-Light Image Enhancement
Users upload a single low-light image. The system applies the atmospheric scattering model with gamma correction prior to restore visibility, contrast and color. The interface displays the original image, processing progress and the final enhanced result.
<img width="1225" height="811" alt="image" src="https://github.com/user-attachments/assets/3e61d26b-ebd0-425b-9c73-01e6112c65c4" />

Both modules are fully automated, require no manual parameter tuning and provide real-time feedback through progress modals, making the tool accessible even for non-technical users.

## 🖥️ How to Use the Web App

1. Open your browser and navigate to:

```
http://localhost:5173
```

2. Upload two images:

   * Wide-view image
   * Tele-view image

3. Click:
   👉 **"Upload Both Images to Continue"**

4. You will be redirected to the processing page

5. Enter output filename:

```
Example: Car.jpeg
```

6. Click:
   👉 **"Start Process"**

---

## ⏳ Processing Time

* The pipeline performs **on-the-fly learning**
* Execution may take **several minutes** depending on hardware

---

## 📊 Output

After completion:

* Navigate to the **Results Page**
* The final enhanced image will be displayed
* You can:

  * 👁️ View the image
  * ⬇️ Download it locally

---

## 🧠 Key Strengths

* No pre-trained dataset required (Zero-shot learning)
* Robust to real-world distortions
* Fully automated pipeline
* Supports both CLI and Web-based execution

---

## ⚠️ Notes & Best Practices

* Ensure Python dependencies are installed
* Maintain correct folder structure
* Use high-quality input images for best results
* GPU acceleration is recommended for faster processing

---

---

## 🏁 Final Output

The final result is a **high-resolution enhanced image** generated from your input pair.

> This is the **target output** of the entire ZeDuSR pipeline.

---

## 📬 Contribution

Feel free to fork, improve, and submit pull requests.

---

---

## 💡 Closing Thought

This project is not just a script it's a **full-stack AI-powered image enhancement system** bridging classical vision and modern deep learning.

---
---
## Acknowledgement
We thank the authors of [ZeDuSR](https://github.com/XrKang/ZeDuSR) & [Low_Light_Pattern_Recognition](http://github.com/TripleJ2543/Low_Light_Pattern_Recognition_2023) for sharing their codes & thank the authors of [DCSR](https://github.com/Tengfei-Wang/DCSR) for sharing the CameraFusion Dataset.

