Feature: Request an order

  Scenario: Customer provides correct ordering request
    Given user provides correct ordering information
    When user sends order request
    Then the response should be successful
