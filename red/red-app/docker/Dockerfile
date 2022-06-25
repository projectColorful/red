FROM node:16-alpine

# 앱 디렉터리 생성
RUN mkdir -p /app/node
WORKDIR /app/node

# 앱 의존성 설치
# 와일드카드를 사용
COPY package.json .
COPY . .

RUN ln -s /usr/local/bin/docker-entrypoint.sh /docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]

#alpine timezone 설정
RUN apk --no-cache add tzdata && \
        cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
        echo "Asia/Seoul" > /etc/timezone

RUN apk add git

RUN npm install

RUN npm install -g pm2 node-gyp

# npm 캐시 삭제
RUN npm cache clean --force

EXPOSE 3000

# 앱 소스 추가
COPY . /api
CMD [ "pm2-runtime", "red-app/apiServer.config.js" ]

