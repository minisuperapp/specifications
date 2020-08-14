Feature: Order Placement

  Background:
    Given Customer access the application
    And Customer adds a home location
    And Deliverer 'D1' registers and logs in
    And Deliverer 'D1' publishes a new offer for product 'tortillas_de_maiz' with price '18.50'

  Scenario: Place An Order Successfully
    Given Customer sends request to get offers for product 'tortillas_de_maiz'
    When Customer places an order using offer from deliverer 'D1' with quantity '2' and home location
    Then Customer should receive successful response
    And Customer should receive an order with non empty id
    And Customer should receive an order with total '37'
    And Customer should receive an order with status 'PLACED'

  Scenario: Place An Order Reduces Availability
    Given Customer sends request to get offers for product 'tortillas_de_maiz'
    And Customer places an order using offer from deliverer 'D1' with quantity '2' and home location
    When Deliverer 'D1' sends request to get published offers
    Then Deliverer 'D1' should get 1 offer for product 'tortillas_de_maiz' with available quantity 6

  Scenario: Notify Order Placing
    Given Customer sends request to get offers for product 'tortillas_de_maiz'
    And Deliverer 'D1' subscribes to get order placements notifications
    When Customer places an order using offer from deliverer 'D1' with quantity '2' and home location
    Then Deliverer 'D1' should receive a pending delivery for product 'tortillas_de_maiz' with last placed order id

  Scenario: Do Not Notify Order Placing If Deliverer Disconnected Subscription
    Given Customer sends request to get offers for product 'tortillas_de_maiz'
    And Deliverer 'D1' subscribes to get order placements notifications
    And Deliverer 'D1' disconnects to get order placements notifications
    When Customer places an order using offer from deliverer 'D1' with quantity '2' and home location
    Then Deliverer 'D1' should see zero pending deliveries

    Scenario: Place An Order Without Customer Location
    Given Customer sends request to get offers for product 'tortillas_de_maiz'
    And Customer places an order using offer from deliverer 'D1' with quantity '2' and no location
    When Customer should receive unsuccessful response

  Scenario: Place An Order Using The Home Location
    Given Customer sends request to get offers for product 'tortillas_de_maiz'
    And Customer adds a location with the following info
      |name|is_home|street|number|apartment_number|city|neighborhood|postal_code|state|
      |Casa|true   |Benito Juarez|123|10           |Delicias|Centro|33000    |Chihuahua|
    And Customer places an order using offer from deliverer 'D1' with quantity '2'
    When Deliverer 'D1' sends request to receive started orders pending to deliver
    Then Deliverer should receive an order with this customer location
      |street|number|apartment_number|neighborhood|
      |Benito Juarez|123|10           |Centro  |
