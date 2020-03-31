Feature: Customer Login

  Background:
    Given Customer registers with phone number '6483516383'

  Scenario: Successful login
    When Customer logs in with phone number '6483516383'
    Then Customer should receive successful response
    And Customer should receive session token

  Scenario: Wrong phone number
    When Customer logs in with phone number '6394516222'
    Then Customer should receive unsuccessful response
    And Customer should receive single error message with property 'phone_number' and message 'not.found'
