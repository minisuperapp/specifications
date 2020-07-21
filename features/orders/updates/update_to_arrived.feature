Feature: Update Order To In Transit

  Background:
    Given Deliverer 'D1' registers with phone number '6483516383' and logs in
    And Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA' with price '18.50'

  Scenario: Get New Started Order
    Given Customer places an order using offer from deliverer 'D1' with quantity '2' and location '28.1867348', '-105.4608849'
    When Deliverer 'D1' updates last placed order to -arrived-
    Then Deliverer should receive successful response

  Scenario: Notify Order Status Updated To Arrived
    Given Customer places an order using offer from deliverer 'D1' with quantity '2' and location '28.1867348', '-105.4608849'
    And Customer subscribes to get order updates
    When Deliverer 'D1' updates last placed order to -arrived-
    Then Customer should see order status as 'ARRIVED'


  Scenario: Do Not Notify Order Status Updated To Arrived If Customer Disconnected Subscription
    Given Customer places an order using offer from deliverer 'D1' with quantity '2' and location '28.1867348', '-105.4608849'
    And Customer subscribes to get order updates
    And Deliverer 'D1' updates last placed order to -in transit-
    And Customer disconnects subscription for updates
    When Deliverer 'D1' updates last placed order to -arrived-
    Then Customer should see order status as 'IN_TRANSIT'
