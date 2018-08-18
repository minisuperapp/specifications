Feature: Deliverer Login

  Background:
    Given Deliverer 'D1' registers with phone number '6483516383' and password 'secret1'

  Scenario: Successful login
    When Deliverer 'D1' logs in with phone number '6483516383' and password 'secret1'
    Then Deliverer should receive successful response
    And Deliverer should receive session token

  Scenario: Wrong password
    When Deliverer 'D1' logs in with phone number '6483516383' and password 'secret2'
    Then Deliverer should receive unsuccessful response
    And Deliverer should receive single error message with property '' and message 'incorrect.credentials'
