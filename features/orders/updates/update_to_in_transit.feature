Feature: Update Order To In Transit

  Background:
    Given Customer access the application
    And Customer adds a home location
    And Deliverer 'D1' registers and logs in
    And Deliverer 'D1' publishes a new offer for product 'tortillas_de_maiz' with price '18.50'

  Scenario: Update Order To In Transit
    Given Customer places an order using offer from deliverer 'D1' with quantity '2'
    When Deliverer 'D1' updates last placed order to -in transit-
    Then Deliverer should receive successful response

  Scenario: Notify Order Status Updated To In-Transit
    Given Customer places an order using offer from deliverer 'D1' with quantity '2'
    And Customer subscribes to get order updates
    When Deliverer 'D1' updates last placed order to -in transit-
    Then Customer should see order status as 'IN_TRANSIT'

  Scenario: Do Not Notify Order Status Updated To In-Transit If Customer Disconnected Subscription
    Given Customer places an order using offer from deliverer 'D1' with quantity '2'
    And Customer subscribes to get order updates
    And Customer disconnects subscription for updates
    When Deliverer 'D1' updates last placed order to -in transit-
    Then Customer should see order status as 'PLACED'
