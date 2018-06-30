Feature: Products Listing

Scenario: Get Products
  When I send request to get products
  Then all products should have an id
  And all products should have a name
  And all products should have a code
  And all products should have available status
  And all products should be unavailable
