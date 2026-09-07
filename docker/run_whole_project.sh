#!/bin/sh
set -eu

# Linux/Docker equivalent of backend/run_whole_project.ps1
# Usage: ./run_whole_project.sh "Car.jpeg"

if [ "$#" -lt 1 ] || [ -z "$1" ]; then
    echo "ERROR: ImageName parameter is required" >&2
    exit 1
fi

IMAGE_NAME="$1"
IMAGE_BASE="${IMAGE_NAME%.*}"
ROOT="/app"
PYTHON="python"

run_step() {
    echo ""
    echo "======================================"
    echo " $1"
    echo "======================================"
    shift
    "$@"
}

cd "$ROOT/backend"

run_step "1. Resizing input images" \
    "$PYTHON" "../RealworldData/PreAlignment/resize.py"

run_step "2. SIFT-based pre-alignment (wide <-> tele)" \
    "$PYTHON" "../RealworldData/PreAlignment/sift_align.py" \
    --mode "iphone11_wideSRTele" \
    --wide_dir "../RealworldData/Data/WideView" \
    --tele_dir "../RealworldData/Data/TeleView" \
    --Tele_savePath "../RealworldData/Data/TeleView_SIFTAlign" \
    --WideCrop_savePath "../RealworldData/Data/WideView_crop"

run_step "3. Color and luminance correction" \
    "$PYTHON" "../RealworldData/color_correction/ColorluminanceDir.py"

run_step "4. Iterative image alignment" \
    "$PYTHON" "../Alignment/alignment.py" \
    --input_hr "../RealworldData/Data/TeleView_SIFTAlign_cor/$IMAGE_NAME" \
    --input_lr "../RealworldData/Data/WideView_crop/$IMAGE_NAME" \
    --output_path "../RealworldData/Data/DIAlign" \
    --dataset "iPhone11_wideSRTele/$IMAGE_BASE" \
    --shave 5 \
    --scale 2 \
    --epochs 31 \
    --fre_epoch 10

run_step "5. Zero-shot super-resolution" \
    "$PYTHON" "../SR/ZSSR_real.py" \
    --scale 2 \
    --shave 4 \
    --train_lr "../RealworldData/Data/DIAlign/iPhone11_wideSRTele/$IMAGE_BASE/out_30_warp.png" \
    --train_hr "../RealworldData/Data/DIAlign/iPhone11_wideSRTele/$IMAGE_BASE/HR.png" \
    --test_lr "../RealworldData/Data/WideView/$IMAGE_NAME" \
    --test_hr "../RealworldData/Data/TeleView/$IMAGE_NAME" \
    --Invari_map "../RealworldData/Data/DIAlign/iPhone11_wideSRTele/$IMAGE_BASE/PatchDisOut.npy" \
    --output_path "../SR/Results_Real_$IMAGE_BASE/" \
    --dataset "iPhone11_wideSRTele/$IMAGE_BASE"

echo ""
echo "======================================"
echo " PIPELINE COMPLETED"
echo "======================================"
echo "Result: /app/SR/Results_Real_$IMAGE_BASE"
