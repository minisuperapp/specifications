Feature: Update Offers

Background:
  Given Deliverer 'D1' registers with phone number '6481095678' and logs in

Scenario: Add One Product Offer
  Given Customer sends request to get products and offers
  When Deliverer 'D1' adds a new offer for product 'CORN_TORTILLA'
  Then Customer should see 1 offer(s) for product 'CORN_TORTILLA'

Scenario: Do Not Add Product Offer If Offer Is Outside Deliverer's Radius
  Given Customer sends request to get products and offers with location '28.1867048', '-105.4600849'
  When Deliverer 'D1' adds a new offer for product 'CORN_TORTILLA' with location '28.1924005', '-105.39' and delivery radius of 1 KM
  Then Customer should see zero offers for product 'CORN_TORTILLA'
