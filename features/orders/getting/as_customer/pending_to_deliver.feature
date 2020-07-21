Feature: Get Orders Pending To Deliver As Customer

  Background:
    Given Deliverer 'D1' registers with phone number '6483516383' and logs in
    And Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA' with price '18.50'
    And Deliverer 'D2' registers with phone number '6483516384' and logs in
    And Deliverer 'D2' publishes a new offer for product 'RED_APPLE' with price '20.50'

  Scenario: Get New Started Order
    Given Customer places an order using offer from deliverer 'D1' with quantity '1' and location '28.1867348', '-105.4608849'
    And Customer places an order using offer from deliverer 'D2' with quantity '1' and location '28.1867348', '-105.4608849'
    When Customer sends request to receive started orders pending to deliver
    Then Customer should receive successful response
    And Customer should receive 2 orders
