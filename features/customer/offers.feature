Feature: Product Offers


Scenario: Get Product Offers Information
  When I send request to get product offers
  Then all offers should have estimated price
