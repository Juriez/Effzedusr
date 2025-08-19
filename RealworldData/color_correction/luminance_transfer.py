# import numpy as np

# def luminance_transfer(Ic, Is, ind=None):
#     """
#     Adjust luminance of Is to match Ic
#     Args:
#       Ic: reference image, shape (H, W, C)
#       Is: source image, shape (H, W, C)
#       ind: indices to consider (optional)
#     Returns:
#       L_s_new: luminance adjusted image (same shape as Is)
#     """

#     if ind is None:
#         ind = np.arange(Is.size) # all pixels

#     # Flatten images to vectors
#     L_c = Ic.flatten()
#     L_s = Is.flatten()

#     # Compute scaling parameters
#     std_c = np.std(L_c)
#     std_s = np.std(L_s[ind])
#     mean_c = np.mean(L_c)
#     mean_s = np.mean(L_s[ind])

#     lu_1 = std_c / std_s
#     lu_2 = mean_c - lu_1 * mean_s

#     # Apply luminance transfer
#     L_s_new = lu_1 * L_s + lu_2

#     # Reshape to original image shape
#     L_s_new = L_s_new.reshape(Is.shape)

#     return L_s_new

import numpy as np

def luminance_transfer(Ic, Is, ind=None):
    if ind is None:
        ind = np.arange(Is.size)

    L_c = Ic.flatten()
    L_s = Is.flatten()

    std_Lc = np.std(L_c)
    std_Ls = np.std(L_s[ind])
    mean_Lc = np.mean(L_c)
    mean_Ls = np.mean(L_s[ind])

    lu = [std_Lc / std_Ls, mean_Lc - (std_Lc / std_Ls) * mean_Ls]

    L_s_new = lu[0] * L_s + lu[1]
    L_s_new = L_s_new.reshape(Is.shape)

    return L_s_new