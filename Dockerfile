# syntax=docker/dockerfile:1.7

# ---------- Frontend build ----------
FROM node:22-bookworm-slim AS frontend-build
WORKDIR /app/frontend

COPY frontend/frontend/package*.json ./
RUN npm ci

COPY frontend/frontend/ ./
RUN npm run build

# ---------- Backend + ML runtime ----------
FROM python:3.13-slim-bookworm AS app

ENV DEBIAN_FRONTEND=noninteractive \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PYTHONPATH=/app \
    PORT=3000

WORKDIR /app

# Runtime libraries required by OpenCV/matplotlib and basic image processing.
RUN apt-get update && apt-get install -y --no-install-recommends \
        curl \
        ca-certificates \
        libgl1 \
        libglib2.0-0 \
        libsm6 \
        libxext6 \
        libxrender1 \
        libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Node.js is needed by the existing Express backend.
COPY --from=node:22-bookworm-slim /usr/local/bin/node /usr/local/bin/node
COPY --from=node:22-bookworm-slim /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=node:22-bookworm-slim /opt /opt
RUN ln -sf /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm \
    && ln -sf /usr/local/lib/node_modules/corepack/dist/corepack.js /usr/local/bin/corepack || true

# Install Python dependencies other than PyTorch first so Docker caching is useful.
COPY requirements.txt /tmp/requirements.txt
RUN sed -i '/^torch==/d; /^torchvision==/d' /tmp/requirements.txt \
    && python -m pip install --upgrade pip \
    && python -m pip install -r /tmp/requirements.txt \
    && python -m pip install torch==2.8.0 torchvision==0.23.0 --index-url https://download.pytorch.org/whl/cu126

# Install backend Node dependencies.
COPY backend/package*.json /app/backend/
RUN cd /app/backend && npm ci --omit=dev

# Copy application source.
COPY . /app/

# Replace the Windows-only PowerShell pipeline launcher with the Linux launcher.
COPY docker/run_whole_project.sh /app/backend/run_whole_project.sh
RUN chmod +x /app/backend/run_whole_project.sh /app/docker/entrypoint.sh \
    && mkdir -p /app/backend/files \
               /app/RealworldData/Data \
               /app/Low_Light_Image_Enhancement/Input_images \
               /app/Low_Light_Image_Enhancement/results \
               /app/SR

EXPOSE 3000

CMD ["/app/docker/entrypoint.sh"]

# ---------- Production frontend image ----------
FROM nginx:1.29-alpine AS frontend
COPY --from=frontend-build /app/frontend/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
