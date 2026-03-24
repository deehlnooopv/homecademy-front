FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm i

# Copy source code and build
COPY . .
RUN pnpm run build

# Environment variables
ENV NODE_ENV production
ENV PORT 3000
ENV HOSTNAME "localhost"

EXPOSE 3000

# Run Next.js (standalone output)
# standalone 모드에서는 public과 static 폴더를 직접 관리해야 할 수도 있으므로
# 가장 심플한 실행 방식인 next start를 사용합니다.
CMD ["pnpm", "start"]
