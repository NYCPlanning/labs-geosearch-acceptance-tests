FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# add local code
ADD . ${WORKDIR}

# install npm dependencies
RUN npm install

# run tests
RUN npm test
