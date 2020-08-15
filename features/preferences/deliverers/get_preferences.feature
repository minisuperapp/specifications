Feature: Get Preferences

  Background:
    Given Deliverer 'D1' registers and logs in

  Scenario: Get List Of Preferences
    When Deliverer 'D1' sends request to get preferences
    Then Deliverer should receive preferences with these keys
    |key|
    |ask.location.before.publishing.offer|
