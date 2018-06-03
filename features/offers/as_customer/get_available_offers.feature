Feature: Get Available Offers As Customer

Scenario: Get Available Offer for 1 product
  Given Deliverer adds a new offer for product 1
  When Customer send request to get offers for product 1
  Then Customer should receive successful response
  And Customer should receive one offer
  And all offers should have an id, price, and estimated arrival time
  And all offers should have the deliverer name, reputation, and last rating
  And offers should be ordered by estimated arrival time

Scenario: Get No Offers For A Product Not Yet Offered
  Given Deliverer adds a new offer for product 1
  When Customer send request to get offers for product 2
  Then Customer should receive successful response
  And Customer should receive zero offers

Scenario: Get No Offers From Deliverers Outside Geo-Radius
  Given Deliverer adds a new offer for product 1 with location '', '' and delivery radius of 1 KM
  When Customer send request to get offers for product 1 with location '', ''
  Then Customer should receive successful response
  And Customer should receive zero offers
