# Contributing

This project was created primarily for demo purposes during the [SIGNAL 2021 Developer Spotlight Session](https://signal.twilio.com/sessions/647473). It's **not actively maintained**. You are welcome to fork the repo and play around with it.

## How to set up the project

```bash
git clone git@github.com:twilio/signal2021-devs.git
cd signal2021-devs
npm install
cp .env.example .env
# fill out the .env file
npm run build
```

## Run local server

```bash
npm start
```

## Run the CI test suite

```bash
npm run ci:test
```

## Provision resources using Terraform and deploy

Prerequisites: 
- set `TWILIO_ACCOUNT_SID`, `TWILIO_API_KEY` and `TWILIO_API_SECRET` as environment variables in your system.
- Install the Terraform CLI and log into Terraform workspace
- Change the workspace in the `main.tf` file

```bash
terraform apply
npm run deploy
```