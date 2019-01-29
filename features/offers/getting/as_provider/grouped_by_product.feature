Feature: Get Offers Grouped By Product As Provider

  Background:
    Given Deliverer 'D1' registers with phone number '6481095678' and logs in

  Scenario: Get Just-Published Offer
    Given Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA' with price '20.00'
    When Deliverer 'D1' sends request to get published offers