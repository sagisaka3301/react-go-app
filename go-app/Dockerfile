FROM golang:1.16-alpine

WORKDIR /app

# .(go-app)を.(コンテナ内の/app)にコピーする。
COPY . .

RUN apk update && apk add git

RUN apk update && apk add --no-cache gcc musl-dev

RUN go build -o go-app .

ENTRYPOINT [ "/app/go-app" ]