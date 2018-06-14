Feature: Customer Login

Background:
  Given Customer registers with phone number '6483516383'

Scenario: Successful login
  When Customer logs in with phone number '6483516383' and password 'secret1'
  Then Customer should receive successful response
