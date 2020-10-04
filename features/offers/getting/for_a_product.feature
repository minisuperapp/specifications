Feature: Get Offers List For A Specific Product

  Background:
    Given Deliverer 'D1' registers with email 'd1@minisuper.app', name 'Alonso Ayala', and then and logs in
    And Deliverer 'D1' sends request to set location to '28.1867348', '-105.4608849'
    And Deliverer 'D2' registers and logs in
    And Deliverer 'D2' sends request to set location to '28.1867348', '-105.4608849'
    And Customer access the application
    And Customer sends request to set location to '28.1867348', '-105.4608849'

  Scenario: Get Available Offer For 1 Product
    Given Deliverer 'D1' publishes a new offer for product 'tortillas_de_maiz'
    When Customer sends request to get offers for product 'tortillas_de_maiz'
    Then Customer should receive successful response
    And Customer should receive one offer
    And all offers should have an id, and price
    And all offers should have the deliverer reputation
    And the deliverer name should be 'Alonso Ayala'

  Scenario: Get No Offers For A Product Not Yet Offered
    Given Deliverer 'D1' publishes a new offer for product 'tortillas_de_maiz'
    When Customer sends request to get offers for product 'RED_APPLE'
    Then Customer should receive successful response
    And Customer should receive zero offers

  Scenario: Get No Offer From Deliverer Outside Geo-Radius
    Given Deliverer 'D1' sends request to set location to '28.1924005', '-105.4676839'
    And Deliverer 'D1' publishes a new offer for product 'tortillas_de_maiz'
    When Customer sends request to get offers for product 'tortillas_de_maiz'
    Then Customer should receive successful response
    And Customer should receive zero offers

  Scenario: Get Offer From Deliverer Within Geo-Radius
    Given Deliverer 'D1' sends request to set location to '28.1867345', '-105.4659839'
    And Deliverer 'D1' publishes a new offer for product 'tortillas_de_maiz'
    When Customer sends request to get offers for product 'tortillas_de_maiz'
    Then Customer should receive successful response
    And Customer should receive one offer

  Scenario: Get Offer From Deliverer Who Just Got Within Geo-Radius
    Given Deliverer 'D1' sends request to set location to '28.1924005', '-105.4660839'
    And Deliverer 'D1' publishes a new offer for product 'tortillas_de_maiz'
    And Customer sends request to get offers for product 'tortillas_de_maiz'
    Then Customer should receive zero offers
    When Deliverer 'D1' sends request to set location to '28.1867345', '-105.4646839'
    And Customer sends request to get offers for product 'tortillas_de_maiz'
    Then Customer should receive one offer

  Scenario: Get Offers From Multiple Deliverers Within Geo-Radius
    Given Deliverer 'D1' sends request to set location to '28.1867345', '-105.4659839'
    Given Deliverer 'D1' publishes a new offer for product 'tortillas_de_maiz'
    Given Deliverer 'D2' sends request to set location to '28.1867345', '-105.4659839'
    And Deliverer 'D2' publishes a new offer for product 'tortillas_de_maiz'
    When Customer sends request to get offers for product 'tortillas_de_maiz'
    Then Customer should receive successful response
    And Customer should receive 2 offers

  Scenario: Getting Offer Even When Does Not Have Enough Available Quantity
    Given Deliverer 'D1' publishes a new offer for product 'tortillas_de_maiz' and available quantity of '1'
    When Customer sends request to get offers for product 'tortillas_de_maiz' and quantity '2'
    And Customer should receive one offer
