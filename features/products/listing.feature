Feature: Products Listing

Background:
  Given Deliverer 'D1' registers with phone number '6481095678' and logs in

Scenario: Get Products
  When Customer sends request to get products
  Then all products should have an id
  And all products should have a name
  And all products should have a code
