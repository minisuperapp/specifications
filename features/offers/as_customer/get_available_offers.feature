Feature: Get Available Offers As Customer

Background:
  Given Deliverer 'D1' registers with phone number '6483516383' and password 'secret1'
  And Deliverer 'D1' logs in with phone number '6483516383' and password 'secret1'
  And Deliverer 'D2' logs in with phone number '6484627494' and password 'secret2'
  And Deliverer 'D2' logs in with phone number '6484627494' and password 'secret2'

Scenario: Get Available Offer for 1 product
  Given Deliverer 'D1' adds a new offer for product '1'
  When Customer sends request to get offers for product '1'
  Then Customer should receive successful response
  And Customer should receive one offer
  And the offer should have an id, price, and estimated arrival time
  And the offer should have the deliverer name, reputation, and last rating

Scenario: Get No Offers For A Product Not Yet Offered
  Given Deliverer 'D1' adds a new offer for product '1'
  When Customer sends request to get offers for product '2'
  Then Customer should receive successful response
  And Customer should receive zero offers

Scenario: Get No Offer From Deliverer Outside Geo-Radius
  Given Deliverer 'D1' adds a new offer for product '1' with location '28.1924005', '-105.4676839' and delivery radius of 1 KM
  When Customer sends request to get offers for product '1' with location '28.2007644', '-105.4870049'
  Then Customer should receive successful response
  And Customer should receive zero offers

Scenario: Get Offer From Deliverer Within Geo-Radius
  Given Deliverer 'D1' adds a new offer for product '1' with location '28.1924005', '-105.4676839' and delivery radius of 3 KM
  When Customer sends request to get offers for product '1' with location '28.2007644', '-105.4870049'
  Then Customer should receive successful response
  And Customer should receive one offer

Scenario: Get Offer From Deliverer Who Just Got Within Geo-Radius
  Given Deliverer 'D1' adds a new offer for product '1' with location '28.1924005', '-105.4676839' and delivery radius of 2 KM
  And Customer sends request to get offers for product '1' with location '28.2007644', '-105.4870049'
  Then Customer should receive zero offers
  When Deliverer 'D1' updates offer location to '28.1924005', '-105.4776839'
  Then Customer should receive one offer

Scenario: Get Offers From Multiple Deliverers Within Geo-Radius
  Given Deliverer 'D1' adds a new offer for product '1' with location '28.1924005', '-105.4676839' and delivery radius of 3 KM
  And Deliverer 'D2' adds a new offer for product '1' with location '28.1924005', '-105.4676839' and delivery radius of 3 KM
  When Customer sends request to get offers for product '1' with location '28.1907644', '-105.4970049'
  Then Customer should receive successful response
  And Customer should receive 2 offers
