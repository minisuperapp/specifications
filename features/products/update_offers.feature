Feature: Update Offers

Background:
  Given Deliverer 'D1' registers with phone number '6481095678' and logs in

Scenario: Add One Product Offer
  Given Customer sends request to get products and offers
  When Deliverer 'D1' adds a new offer for product 'CORN_TORTILLA'
  Then Customer should see 1 offer(s) for product 'CORN_TORTILLA'

Scenario: Do Not Add Product Offer If Offer Is Outside Deliverer's Radius
  Given Customer sends request to get products and offers with location '28.2007644', '-105.4870049'
  When Deliverer 'D1' adds a new offer for product 'CORN_TORTILLA' with location '28.1924005', '-105.4676839' and delivery radius of 3 KM
  Then Customer should see 0 offer(s) for product 'CORN_TORTILLA'
