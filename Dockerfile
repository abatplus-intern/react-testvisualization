FROM nginxinc/nginx-unprivileged:1.21.1-alpine

ARG PROJECT_PATH
COPY $PROJECT_PATH/dist /usr/share/nginx/html
COPY $PROJECT_PATH/nginx-default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
