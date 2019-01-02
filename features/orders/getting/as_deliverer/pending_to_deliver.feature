Feature: Get Orders Pending To Deliver As Deliverer

  Background:
    Given Deliverer 'D1' registers with phone number '6483516383' and logs in
    And Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA' with price '18.50'

  Scenario: Get New Started Order
    Given Customer places an order using offer from deliverer 'D1' with quantity '2' and location '28.1867048', '-105.4600849'
    When Deliverer 'D1' sends request to receive started orders pending to deliver
    Then Deliverer should receive successful response
    And Deliverer should receive one order
    And the order should be for product 'CORN_TORTILLA'
    And the order should have quantity '2'
    And the order should have customer location '28.1867048', '-105.4600849'
