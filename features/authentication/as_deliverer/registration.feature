Feature: Deliverer Registration

  Scenario: Successful registration as deliverer
    When Deliverer 'D1' registers with name 'Alonso Ayala', email 'd1@minisuper.app', and password 'secret1'
    Then Customer should receive successful response

  Scenario: Register with existing email
    Given Deliverer 'D1' registers with email 'd1@minisuper.app' and password 'secret1'
    When Deliverer 'D1' registers with email 'd1@minisuper.app' and password 'secret2'
    Then Deliverer should receive unsuccessful response
    And Deliverer should receive single error message with property 'email' and message 'existing'
