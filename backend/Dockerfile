# EffZeDuSR backend: Node/Express API + Python ML pipeline (CPU only)
FROM node:20-bookworm-slim

# ---- System deps: Python + OpenCV runtime libs + bash ----
RUN apt-get update && apt-get install -y --no-install-recommends \
        python3 \
        python3-pip \
        python-is-python3 \
        bash \
        git \
        libgl1 \
        libglib2.0-0 \
        libgomp1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# ---- Node deps (cached layer) ----
COPY backend/package.json backend/package-lock.json ./backend/
RUN cd backend && npm install

# ---- Python deps (cached layer) ----
# PyPI stays the primary index (so build backends like flit_core resolve);
# the PyTorch CPU channel is only an *extra* index, which keeps torch on the
# CPU-only wheels instead of pulling the multi-GB CUDA builds.
COPY requirements.txt ./
RUN pip3 install --no-cache-dir --break-system-packages \
        --extra-index-url https://download.pytorch.org/whl/cpu \
        -r requirements.txt

# Source is bind-mounted at runtime (see docker-compose.yml)
WORKDIR /app/backend
EXPOSE 3000
CMD ["node", "app.js"]
