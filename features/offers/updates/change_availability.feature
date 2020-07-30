Feature: Change Deliverer Availability

  Background:
    Given Deliverer 'D1' registers and logs in

  Scenario: Deliverer Changes Availability True
    When Deliverer 'D1' changes availability to true
    Then Deliverer should receive successful response
