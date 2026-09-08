# Stage 1: Build Storybook
FROM node:22-alpine AS builder

WORKDIR /app

# Install pnpm (matching project devEngines v11)
RUN npm install -g pnpm@11

# Copy dependency manifests
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code and config
COPY . .

# Build Storybook static assets into storybook-static/
RUN pnpm build-storybook

# Stage 2: Production web server
FROM nginx:alpine AS runner

# Copy built static files to Nginx web root
COPY --from=builder /app/storybook-static /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
