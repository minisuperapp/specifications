Feature: Deliverer Registration

Scenario: Successful registration as deliverer
  When Deliverer 'A' registers with phone number '6623471507' and password 'secret1'
  Then Customer should receive successful response
