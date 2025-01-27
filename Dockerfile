# Build Stage
FROM node:20.5.1 as base
WORKDIR /app
  RUN npm i -g pnpm
COPY package.json pnpm-lock.yaml ./

RUN pnpm install

ARG PGHOST
ENV PGHOST=${PGHOST}
ARG PGPORT
ENV PGPORT=${PGPORT}
ARG PGDATABASE
ENV PGDATABASE=${PGDATABASE}
ARG PGUSERNAME
ENV PGUSERNAME=${PGUSERNAME}
ARG PGPASSWORD
ENV PGPASSWORD=${PGPASSWORD}
ARG NEXTAUTH_SECRET
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
ARG NEXTAUTH_URL
ENV NEXTAUTH_URL=${NEXTAUTH_URL}
ARG GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
ARG GOOGLE_CLIENT_SECRET
ENV GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}
ARG AUTH_TRUST_HOST
ENV AUTH_TRUST_HOST=${AUTH_TRUST_HOST}
ARG AUTH_SECRET
ENV AUTH_SECRET=${AUTH_SECRET}
ARG NEXT_PUBLIC_THIS_BASE_URL
ENV NEXT_PUBLIC_THIS_BASE_URL=${NEXT_PUBLIC_THIS_BASE_URL}
ARG EMAIL_SERVER_USER
ENV EMAIL_SERVER_USER=${EMAIL_SERVER_USER}
ARG EMAIL_SERVER_PASSWORD
ENV EMAIL_SERVER_PASSWORD=${EMAIL_SERVER_PASSWORD}
ARG EMAIL_SERVER_HOST
ENV EMAIL_SERVER_HOST=${EMAIL_SERVER_HOST}
ARG EMAIL_SERVER_PORT
ENV EMAIL_SERVER_PORT=${EMAIL_SERVER_PORT}
ARG EMAIL_FROM
ENV EMAIL_FROM=${EMAIL_FROM}
ARG STRIPE_SECRET_KEY
ENV STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
ARG STRIPE_WEBHOOK_SECRET
ENV STRIPE_WEBHOOK_SECRET=${STRIPE_WEBHOOK_SECRET}
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
ARG NEXT_PUBLIC_STRIPE_PRO_PRICE_ID
ENV NEXT_PUBLIC_STRIPE_PRO_PRICE_ID=${NEXT_PUBLIC_STRIPE_PRO_PRICE_ID}
ARG NEXT_PUBLIC_STRIPE_MAX_PRICE_ID
ENV NEXT_PUBLIC_STRIPE_MAX_PRICE_ID=${NEXT_PUBLIC_STRIPE_MAX_PRICE_ID}
ARG NEXT_PUBLIC_STRIPE_ULTRA_PRICE_ID
ENV NEXT_PUBLIC_STRIPE_ULTRA_PRICE_ID=${NEXT_PUBLIC_STRIPE_ULTRA_PRICE_ID}
ARG RESEND_API_KEY
ENV RESEND_API_KEY=${RESEND_API_KEY}

COPY . .
RUN pnpm build

FROM node:20.5.1 AS release
WORKDIR /app
RUN npm i -g pnpm
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/public/. ./public/
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/.next ./.next
ENV NODE_ENV=production

EXPOSE 3000
CMD ["pnpm", "start"]
