terraform {
  required_providers {
    twilio = {
      source  = "twilio/twilio"
      version = "0.8.1"
    }
  }

  backend "remote" {
    organization = "twilio-demos"

    workspaces {
      name = "talon-1"
    }
  }
}

provider "twilio" {
  # Configuration options
}

resource "twilio_serverless_services_v1" "service" {
  friendly_name       = "Talon Mission"
  unique_name         = "talon-mission"
  include_credentials = true
}

resource "twilio_serverless_services_environments_v1" "environment" {
  service_sid   = twilio_serverless_services_v1.service.sid
  unique_name   = "stage-environment"
  domain_suffix = "stage"
}

locals {
  base_domain        = "${twilio_serverless_services_v1.service.unique_name}-1424-${twilio_serverless_services_environments_v1.environment.domain_suffix}.twil.io"
  base_functions_url = "https://${local.base_domain}"
  sms_webhook_url    = "${local.base_functions_url}/incoming-sms"
}

resource "twilio_api_accounts_incoming_phone_numbers_v2010" "phone_number" {
  area_code     = "415"
  friendly_name = "Talon 1 Phone Number"
  sms_url       = local.sms_webhook_url
  voice_url     = null
}

resource "twilio_messaging_services_v1" "service" {
  friendly_name                 = "Talon 1 Messaging Service"
  use_inbound_webhook_on_number = false
}

resource "twilio_messaging_services_phone_numbers_v1" "number" {
  service_sid      = twilio_messaging_services_v1.service.sid
  phone_number_sid = twilio_api_accounts_incoming_phone_numbers_v2010.phone_number.sid
}

resource "twilio_verify_services_v2" "service" {
  friendly_name = "Talon 1"
}

resource "twilio_notify_services_v1" "service" {
  friendly_name = "Talon 1 Notify Service"
  messaging_service_sid= twilio_messaging_services_v1.sid
}

output "notifyServiceSid" {
  value = twilio_notify_services_v1.service.sid
}

output "serverlessService" {
  value     = twilio_serverless_services_v1.service.sid
  sensitive = true
}

output "serverlessEnvironmentSuffix" {
  value     = twilio_serverless_services_environments_v1.environment.domain_suffix
  sensitive = true
}

output "serverlessEnvironment" {
  value     = twilio_serverless_services_environments_v1.environment.sid
  sensitive = true
}

output "twilioNumber" {
  value     = twilio_api_accounts_incoming_phone_numbers_v2010.phone_number.phone_number
  sensitive = true
}

output "verifyServiceSid" {
  value     = twilio_verify_services_v2.service.sid
  sensitive = true
}
