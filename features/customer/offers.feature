Feature: Offers

Scenario: Get Offers
  When I send request to get offers
  Then I should receive successful response
  And all offers should have an id
