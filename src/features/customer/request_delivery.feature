Feature: Request a delivery

  Scenario: Customer provides correct delivery request
    Given user provides correct delivery request information
    When user sends delivery request request
    Then the response should be successful
