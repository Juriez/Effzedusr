# import os
# import numpy as np
# import cv2
# from luminance_transfer import luminance_transfer
# from color_transfer import color_transfer

# # Folders
# ref_folder = '/home/bxg-server/zareen/ZeDuSR/RealworldData/Data//WideView_crop_bic/'
# input_folder = '/home/bxg-server/zareen/ZeDuSR/RealworldData/Data/TeleView_SIFTAlign/'
# save_folder = '/home/bxg-server/zareen/ZeDuSR/RealworldData/Data/TeleView_SIFTAlign_cor/'

# os.makedirs(save_folder, exist_ok=True)

# # List all jpg files in reference folder
# file_list = [f for f in os.listdir(ref_folder) if f.endswith('.jpeg')]

# for filename in file_list:
#     path1 = os.path.join(ref_folder, filename) # reference image path
#     path2 = os.path.join(input_folder, filename) # target image path

#     # Read images as RGB float64 normalized
#     I1 = cv2.cvtColor(cv2.imread(path1), cv2.COLOR_BGR2RGB).astype(np.float64) / 255.0
#     I2 = cv2.cvtColor(cv2.imread(path2), cv2.COLOR_BGR2RGB).astype(np.float64) / 255.0

#     # Apply luminance transfer
#     I2_l = luminance_transfer(I1, I2)

#     # Apply color transfer
#     I2_c = color_transfer(I1, I2_l)

#     # Convert processed RGB float64 back to BGR uint8 for saving
#     save_img = cv2.cvtColor((I2_c * 255).clip(0, 255).astype(np.uint8), cv2.COLOR_RGB2BGR)

#     # Save the color-corrected image
#     save_path = os.path.join(save_folder, filename)
#     cv2.imwrite(save_path, save_img)

import os
import numpy as np
import cv2

from luminance_transfer import luminance_transfer
from color_transfer import color_transfer

# Set folder paths
ref_folder = '/home/bxg-server/zareen/ZeDuSR/RealworldData/Data//WideView_crop_bic/'
input_folder = '/home/bxg-server/zareen/ZeDuSR/RealworldData/Data/TeleView_SIFTAlign/'
save_folder = '/home/bxg-server/zareen/ZeDuSR/RealworldData/Data/TeleView_SIFTAlign_cor/'

# Choose image format
filepaths = [f for f in os.listdir(ref_folder) if f.endswith('.jpg')] # iPhone11
# filepaths = [f for f in os.listdir(ref_folder) if f.endswith('.png')] # iPhone12

# Create save folder if not exists
# if not os.path.exists(save_folder):
#     os.makedirs(save_folder)
os.makedirs(save_folder, exist_ok=True)

# Loop over files
for filename in filepaths:
    path1 = os.path.join(ref_folder, filename) # reference image
    path2 = os.path.join(input_folder, filename) # target image

    # Read images and convert to double (range [0, 1])
    I1 = cv2.imread(path1).astype(np.float32) / 255.0
    I2 = cv2.imread(path2).astype(np.float32) / 255.0

    # # Convert BGR to RGB (if needed)
    # I1 = cv2.cvtColor(I1, cv2.COLOR_BGR2RGB)
    # I2 = cv2.cvtColor(I2, cv2.COLOR_BGR2RGB)

    # Luminance transfer
    I2_l = luminance_transfer(I1, I2)

    # Color transfer
    I2_c, _ = color_transfer(I1, I2_l)

    # # Convert back to BGR for saving
    # I2_c = cv2.cvtColor(I2_c, cv2.COLOR_RGB2BGR)

    # Save the result
    save_path = os.path.join(save_folder, filename)
    cv2.imwrite(save_path, (np.clip(I2_c, 0, 1) * 255).astype(np.uint8))