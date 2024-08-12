FROM node:lts

WORKDIR /src

ADD docker/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

COPY ./ /

RUN npm install -g serve && \
    docker-entrypoint.sh install

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["run"]
