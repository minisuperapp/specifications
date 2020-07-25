Feature: Update Order To In Transit

  Background:
    Given Deliverer 'D1' registers with phone number '6483516383' and logs in
    And Deliverer 'D1' publishes a new offer for product 'tortillas_de_maiz' with price '18.50'

  Scenario: Update Order To Delivered
    Given Customer places an order using offer from deliverer 'D1' with quantity '2' and location '28.1867348', '-105.4608849'
    When Deliverer 'D1' updates last placed order to -delivered-
    Then Deliverer should receive successful response

  Scenario: Notify Order Status Updated To Delivered
    Given Customer places an order using offer from deliverer 'D1' with quantity '2' and location '28.1867348', '-105.4608849'
    And Customer subscribes to get order updates
    When Deliverer 'D1' updates last placed order to -delivered-
    Then Customer should see order status as 'DELIVERED'

  Scenario: Do Not Notify Order Status Updated To Delivered If Customer Disconnected Subscription
    Given Customer places an order using offer from deliverer 'D1' with quantity '2' and location '28.1867348', '-105.4608849'
    And Customer subscribes to get order updates
    And Deliverer 'D1' updates last placed order to -arrived-
    And Customer disconnects subscription for updates
    When Deliverer 'D1' updates last placed order to -delivered-
    Then Customer should see order status as 'ARRIVED'
