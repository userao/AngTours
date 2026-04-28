# Start your image with a node base image
FROM node:22-alpine as build

WORKDIR /app

COPY . ./
RUN npm install @esbuild/linux-x64

# RUN npm install 

RUN npm run build

FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/ang-tours/browser /usr/share/nginx/html

EXPOSE 80