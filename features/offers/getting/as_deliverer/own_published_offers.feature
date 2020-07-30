Feature: Get Own Published Offers

  Background:
    Given Deliverer 'D1' registers with email 'd1@minisuper.app' and logs in

  Scenario: Get Published Offer
    Given Deliverer 'D1' publishes a new offer for product 'tortillas_de_maiz' with price '20.00'
    When Deliverer 'D1' sends request to get published offers
    Then Deliverer 'D1' should get 1 offer for product 'tortillas_de_maiz' with price '20.00'
