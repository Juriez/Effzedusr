#!/bin/sh
set -eu

cd /app

# Helpful startup diagnostics.
echo "=============================================="
echo " EffZeDuSR Docker Backend"
echo "=============================================="
python --version
node --version
python -c "import torch; print('PyTorch:', torch.__version__); print('CUDA available:', torch.cuda.is_available()); print('CUDA:', torch.version.cuda)"

echo "Starting Node/Express backend on port ${PORT:-3000}..."
exec node /app/backend/app.js
