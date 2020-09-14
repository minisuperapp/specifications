Feature: Get Today Orders As Customer

  Background:
    Given Customer access the application
    And Customer adds a home location
    And Deliverer 'D1' registers and logs in
    And Deliverer 'D1' publishes a new offer for product 'tortillas_de_maiz' with price '18.50'
    And Deliverer 'D2' registers and logs in
    And Deliverer 'D2' publishes a new offer for product 'RED_APPLE' with price '20.50'

  Scenario: Get An Orders From A Deliverer
    Given Customer places an order using offer from deliverer 'D1' with quantity '1'
    When Customer sends request to get latest orders
    Then Customer should receive successful response
    And Customer should receive 1 pending order from deliverer 'D1'

  Scenario: Get Orders From 2 Deliverers
    Given Customer places an order using offer from deliverer 'D1' with quantity '1'
    And Customer places an order using offer from deliverer 'D2' with quantity '1'
    When Customer sends request to get latest orders
    Then Customer should receive successful response
    And Customer should receive 2 pending orders
