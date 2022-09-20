COPY --from=build-stage /var/jenkins_home/workspace/GGANBU/frontend/deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]