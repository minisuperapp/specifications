Feature: Get Ranked Offers For A Selected Product

Background:
  Given Deliverer 'D1' registers with phone number '6481095678', name 'Alonso Ayala', and then and logs in
  And Deliverer 'D2' registers with phone number '6481107823' and logs in

Scenario: Get Available Offer For 1 Product
  Given Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA'
  When Customer sends request to get offers for product 'CORN_TORTILLA'
  Then Customer should receive successful response
  And Customer should receive one offer
  And the offer should have an id, and price
  And the offer should have the deliverer reputation, and last rating
  And the deliverer name should be 'Alonso Ayala'

Scenario: Get No Offers For A Product Not Yet Offered
  Given Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA'
  When Customer sends request to get offers for product 'RED_APPLE'
  Then Customer should receive successful response
  And Customer should receive zero offers

Scenario: Get No Offer From Deliverer Outside Geo-Radius
  Given Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA' with location '28.1924005', '-105.4676839' and delivery radius of 1 KM
  When Customer sends request to get offers for product 'CORN_TORTILLA' with location '28.2007644', '-105.4870049'
  Then Customer should receive successful response
  And Customer should receive zero offers

Scenario: Get Offer From Deliverer Within Geo-Radius
  Given Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA' with location '28.1924005', '-105.4676839' and delivery radius of 3 KM
  When Customer sends request to get offers for product 'CORN_TORTILLA' with location '28.2007644', '-105.4870049'
  Then Customer should receive successful response
  And Customer should receive one offer

Scenario: Get Offer From Deliverer Who Just Got Within Geo-Radius
  Given Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA' with location '28.1924005', '-105.4676839' and delivery radius of 2 KM
  And Customer sends request to get offers for product 'CORN_TORTILLA' with location '28.2007644', '-105.4870049'
  Then Customer should receive zero offers
  When Deliverer 'D1' updates offer location to '28.1924005', '-105.4776839'
  And Customer sends request to get offers for product 'CORN_TORTILLA' with location '28.2007644', '-105.4870049'
  Then Customer should receive one offer

Scenario: Get Offers From Multiple Deliverers Within Geo-Radius
  Given Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA' with location '28.1924005', '-105.4676839' and delivery radius of 3 KM
  And Deliverer 'D2' publishes a new offer for product 'CORN_TORTILLA' with location '28.1924005', '-105.4676839' and delivery radius of 3 KM
  When Customer sends request to get offers for product 'CORN_TORTILLA' with location '28.1907644', '-105.4970049'
  Then Customer should receive successful response
  And Customer should receive 2 offers

Scenario: Get No Offers for Product Which Available Quantity Was Reduced
  Given Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA' and available quantity of '2'
  And Customer sends request to get offers for product 'CORN_TORTILLA'
  And Customer places order using offer from deliverer 'D1'
  When Customer sends request to get offers for product 'CORN_TORTILLA' and quantity '2'
  And Customer should receive zero offers