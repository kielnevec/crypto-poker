FROM ubuntu:bionic

ARG USER_ID
ARG GROUP_ID

ENV HOME /dash

# add user with specified (or default) user/group ids
ENV USER_ID ${USER_ID:-1000}
ENV GROUP_ID ${GROUP_ID:-1000}
RUN groupadd -g ${GROUP_ID} dash
RUN useradd -u ${USER_ID} -g dash -s /bin/bash -m -d /dash dash
RUN mkdir /dash/.dashcore
RUN chown dash:dash -R /dash

RUN apt-get update && \
    apt-get -y install --no-install-recommends \
    wget \
    ca-certificates \
    vim \
    && rm -rf /var/lib/apt/lists/*

ADD ./transaction.sh /dash/transaction.sh
RUN chmod a+x /dash/transaction.sh

ADD https://github.com/dashpay/dash/releases/download/v0.17.0.2/dashcore-0.17.0.2-x86_64-linux-gnu.tar.gz /tmp/
RUN tar -xvf /tmp/dashcore-*.tar.gz -C /tmp/
RUN cp /tmp/dashcore*/bin/*  /usr/local/bin
RUN rm -rf /tmp/dashcore*

RUN chmod a+x /usr/local/bin/*




USER dash

VOLUME ["/dash"]

EXPOSE 9998 9999 19998 19999

WORKDIR /dash

ENTRYPOINT ["dashd"]