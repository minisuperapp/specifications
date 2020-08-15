Feature: Change Preferences

  Background:
    Given Deliverer 'D1' registers and logs in

  Scenario: Change Preferences
    When Deliverer 'D1' sends request to change these preferences
      |key|value|
      |ask.location.before.publishing.offer|false|
