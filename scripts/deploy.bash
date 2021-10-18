#!/bin/bash

shopt -s expand_aliases

SERVICE_SID=$(terraform output -raw serverlessService)
TWILIO_PHONE_NUMBER=$(terraform output -raw twilioNumber)
VERIFY_SERVICE_SID=$(terraform output -raw verifyServiceSid)
SERVERLESS_ENVIRONMENT=$(terraform output -raw serverlessEnvironment)
BROADCAST_NOTIFY_SERVICE_SID=`terraform output -raw notifyServiceSid`

npm run build
npx twilio-run deploy \
  --username "$TWILIO_API_KEY" \
  --password "$TWILIO_API_SECRET" \
  --service-sid "$SERVICE_SID" \
  --environment "$SERVERLESS_ENVIRONMENT" \
  --env .env.example \
  --load-system-env

alias env-set='npx twilio-run env set --username "$TWILIO_API_KEY" --password "$TWILIO_API_SECRET" --service-sid "$SERVICE_SID" --environment "$SERVERLESS_ENVIRONMENT"'

env-set --key PASSCODE --value $PASSCODE
env-set --key TWILIO_PHONE_NUMBER --value $TWILIO_PHONE_NUMBER
env-set --key VERIFY_SERVICE_SID --value $VERIFY_SERVICE_SID
env-set --key BROADCAST_NOTIFY_SERVICE_SID --value $BROADCAST_NOTIFY_SERVICE_SID