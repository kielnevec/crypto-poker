docker volume create --name=dashd-data
#copy dash.conf to the volume ADD ./dash.conf /dash/.dashcore/
docker build . -t dashd
docker run --net poker-network -v dashd-data:/dash --name=dashd-node -d -p 9999:9999 -p 9998:9998 dashd