Feature: Order Placement

  Background:
    Given Customer access the application
    And Customer adds a home location
    And Deliverer 'D1' registers and logs in
    And Deliverer 'D1' sends request to set location to '28.1867348', '-105.4608849', '50'
    And Deliverer 'D1' publishes a new offer for product 'tortillas_de_maiz' with price '18.50'
    And Deliverer 'D2' registers and logs in
    And Deliverer 'D2' sends request to set location to '28.1867348', '-105.4608849', '50'
    And Deliverer 'D2' publishes a new offer for product 'red_apple' with price '10.50'

  Scenario: Place An Order Successfully
    Given Customer sends request to get offers for product 'tortillas_de_maiz'
    And Customer sends request to get offers for product 'red_apple'
    When Customer places an order with the following quantities
      |deliverer|quantity|
      |D1       |2       |
      |D2       |2       |
    Then Customer should receive successful response
    And Customer should receive 2 orders
    And Customer should receive an order with total '37'
    And Customer should receive an order with total '21'
    And Customer should receive orders with status 'PLACED'

  Scenario: Place An Order Reduces Availability
    Given Customer sends request to get offers for product 'tortillas_de_maiz'
    And Customer places an order using offer from deliverer 'D1' with quantity '2'
    When Deliverer 'D1' sends request to get published offers
    Then Deliverer 'D1' should get 1 offer for product 'tortillas_de_maiz' with available quantity 6

  Scenario: Notify Order Placing
    Given Customer sends request to get offers for product 'tortillas_de_maiz'
    And Deliverer 'D1' subscribes to get order placements notifications
    When Customer places an order using offer from deliverer 'D1' with quantity '2'
    Then Deliverer 'D1' should receive a pending delivery with last placed order id for product 'tortillas_de_maiz'
    And Deliverer 'D1' should receive an order with customer location street 'Benito Juarez' number '123' and neighborhood 'Centro'

  Scenario: Do Not Notify Order Placing If Deliverer Disconnected Subscription
    Given Customer sends request to get offers for product 'tortillas_de_maiz'
    And Deliverer 'D1' subscribes to get order placements notifications
    And Deliverer 'D1' disconnects to get order placements notifications
    When Customer places an order using offer from deliverer 'D1' with quantity '2'
    Then Deliverer 'D1' should see zero pending deliveries

    Scenario: Place An Order Without Customer Location
    Given Customer sends request to get offers for product 'tortillas_de_maiz'
    And Customer places an order using offer from deliverer 'D1' with quantity '2' and no location
    When Customer should receive unsuccessful response

  Scenario: Place An Order With Not Enough Product Available Quantity
    Given Customer sends request to get offers for product 'tortillas_de_maiz'
    And Customer places an order using offer from deliverer 'D1' with quantity '9'
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
