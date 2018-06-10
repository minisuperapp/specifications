Feature: Change Deliverer Availability

Background:
  Given Deliverer 'D1' registers with phone number '6481095678' and logs in

Scenario: Deliverer Changes Availability False
  When Deliverer 'D1' changes availability to 'false'
  Then Deliverer should receive successful response
