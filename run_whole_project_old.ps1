# run_whole_project.ps1
# ZeDuSR Real-world Processing Pipeline
# Usage:
#   .\run_whole_project.ps1 -ImageName "Car.jpeg"

param(
    [string]$ImageName
)

if (-not $ImageName) {
    Write-Host "ERROR: ImageName parameter is required" -ForegroundColor Red
    exit 1
}

# Extract filename without extension
$ImageBase = [System.IO.Path]::GetFileNameWithoutExtension($ImageName)

$ErrorActionPreference = "Stop"
$python = "python"

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "     ZeDuSR Real-world Pipeline"     -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Processing File: $ImageName"
Write-Host ""

# Step 1 ─ Resize input images
Write-Host "1. Resizing input images ..." -ForegroundColor Yellow
& $python ".\RealworldData\PreAlignment\resize.py"
Write-Host "Resize finished." -ForegroundColor Green
Write-Host ""

# Step 2 ─ SIFT-based pre-alignment
Write-Host "2. SIFT-based pre-alignment (wide <-> tele)" -ForegroundColor Yellow
& $python ".\RealworldData\PreAlignment\sift_align.py" `
    --mode "iphone11_wideSRTele" `
    --wide_dir ".\RealworldData\Data\WideView" `
    --tele_dir ".\RealworldData\Data\TeleView" `
    --Tele_savePath ".\RealworldData\Data\TeleView_SIFTAlign" `
    --WideCrop_savePath ".\RealworldData\Data\WideView_crop"
Write-Host "SIFT alignment finished." -ForegroundColor Green
Write-Host ""

# Step 3 ─ Color correction
Write-Host "3. Color and luminance correction ..." -ForegroundColor Yellow
& $python ".\RealworldData\color_correction\ColorluminanceDir.py"
Write-Host "Color correction finished." -ForegroundColor Green
Write-Host ""

# Step 4 ─ Deep/Iterative Alignment
Write-Host "4. Iterative image alignment ..." -ForegroundColor Yellow
& $python ".\Alignment\alignment.py" `
    --input_hr ".\RealworldData\Data\TeleView_SIFTAlign_cor\$ImageName" `
    --input_lr ".\RealworldData\Data\WideView_crop\$ImageName" `
    --output_path ".\RealworldData\Data\DIAlign" `
    --dataset "iPhone11_wideSRTele\$ImageBase" `
    --shave 5 `
    --scale 2 `
    --epochs 21 `
    --fre_epoch 10
Write-Host "Alignment finished." -ForegroundColor Green
Write-Host ""

# Step 5 ─ Zero-shot Super Resolution
Write-Host "5. Zero-shot super-resolution ..." -ForegroundColor Yellow
& $python ".\SR\ZSSR_real.py" `
    --scale 2 `
    --shave 4 `
    --train_lr ".\RealworldData\Data\DIAlign\iPhone11_wideSRTele\$ImageBase\out_20_warp.png" `
    --train_hr ".\RealworldData\Data\DIAlign\iPhone11_wideSRTele\$ImageBase\HR.png" `
    --test_lr ".\RealworldData\Data\WideView\$ImageName" `
    --test_hr ".\RealworldData\Data\TeleView\$ImageName" `
    --Invari_map ".\RealworldData\Data\DIAlign\iPhone11_wideSRTele\$ImageBase\PatchDisOut.npy" `
    --output_path ".\Results_Real_$ImageBase\" `
    --dataset "iPhone11_wideSRTele\$ImageBase"
Write-Host "Super-resolution finished." -ForegroundColor Green
Write-Host ""

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "          PIPELINE COMPLETED"         -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Check folders:"
Write-Host "  - RealworldData\Data\TeleView_SIFTAlign"
Write-Host "  - RealworldData\Data\WideView_crop"
Write-Host "  - RealworldData\Data\DIAlign"
Write-Host "  - Results_Real_$ImageBase"
Write-Host ""
