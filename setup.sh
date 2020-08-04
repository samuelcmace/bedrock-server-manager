#!/bin/sh
SERVER=bedrock-server-1.16.1.02.zip

pushd server
if [ -f "bedrock_server" ]; then
    echo "Server Already Downloaded"
else
    if [ -f "$SERVER" ]; then
        unzip $SERVER
        rm $SERVER
    else
        wget https://minecraft.azureedge.net/bin-linux/$SERVER
        unzip $SERVER
        rm $SERVER
    fi
fi
popd

docker build -t image .
docker run --mount type=bind,source="$(pwd)"/server,target=/usr/src/app/server -p 8080:8080 -p 19132:19132/udp -d image
