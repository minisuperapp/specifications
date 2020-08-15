Feature: Get Preferences

  Background:
    Given Deliverer 'D1' registers and logs in

  Scenario: Get Preferences With Default Values
    When Deliverer 'D1' sends request to get preferences
    Then Deliverer should receive preferences with these keys and values
    |key|value|
    |ask.location.before.publishing.offer|true|

  Scenario: Change A Preference
