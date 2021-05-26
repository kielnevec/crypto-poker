docker volume create --name=dashd-data
#copy dash.conf to the volume ADD ./dash.conf /dash/.dashcore/
docker build . -t dashd
docker run --net poker-network -v dashd-data:/dash --name=dashd-node -d -p 9998:9998 dashd
#add arguments after dashd e.g. -reindex
#docker exec -u 0 -it dad536802150 /bin/bash