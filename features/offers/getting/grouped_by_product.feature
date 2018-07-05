Feature: Get Offers Grouped By Product

Background:
  Given Deliverer 'D1' registers with phone number '6481095678' and logs in
  And Deliverer 'D2' registers with phone number '6481107823' and logs in

Scenario: Get Product With One Offer
  Given Deliverer 'D1' adds a new offer for product 'CORN_TORTILLA'
  When Customer sends request to get offers by product
  Then Customer should receive successful response
  And Customer should receive one offer for product 'CORN_TORTILLA'
  And Customer should receive zero offers for product 'RED_APPLE'
