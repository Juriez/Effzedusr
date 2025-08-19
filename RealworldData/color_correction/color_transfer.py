# import numpy as np

# def color_transfer(Ic, It, ind=None):
#     """
#     Transfer color distribution from Ic to It.
#     Args:
#       Ic: reference image (H,W,C)
#       It: target image (H,W,C)
#       ind: indices to use for statistics (optional)
#     Returns:
#       Itt: color corrected image (H,W,C)
#     """

#     m1, n1, c = Ic.shape
#     X = Ic.reshape((m1 * n1, c))

#     m2, n2, c = It.shape
#     Y = It.reshape((m2 * n2, c))

#     if ind is None:
#         ind = np.arange(m2 * n2)

#     # Mean and covariance of Ic
#     mu_x = np.mean(X, axis=0)
#     S_x = np.cov(X, rowvar=False)

#     # SVD of S_x
#     Ux, Dx, _ = np.linalg.svd(S_x)

#     # Mean and covariance of selected pixels of It
#     Y_ind = Y[ind, :]
#     mu_y = np.mean(Y_ind, axis=0)
#     S_y = np.cov(Y_ind, rowvar=False)

#     Uy, Dy, _ = np.linalg.svd(S_y)

#     # Build transformation matrix A and vector b
#     Dx_sqrt = np.diag(np.sqrt(Dx))
#     Dy_inv_sqrt = np.diag(1.0 / np.sqrt(Dy))
#     A = Ux @ Dx_sqrt @ Ux.T @ Uy @ Dy_inv_sqrt @ Uy.T
#     b = mu_x - A @ mu_y

#     # Apply transformation
#     Z = (A @ Y.T).T + b

#     # Reshape back to image
#     Itt = Z.reshape((m2, n2, c))

#     return Itt

import numpy as np

def color_transfer(Ic, It, ind=None):
    m1, n1, c = Ic.shape
    X = Ic.reshape((-1, c)) # [m1*n1, c]

    m2, n2, _ = It.shape
    Y = It.reshape((-1, c)) # [m2*n2, c]

    if ind is None:
        ind = np.arange(m2 * n2)

    mu_x = np.mean(X, axis=0)
    X_centered = X - mu_x
    S_x = (X_centered.T @ X_centered) / (m1 * n1)
    Ux, Dx, _ = np.linalg.svd(S_x)

    mu_y = np.mean(Y[ind, :], axis=0)
    Y_centered = Y[ind, :] - mu_y
    S_y = (Y_centered.T @ Y_centered) / len(ind)
    Uy, Dy, _ = np.linalg.svd(S_y)

    Dx_sqrt = np.diag(np.sqrt(Dx))
    Dy_inv_sqrt = np.diag(1.0 / np.sqrt(Dy))

    A = Ux @ Dx_sqrt @ Ux.T @ Uy @ Dy_inv_sqrt @ Uy.T
    b = mu_x.reshape(-1, 1) - A @ mu_y.reshape(-1, 1)

    Z = (A @ Y.T) + b # shape: [c, m2*n2]
    Z = Z.T.reshape((m2, n2, c))

    para = {'A': A, 'b': b}

    return Z, para