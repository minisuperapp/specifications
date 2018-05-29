Feature: Product Offers

Scenario: Get Product Offers Information
  When I send request to get product offers
  Then all offers should have a name
  And all offers should have an estimated price
  And all offers should have an estimated delivery time
