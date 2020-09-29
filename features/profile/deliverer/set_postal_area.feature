Feature: Deliverer Profile
  Background:
    Given Deliverer 'D1' registers and logs in

  Scenario: Deliverer Sets Postal Area
    When Deliverer 'D1' sets the postal area with the following info
      |postal_area_code|postal_area_name|postal_area_county|postal_area_state|
      |33000|Sector Sur|Delicias|Chihuahua|
    Then Deliverer should receive successful response
