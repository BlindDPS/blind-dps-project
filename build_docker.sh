#!/bin/bash

export SSH_PRIVATE_KEY="$(cat ~/.ssh/id_rsa)"


docker build --build-arg SSH_PRIVATE_KEY -t "${USER}"/node-project .

docker run -it -v /usr/src/app/node_modules \
           -v $(pwd):/usr/src/app -p 3000:3000 \
           --rm --name node "${USER}"/node-project /bin/bash


unset SSH_PRIVATE_KEY