Feature: Assign Best Offer

Background:
  Given Deliverer 'D1' registers with phone number '6481095678', name 'Alonso Ayala', and then and logs in
  And Deliverer 'D2' registers with phone number '6481107823' and logs in

Scenario: Assign Lowest-Price Offer
  Given Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA'
  When Customer sends request to assign best offer for product 'CORN_TORTILLA'
  Then Customer should receive successful response
  And the offer should have an id, and unit price
  And the offer should have the deliverer reputation, and last rating
  And the deliverer name should be 'Alonso Ayala'
