Feature: Customer Login

Background:
  Given Customer registers with phone number '6483516383'

Scenario: Successful login
  When Customer logs in with phone number '6483516383'
  Then Customer should receive successful response

Scenario: Wrong phone number
  When Customer logs in with phone number '6394516222'
  Then Customer should receive unsuccessful response
