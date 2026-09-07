#!/usr/bin/env bash
# run_whole_project.sh
# ZeDuSR Real-world Processing Pipeline (cross-platform port of run_whole_project.ps1)
# Usage:
#   ./run_whole_project.sh "Car.jpeg"

set -euo pipefail

IMAGE_NAME="${1:-}"
if [ -z "$IMAGE_NAME" ]; then
    echo "ERROR: ImageName parameter is required" >&2
    exit 1
fi

# Filename without extension
IMAGE_BASE="${IMAGE_NAME%.*}"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Resolve a python interpreter (override with PYTHON=...)
PY="${PYTHON:-}"
if [ -z "$PY" ]; then
    if command -v python3 >/dev/null 2>&1; then PY="python3"; else PY="python"; fi
fi

cd "$ROOT"

echo ""
echo "======================================"
echo "     ZeDuSR Real-world Pipeline"
echo "======================================"
echo "Processing File: $IMAGE_NAME"
echo ""

echo "1. Resizing input images ..."
"$PY" "$ROOT/RealworldData/PreAlignment/resize.py"
echo "Resize finished."
echo ""

echo "2. SIFT-based pre-alignment (wide <-> tele)"
"$PY" "$ROOT/RealworldData/PreAlignment/sift_align.py" \
    --mode "iphone11_wideSRTele" \
    --wide_dir "$ROOT/RealworldData/Data/WideView" \
    --tele_dir "$ROOT/RealworldData/Data/TeleView" \
    --Tele_savePath "$ROOT/RealworldData/Data/TeleView_SIFTAlign" \
    --WideCrop_savePath "$ROOT/RealworldData/Data/WideView_crop"
echo "SIFT alignment finished."
echo ""

echo "3. Color and luminance correction ..."
"$PY" "$ROOT/RealworldData/color_correction/ColorluminanceDir.py"
echo "Color correction finished."
echo ""

echo "4. Iterative image alignment ..."
"$PY" "$ROOT/Alignment/alignment.py" \
    --input_hr "$ROOT/RealworldData/Data/TeleView_SIFTAlign_cor/$IMAGE_NAME" \
    --input_lr "$ROOT/RealworldData/Data/WideView_crop/$IMAGE_NAME" \
    --output_path "$ROOT/RealworldData/Data/DIAlign" \
    --dataset "iPhone11_wideSRTele/$IMAGE_BASE" \
    --shave 5 \
    --scale 2 \
    --epochs 31 \
    --fre_epoch 10
echo "Alignment finished."
echo ""

echo "5. Zero-shot super-resolution ..."
"$PY" "$ROOT/SR/ZSSR_real.py" \
    --scale 2 \
    --shave 4 \
    --train_lr "$ROOT/RealworldData/Data/DIAlign/iPhone11_wideSRTele/$IMAGE_BASE/out_30_warp.png" \
    --train_hr "$ROOT/RealworldData/Data/DIAlign/iPhone11_wideSRTele/$IMAGE_BASE/HR.png" \
    --test_lr "$ROOT/RealworldData/Data/WideView/$IMAGE_NAME" \
    --test_hr "$ROOT/RealworldData/Data/TeleView/$IMAGE_NAME" \
    --Invari_map "$ROOT/RealworldData/Data/DIAlign/iPhone11_wideSRTele/$IMAGE_BASE/PatchDisOut.npy" \
    --output_path "$ROOT/SR/Results_Real_$IMAGE_BASE/" \
    --dataset "iPhone11_wideSRTele/$IMAGE_BASE"
echo "Super-resolution finished."
echo ""

echo "======================================"
echo "          PIPELINE COMPLETED"
echo "======================================"
