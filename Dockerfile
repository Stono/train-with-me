FROM jambr/sn.nodejs:latest

# Install tar
RUN dnf -y update && \
    dnf -y install tar bzip2 && \
    dnf -y clean all

# PhantomJS
ENV PHANTOM_JS phantomjs-2.1.1-linux-x86_64
ENV PHANTOMJS_BIN /usr/local/bin/phantomjs
ENV PATH $PHANTOMJS_BIN:$PATH

RUN wget --quiet https://github.com/Medium/phantomjs/releases/download/v2.1.1/$PHANTOM_JS.tar.bz2 && \
    tar xjf $PHANTOM_JS.tar.bz2 \
    && mv $PHANTOM_JS /usr/local/share \
    && ln -sf /usr/local/share/$PHANTOM_JS/bin/phantomjs /usr/local/bin \
    && rm $PHANTOM_JS.tar.bz2

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
