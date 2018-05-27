Feature: Customer Registration

Scenario: Successful registration as customer
  When I register with phone number '6623471507'
  Then I should receive successful response
