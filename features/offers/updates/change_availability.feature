Feature: Change Deliverer Availability

  Background:
    Given Deliverer 'D1' registers with phone number '6481095678' and logs in

  Scenario: Deliverer Changes Availability True
    When Deliverer 'D1' changes availability to true
    Then Deliverer should receive successful response
