
FROM keymetrics/pm2:latest-alpine

# Bundle APP files
COPY src src/
COPY package.json .
COPY yarn.lock .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN yarn install --production

# Expose the listening port of your app
EXPOSE 80

# Show current folder structure in logs
RUN ls -al -R

CMD [ "yarn", "start" ]