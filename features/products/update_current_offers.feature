Feature: Update Current Offers

Background:
  Given Deliverer 'D1' registers with phone number '6481095678' and logs in

Scenario: Get Products
  Given Customer sends request to get products and offers
  When Deliverer 'D1' adds a new offer for product 'CORN_TORTILLA'
  Then Customer should see 1 offer(s) for product 'CORN_TORTILLA'
