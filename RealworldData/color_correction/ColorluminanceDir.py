import os
import numpy as np
import cv2
import time
from multiprocessing import Pool, cpu_count


def color_transfer_rgb(Ic, It, alpha=0.85):
    """
    Fast color transfer in RGB using per-channel mean/std.
    """
    # Compute mean and std with OpenCV (fast)
    mu_c, sigma_c = cv2.meanStdDev(Ic)
    mu_t, sigma_t = cv2.meanStdDev(It)

    mu_c, sigma_c = mu_c.flatten(), sigma_c.flatten()
    mu_t, sigma_t = mu_t.flatten(), sigma_t.flatten()
    sigma_t[sigma_t < 1e-6] = 1e-6

    # Vectorized correction
    It_corr = (It - mu_t) * (sigma_c / sigma_t) + mu_c
    It_corr = np.clip(It_corr, 0, 255)

    # Blend with original to avoid overcorrection
    out = alpha * It_corr + (1 - alpha) * It
    return np.clip(out, 0, 255).astype(np.uint8)


def process_image(args):
    fname, ref_folder, input_folder, save_folder = args
    path1 = os.path.join(ref_folder, fname)  # reference
    path2 = os.path.join(input_folder, fname)  # target

    I1 = cv2.cvtColor(cv2.imread(path1), cv2.COLOR_BGR2RGB).astype(np.float32)
    I2 = cv2.cvtColor(cv2.imread(path2), cv2.COLOR_BGR2RGB).astype(np.float32)

    I2_c = color_transfer_rgb(I1, I2, alpha=0.9)

    out_path = os.path.join(save_folder, fname)
    out_img = cv2.cvtColor(I2_c, cv2.COLOR_RGB2BGR)
    cv2.imwrite(out_path, out_img)


if __name__ == "__main__":
    start_time = time.time()

    ref_folder = "/home/bxg-server/zareen/Meta_Rcan/ZeDuSR/RealworldData/Data/WideView_crop_bic/"
    input_folder = "/home/bxg-server/zareen/Meta_Rcan/ZeDuSR/RealworldData/Data/TeleView_SIFTAlign/"
    save_folder = "/home/bxg-server/zareen/Meta_Rcan/ZeDuSR/RealworldData/Data/TeleView_SIFTAlign_cor/"

    os.makedirs(save_folder, exist_ok=True)

    valid_exts = ('.jpg', '.jpeg', '.png', '.bmp', '.tif', '.tiff')
    filepaths = [f for f in os.listdir(ref_folder) if f.lower().endswith(valid_exts)]

    # Parallel execution
    args_list = [(fname, ref_folder, input_folder, save_folder) for fname in filepaths]
    with Pool(processes=cpu_count()) as pool:
        pool.map(process_image, args_list)

    end_time = time.time()
    print(f"Execution time: {end_time - start_time:.2f} seconds")
