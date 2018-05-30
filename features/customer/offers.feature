Feature: Offers

Scenario: Get Offers
  When I send request to get offers
  Then I should receive successful response
  And I should receive at least one offer
  And all offers should have an id
  And all offers should have a price
  And all offers should have an estimated arrival time
  And all offers should have the deliverer name
