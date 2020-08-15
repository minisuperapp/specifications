Feature: Change Preferences

  Background:
    Given Deliverer 'D1' registers and logs in

  Scenario: Change A Single Preference
    Given Deliverer 'D1' sends request to change these preferences
      |key|value|
      |ask.location.before.publishing.offer|false|
    When Deliverer 'D1' sends request to get preferences
    Then Deliverer should receive preferences with these keys and values
      |key|value|
      |ask.location.before.publishing.offer|false|

  Scenario: A Change In A Single Preference Does Not Affect Others
    Given Deliverer 'D1' sends request to change these preferences
      |key|value|
      |other.preference|false|
    When Deliverer 'D1' sends request to get preferences
    Then Deliverer should receive preferences with these keys and values
      |key|value|
      |ask.location.before.publishing.offer|true|
