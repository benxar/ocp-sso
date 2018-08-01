#!/bin/bash

oc login -u developer

oc project nodejs-eap
oc delete all --selector app=eap-app
oc delete dc/postgresql
oc delete all --selector name=postgresql
oc delete secret credentials
oc delete secret postgresql