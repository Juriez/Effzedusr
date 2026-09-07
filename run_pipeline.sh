#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "ERROR: ImageName parameter is required"
  exit 1
fi

ImageName="$1"
ImageBase="${ImageName%.*}"

echo "======================================"
echo "     ZeDuSR Real-world Pipeline"
echo "======================================"
echo "Processing File: $ImageName"
echo ""

python RealworldData/PreAlignment/resize.py
echo "1. Resize finished."

python RealworldData/PreAlignment/sift_align.py \
  --mode "iphone11_wideSRTele" \
  --wide_dir "RealworldData/Data/WideView" \
  --tele_dir "RealworldData/Data/TeleView" \
  --Tele_savePath "RealworldData/Data/TeleView_SIFTAlign" \
  --WideCrop_savePath "RealworldData/Data/WideView_crop"
echo "2. SIFT alignment finished."

python RealworldData/color_correction/ColorluminanceDir.py
echo "3. Color correction finished."

python Alignment/alignment.py \
  --input_hr "RealworldData/Data/TeleView_SIFTAlign_cor/$ImageName" \
  --input_lr "RealworldData/Data/WideView_crop/$ImageName" \
  --output_path "RealworldData/Data/DIAlign" \
  --dataset "iPhone11_wideSRTele/$ImageBase" \
  --shave 5 \
  --scale 2 \
  --epochs 31 \
  --fre_epoch 10
echo "4. Alignment finished."

python SR/ZSSR_real.py \
  --scale 2 \
  --shave 4 \
  --train_lr "RealworldData/Data/DIAlign/iPhone11_wideSRTele/$ImageBase/out_30_warp.png" \
  --train_hr "RealworldData/Data/DIAlign/iPhone11_wideSRTele/$ImageBase/HR.png" \
  --test_lr "RealworldData/Data/WideView/$ImageName" \
  --test_hr "RealworldData/Data/TeleView/$ImageName" \
  --Invari_map "RealworldData/Data/DIAlign/iPhone11_wideSRTele/$ImageBase/PatchDisOut.npy" \
  --output_path "SR/Results_Real_$ImageBase/" \
  --dataset "iPhone11_wideSRTele/$ImageBase"
echo "5. Super-resolution finished."

echo "======================================"
echo "          PIPELINE COMPLETED"
echo "======================================"