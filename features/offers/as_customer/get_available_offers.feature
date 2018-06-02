Feature: Get Available Offers as Customer

Scenario: Get Available Offer for 1 product
  Given Deliverer adds a new offer for product 1
  When I send request to get offers for product 1
  Then I should receive successful response
  And I should receive one offer
  And all offers should have an id, price, and estimated arrival time
  And all offers should have the deliverer name, reputation, and last rating
  And offers should be ordered by estimated arrival time
