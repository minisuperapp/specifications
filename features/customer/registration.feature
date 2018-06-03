Feature: Customer Registration

Scenario: Successful registration as customer
  When Customer registers with phone number '6623471507'
  Then Customer should receive successful response
