Feature: Get Own Published Offers

  Background:
    Given Deliverer 'D1' registers and logs in
    And Deliverer 'D1' sends request to set location to '28.1867348', '-105.4608849', '50'

  Scenario: Get Published Offer
    Given Deliverer 'D1' publishes a new offer for product 'tortillas_de_maiz' with price '20.00'
    When Deliverer 'D1' sends request to get published offers
    Then Deliverer 'D1' should get 1 offer for product 'tortillas_de_maiz' with price '20.00'
