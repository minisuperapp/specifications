Feature: Assign Best Offer

  Background:
    Given Deliverer 'D1' registers with phone number '6481095678', name 'Juan', and then and logs in
    And Deliverer 'D2' registers with phone number '6391213489', name 'Maria', and then and logs in

  Scenario: Assign Lowest-Price Offer
    Given Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA' with price '20.99'
    And Deliverer 'D2' publishes a new offer for product 'CORN_TORTILLA' with price '19.99'
    When Customer sends request to assign best offer for product 'CORN_TORTILLA'
    Then Customer should receive successful response
    And the offer unit price should be '19.99'
    And the offer should have the deliverer reputation, and last rating
    And the deliverer name should be 'Maria'

  Scenario: Reduce Availability Of Assigned Offer
    Given Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA' and available quantity of '2'
    And Customer sends request to assign best offer for product 'CORN_TORTILLA' with quantity '2'
    When Customer sends request to get offers for product 'CORN_TORTILLA' and quantity '2'
    And Customer should receive zero offers

  Scenario: Try To Assign Offer For Product With No Offers Available
    Given Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA' and available quantity of '1'
    And Customer sends request to assign best offer for product 'CORN_TORTILLA' with quantity '1'
    When Customer sends request to assign best offer for product 'CORN_TORTILLA' with quantity '1'
    Then Customer should receive unsuccessful response
    And Customer should receive single error message with property 'product' and message 'no.offers.available'

  Scenario: Increase Availability Of Canceled Assigned Offer
    Given Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA' and available quantity of '2'
    And Customer sends request to assign best offer for product 'CORN_TORTILLA' with quantity '2'
    And Customer sends request to cancel last assigned offer
    When Customer sends request to get offers for product 'CORN_TORTILLA' and quantity '2'
    And Customer should receive one offer

  Scenario: Do Not Reduce Availability Of Not-Assigned Higher-Price Offer
    Given Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA' with price '20.99' and available quantity of '2'
    Given Deliverer 'D2' publishes a new offer for product 'CORN_TORTILLA' with price '19.99' and available quantity of '2'
    And Customer sends request to assign best offer for product 'CORN_TORTILLA' with quantity '2'
    When Customer sends request to get offers for product 'CORN_TORTILLA' and quantity '2'
    And Customer should receive one offer
    And the offer unit price should be '20.99'
    And the deliverer name should be 'Juan'

  Scenario: Assign Next Lowest-Priced Offer When The Current Lowest-Priced Offer Has Not Enough Availability
    Given Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA' with price '20.99' and available quantity of '2'
    Given Deliverer 'D2' publishes a new offer for product 'CORN_TORTILLA' with price '19.99' and available quantity of '2'
    And Customer sends request to assign best offer for product 'CORN_TORTILLA' with quantity '2'
    And Customer sends request to assign best offer for product 'CORN_TORTILLA' with quantity '1'
    Then Customer should receive successful response
    And the offer unit price should be '20.99'
    And the deliverer name should be 'Juan'
