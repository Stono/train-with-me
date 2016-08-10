FROM jambr/sn.nodejs:latest
RUN npm install -g gulp ionic@beta cordova

COPY package.json /app/
RUN npm install

COPY . /app/

ARG IONIC_EMAIL=
ARG IONIC_PASSWORD=
RUN ionic login -e $IONIC_EMAIL -p $IONIC_PASSWORD
RUN gulp build

CMD ["/bin/true"]
