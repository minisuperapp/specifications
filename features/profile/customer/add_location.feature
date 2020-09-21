Feature: Customer Profile
  Background:
    Given Customer access the application

  Scenario: Customer Adds A Location
    When Customer adds a location with the following info
      |name|is_home|street|number|city|neighborhood|postal_code|state|
      |Casa|true   |Benito Juarez|123|Delicias|Centro|33000    |Chihuahua|
    Then Customer should receive successful response

  Scenario: Get Customer Locations On Get Profile
    Given Customer adds a location with the following info
      |name|is_home|street|number|city|neighborhood|postal_code|state|
      |Casa|true   |Benito Juarez|123|Delicias|Centro|33000    |Chihuahua|
    When Customer access the application
    Then Customer should receive profile addresses
