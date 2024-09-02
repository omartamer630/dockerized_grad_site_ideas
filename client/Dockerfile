FROM node:18 AS build

WORKDIR /client

COPY . ./

RUN npm install && npm run build

#CMD ["npm", "run", "preview"]

FROM nginx:alpine

COPY --from=build /client/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


