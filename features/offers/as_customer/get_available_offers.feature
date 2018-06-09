Feature: Get Available Offers As Customer

Background:
  Given Deliverer 'A' registers with phone number '6483516383' and password 'secret1'
  And Deliverer 'A' logs in with phone number '6483516383' and password 'secret1'

Scenario: Get Available Offer for 1 product
  Given Deliverer 'A' adds a new offer for product 1
  When Customer send request to get offers for product 1
  Then Customer should receive successful response
  And Customer should receive one offer
  And the offer should have an id, price, and estimated arrival time
  And the offer should have the deliverer name, reputation, and last rating

Scenario: Get No Offers For A Product Not Yet Offered
  Given Deliverer 'A' adds a new offer for product 1
  When Customer send request to get offers for product 2
  Then Customer should receive successful response
  And Customer should receive zero offers

Scenario: Get No Offers From Deliverers Outside Geo-Radius
  Given Deliverer 'A' adds a new offer for product 1 with location '28.1924005', '-105.4676839' and delivery radius of 1 KM
  When Customer send request to get offers for product 1 with location '28.2007644', '-105.4870049'
  Then Customer should receive successful response
  And Customer should receive zero offers

Scenario: Get Offers From Deliverers Within Geo-Radius
  Given Deliverer 'A' adds a new offer for product 1 with location '28.1924005', '-105.4676839' and delivery radius of 3 KM
  When Customer send request to get offers for product 1 with location '28.2007644', '-105.4870049'
  Then Customer should receive successful response
  And Customer should receive one offer
