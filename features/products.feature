Feature: Products Listing

Scenario: Get Products
  When I send request to get products
  Then I should get at least one product
  And all products should have an id
  And all products should have a name
  And all products should have an estimated price
  And all products should have an estimated delivery time
  And all products should have an image url
