Feature: Deliverer Login

  Background:
    Given Deliverer 'D1' registers with email 'd1@minisuper.app' and password 'secret1'

  Scenario: Successful login
    When Deliverer 'D1' logs in with email 'd1@minisuper.app' and password 'secret1'
    Then Deliverer should receive successful response

  Scenario: Wrong password
    When Deliverer 'D1' logs in with email 'd1@minisuper.app' and password 'secret2'
    Then Deliverer should receive unsuccessful response
    And Deliverer should receive single error message with property '' and message 'incorrect.credentials'
