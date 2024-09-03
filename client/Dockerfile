FROM node:18 AS build

WORKDIR /client

COPY . ./

RUN npm install && npm run build

FROM nginx:alpine

COPY --from=build /client/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY certs /usr/share/nginx/html/certs
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]


