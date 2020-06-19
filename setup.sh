#!/bin/sh
pushd server
wget https://minecraft.azureedge.net/bin-linux/bedrock-server-1.14.60.5.zip
popd

docker build -t image .
docker run -p 8080:8080 -p 19132:19132/udp -d image