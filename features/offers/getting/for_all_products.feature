Feature: Get Offers For All Products

Background:
  Given Deliverer 'D1' registers with phone number '6481095678' and logs in
  And Deliverer 'D2' registers with phone number '6481107823' and logs in

Scenario: Get Offers For All Products
  Given Deliverer 'D1' adds a new offer for product 'CORN_TORTILLA'
  When Customer sends request to get all products offers
  Then Customer should receive successful response
