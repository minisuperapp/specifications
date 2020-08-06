Feature: Order Placement

  Background:
    Given Customer access the application
    And Deliverer 'D1' registers and logs in
    And Deliverer 'D1' publishes a new offer for product 'tortillas_de_maiz' with price '18.50'

  Scenario: Place An Order Successfully
    Given Customer sends request to get offers for product 'tortillas_de_maiz'
    When Customer places an order using offer from deliverer 'D1' with quantity '2' and location '27.670799', '105.1599679'
    Then Customer should receive successful response
    And Customer should receive an order with non empty id
    And Customer should receive an order with total '37'
    And Customer should receive an order with status 'PLACED'

  Scenario: Place An Order Reduces Availability
    Given Customer sends request to get offers for product 'tortillas_de_maiz'
    And Customer places an order using offer from deliverer 'D1' with quantity '2' and location '27.670799', '105.1599679'
    When Deliverer 'D1' sends request to get published offers
    Then Deliverer 'D1' should get 1 offer for product 'tortillas_de_maiz' with available quantity 6

  Scenario: Notify Order Placing
    Given Customer sends request to get offers for product 'tortillas_de_maiz'
    And Deliverer 'D1' subscribes to get order placements notifications
    When Customer places an order using offer from deliverer 'D1' with quantity '2' and location '27.670799', '105.1599679'
    Then Deliverer 'D1' should receive a pending delivery for product 'tortillas_de_maiz' with last placed order id

  Scenario: Do Not Notify Order Placing If Deliverer Disconnected Subscription
    Given Customer sends request to get offers for product 'tortillas_de_maiz'
    And Deliverer 'D1' subscribes to get order placements notifications
    And Deliverer 'D1' disconnects to get order placements notifications
    When Customer places an order using offer from deliverer 'D1' with quantity '2' and location '27.670799', '105.1599679'
    Then Deliverer 'D1' should see zero pending deliveries
