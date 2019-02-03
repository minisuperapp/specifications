Feature: Get Published Offers From A Deliverer

  Background:
    Given Deliverer 'D1' registers with phone number '6481095678' and logs in

  Scenario: Get Just-Published Offer
    Given Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA' with price '20.00'
    When Deliverer 'D1' sends request to get published offers
    Then Deliverer 'D1' should get 1 offer for product 'CORN_TORTILLA' with price '20.00'