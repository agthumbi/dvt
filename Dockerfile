
FROM node:14 AS ui-build
MAINTAINER Antony Thumbi 

WORKDIR /usr/src/app
ENV NODE-OPTIONS=--max_old_space_size=2048
COPY ..
RUN npm i && npm run build


FROM node:14 AS server-build
WORKDIR /dvt-ui
COPY --from=ui-build /usr/src/app/build ./build
RUN npm i -g server
CMD serve -s build

EXPOSE 3000

HEALTHCHECK CMD curl --fail http://localhost:3000/ || exit