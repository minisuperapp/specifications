Feature: Get Offers Grouped By Product

Background:
  Given Deliverer 'D1' registers with phone number '6481095678' and logs in
  And Deliverer 'D2' registers with phone number '6481107823' and logs in

Scenario: Get Offer For One Product
  Given Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA' with price '20.00'
  When Customer sends request to get offers grouped by product
  Then Customer should receive successful response
  And Customer should receive 1 offer(s) for product 'CORN_TORTILLA'
  And Customer should receive estimated price of '20.00' for product 'CORN_TORTILLA'
  And Customer should receive zero offers for product 'RED_APPLE'

Scenario: Get Two Offers For One Product
  Given Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA'
  And Deliverer 'D2' publishes a new offer for product 'CORN_TORTILLA'
  When Customer sends request to get offers grouped by product
  Then Customer should receive successful response
  And Customer should receive 2 offer(s) for product 'CORN_TORTILLA'
