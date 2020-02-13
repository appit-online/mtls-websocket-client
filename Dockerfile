FROM node:12.13.1 as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY . /usr/src/app

RUN npm config set registry http://registry.npmjs.org
RUN npm install && npm cache clean --force
RUN npm run build:prod

# production environment
FROM nginx:latest
RUN rm -rf /etc/nginx/conf.d
RUN mkdir -p /etc/nginx/conf.d
COPY ./deploy/default.conf /etc/nginx/conf.d/
COPY --from=builder /usr/src/app/dist/build-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
