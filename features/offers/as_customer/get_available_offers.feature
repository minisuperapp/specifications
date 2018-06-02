Feature: Get Available Offers as Customer

Scenario: Get Available Offer for 1 product
  Given Deliverer adds a new offer for product 1
  When I send request to get offers
  Then I should receive successful response
  And I should receive at least one offer
  And all offers should have an id
  And all offers should have a price
  And all offers should have an estimated arrival time
  And offers should be ordered by estimated arrival time
  And all offers should have the deliverer name
  And all offers should have the deliverer reputation
  And all offers should have the deliverer last rating
