Feature: Assign Best Offer

  Background:
    Given Deliverer 'D1' registers with phone number '6481095678', name 'Juan', and then and logs in
    And Deliverer 'D2' registers with phone number '6391213489', name 'Maria', and then and logs in

  Scenario: Assign Lowest-Price Offer
    Given Deliverer 'D1' publishes a new offer for product 'tortillas_de_maiz' with price '20.99'
    And Deliverer 'D2' publishes a new offer for product 'tortillas_de_maiz' with price '19.99'
    When Customer sends request to assign best offer for product 'tortillas_de_maiz'
    Then Customer should receive successful response
    And the offer unit price should be '19.99'
    And the offer should have the deliverer reputation
    And the deliverer name should be 'Maria'
