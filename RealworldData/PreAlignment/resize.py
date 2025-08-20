import os
from PIL import Image,ImageOps

# Set source and destination folders
source_dir_tele = "/home/bxg-server/zareen/Meta_Rcan/ZeDuSR/RealworldData/Data/HighRes/TeleView"
dest_dir_tele = "/home/bxg-server/zareen/Meta_Rcan/ZeDuSR/RealworldData/Data/TeleView"
source_dir_wide = "/home/bxg-server/zareen/Meta_Rcan/ZeDuSR/RealworldData/Data/HighRes/WideView"
dest_dir_wide = "/home/bxg-server/zareen/Meta_Rcan/ZeDuSR/RealworldData/Data/WideView"

# Create destination directory if it doesn't exist
os.makedirs(dest_dir_tele, exist_ok=True)

# Desired resize size (width, height)
# Sizes for horizontal and vertical images
# horizontal_size = (1856, 1352)
# vertical_size = (1352, 1856)

# horizontal_size = (1500, 1093)
# vertical_size = (1093, 1500)

horizontal_size = (1280, 932)
vertical_size = (932, 1280)

# Loop through all files in the source directory
for filename in os.listdir(source_dir_tele):
    if filename.lower().endswith((".png", ".jpg", ".jpeg", ".bmp", ".gif")):
        src_path = os.path.join(source_dir_tele, filename)
        dst_path = os.path.join(dest_dir_tele, filename)

        with Image.open(src_path) as img:
            img = ImageOps.exif_transpose(img)
            if img.width >= img.height:
                # Horizontal
                img_resized = img.resize(horizontal_size, Image.LANCZOS)
            else:
                # Vertical
                img_resized = img.resize(vertical_size, Image.LANCZOS)

            img_resized.save(dst_path)

os.makedirs(dest_dir_wide, exist_ok=True)

# Loop through all files in the source directory
for filename in os.listdir(source_dir_wide):
    if filename.lower().endswith((".png", ".jpg", ".jpeg", ".bmp", ".gif")):
        src_path = os.path.join(source_dir_wide, filename)
        dst_path = os.path.join(dest_dir_wide, filename)

        with Image.open(src_path) as img:
            img = ImageOps.exif_transpose(img)
            if img.width >= img.height:
                # Horizontal
                img_resized = img.resize(horizontal_size, Image.LANCZOS)
            else:
                # Vertical
                img_resized = img.resize(vertical_size, Image.LANCZOS)

            img_resized.save(dst_path)

print(" All images resized and saved!")
