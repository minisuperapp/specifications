Feature: Get Offers For All Products As Customer

  Background:
    Given Deliverer 'D1' registers with phone number '6481095678' and logs in
    And Deliverer 'D2' registers with phone number '6481107823' and logs in

  Scenario: Get Offer For One Product
    Given Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA' with price '20.00'
    When Customer sends request to get offers grouped by product
    Then Customer should receive successful response
    And Customer should receive 1 offer(s) for product 'CORN_TORTILLA'
    And Customer should receive lowest unit price of '20.00' for product 'CORN_TORTILLA'
    And Customer should receive estimated time of arrival between 0 and 120 for product 'CORN_TORTILLA'
    And Customer should receive zero offers for product 'RED_APPLE'

  Scenario: Get Two Offers For One Product
    Given Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA' with price '20.00'
    And Deliverer 'D2' publishes a new offer for product 'CORN_TORTILLA' with price '19.99'
    When Customer sends request to get offers grouped by product
    Then Customer should receive successful response
    And Customer should receive 2 offer(s) for product 'CORN_TORTILLA'
    And Customer should receive lowest unit price of '19.99' for product 'CORN_TORTILLA'

  Scenario: Get Only Offers Within Deliverer's Radius For One Product
    Given Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA' with price '20.00' with location '28.1867348', '-105.4608849' and delivery radius of 1 KM
    And Deliverer 'D2' publishes a new offer for product 'CORN_TORTILLA' with price '19.99' with location '28.1867348', '-105.4708849' and delivery radius of 1 KM
    When Customer sends request to get offers grouped by product with location '28.1867348', '-105.4608849'
    Then Customer should receive successful response
    And Customer should receive 1 offer(s) for product 'CORN_TORTILLA'
    And Customer should receive lowest unit price of '20.00' for product 'CORN_TORTILLA'
