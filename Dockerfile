# syntax=docker/dockerfile:1
ARG NODE_VERSION=20.14.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION} 

# Set working directory for all build stages.
WORKDIR /usr/src/app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

CMD npm run dev