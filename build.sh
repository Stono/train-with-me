#!/bin/bash
docker build -t trainwithme/app --build-arg IONIC_EMAIL=$IONIC_EMAIL --build-arg IONIC_PASSWORD=$IONIC_PASSWORD .
