FROM jambr/sn.nodejs:latest

# Install our required dependencies
RUN npm install -g gulp ionic@2.0.0-beta.36 cordova@6.3.0

# Login to Ionic
ARG IONIC_EMAIL=
ARG IONIC_PASSWORD=
RUN cordova telemetry off
RUN ionic login -e $IONIC_EMAIL -p $IONIC_PASSWORD

# Cache package json changes
COPY package.json /app/
RUN npm install

# Copy our app
COPY . /app/

# Build the deployment
RUN gulp build

CMD ["/bin/true"]
