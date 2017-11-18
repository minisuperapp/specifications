Feature: Get next delivery location

  Scenario: Deliverer gets next delivery location
    Given user sends order request with latitude "32.9446771" and longitude "-97.0650398,14z"
    When deliverer gets to get next delivery location
    Then the response should be successful
