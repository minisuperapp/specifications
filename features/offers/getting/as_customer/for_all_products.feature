Feature: Get Offers For All Products As Customer

  Background:
    Given Deliverer 'D1' registers and logs in
    And Deliverer 'D2' registers and logs in
    And Customer access the application
    And Customer sends request to set location to '28.1867348', '-105.4608849'

  Scenario: Get Offer For One Product
    Given Deliverer 'D1' publishes a new offer for product 'tortillas_de_maiz' with price '20.00'
    When Customer sends request to get offers grouped by product
    Then Customer should receive successful response
    And Customer should receive 1 offers for product 'tortillas_de_maiz'
    And Customer should receive lowest unit price of '20.00' for product 'tortillas_de_maiz'
    And Customer should receive estimated time of arrival between 0 and 120 for product 'tortillas_de_maiz'
    And Customer should receive zero offers for product 'RED_APPLE'

  Scenario: Get Two Offers For One Product
    Given Deliverer 'D1' publishes a new offer for product 'tortillas_de_maiz' with price '20.00'
    And Deliverer 'D2' publishes a new offer for product 'tortillas_de_maiz' with price '19.99'
    When Customer sends request to get offers grouped by product
    Then Customer should receive successful response
    And Customer should receive 2 offers for product 'tortillas_de_maiz'
    And Customer should receive lowest unit price of '19.99' for product 'tortillas_de_maiz'

  Scenario: Get Only Offers Within Deliverer's Radius For One Product
    Given Deliverer 'D1' publishes a new offer for product 'tortillas_de_maiz' with price '20.00' with location '28.1867348', '-105.4608849' and delivery radius of 100 M
    And Deliverer 'D2' publishes a new offer for product 'tortillas_de_maiz' with price '19.99' with location '29.1867348', '-106.4708849' and delivery radius of 50 M
    And Customer sends request to set location to '28.1867348', '-105.4608849'
    When Customer sends request to get offers grouped by product
    Then Customer should receive successful response
    And Customer should receive 1 offers for product 'tortillas_de_maiz'
    And Customer should receive lowest unit price of '20.00' for product 'tortillas_de_maiz'

  Scenario: Get Only Offers From Available Deliverers
    Given Deliverer 'D1' publishes a new offer for product 'tortillas_de_maiz' with price '20.00'
    And Deliverer 'D2' publishes a new offer for product 'tortillas_de_maiz' with price '19.99'
    And Deliverer 'D2' sends request to change these preferences
      |key|value|
      |available|false|
    When Customer sends request to get offers grouped by product
    Then Customer should receive successful response
    And Customer should receive 1 offers for product 'tortillas_de_maiz'
    And Customer should receive lowest unit price of '20.00' for product 'tortillas_de_maiz'

  Scenario: Get Offers From Deliverer That Just Got Available
    Given Deliverer 'D1' publishes a new offer for product 'tortillas_de_maiz' with price '20.00'
    And Deliverer 'D2' publishes a new offer for product 'tortillas_de_maiz' with price '19.99'
    And Deliverer 'D2' sends request to change these preferences
      |key|value|
      |available|false|
    And Deliverer 'D2' sends request to change these preferences
      |key|value|
      |available|true|
    When Customer sends request to get offers grouped by product
    Then Customer should receive successful response
    And Customer should receive 2 offers for product 'tortillas_de_maiz'
    And Customer should receive lowest unit price of '19.99' for product 'tortillas_de_maiz'
