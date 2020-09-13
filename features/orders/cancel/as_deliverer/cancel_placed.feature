Feature: Order Placed Order

  Background:
    Given Customer access the application
    And Customer adds a home location
    And Deliverer 'D1' registers and logs in
    And Deliverer 'D1' publishes a new offer for product 'tortillas_de_maiz' with price '18.50'
    And Customer places an order using offer from deliverer 'D1'

  Scenario: Deliverer Cancels A Placed Order
    When Deliverer 'D1' cancels last placed order
    Then Deliverer should receive successful response
