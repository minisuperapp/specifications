Feature: Products Listing

Background:
  Given Deliverer 'D1' registers with phone number '6481095678' and logs in

Scenario: Get Products
  When Customer sends request to get products
  Then all products should have an id
  And all products should have a name
  And all products should have a code
  And all products should have available status
  And all products should be unavailable

Scenario: Get Available Products
  Given Deliverer 'D1' adds a new offer for product 'CORN_TORTILLA'
  When Customer sends request to get products
  Then product 'CORN_TORTILLA' should be available
  And product 'RED_APPLE' should NOT be available
  And product 'ORANGE' should NOT be available

Scenario: Change Product Availability When An Offer Is Published
  When Customer sends request to get products
  Given Deliverer 'D1' adds a new offer for product 'CORN_TORTILLA'
  Then product 'CORN_TORTILLA' should be available
  And product 'RED_APPLE' should NOT be available
  And product 'ORANGE' should NOT be available

Scenario: Do Not Change Product Availability When An Offer Is Published In A Different City
    When Customer sends request to get products with location '28.2007644', '-105.4870049'
  Given Deliverer 'D1' adds a new offer for product 'CORN_TORTILLA' with location '28.6472265', '-106.083621' and delivery radius of 1 KM
  Then product 'CORN_TORTILLA' should NOT be available
  And product 'RED_APPLE' should NOT be available
  And product 'ORANGE' should NOT be available
