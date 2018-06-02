Feature: Order

Scenario: Place an order successfully
  When I send request to place an order
  Then I should receive successful response
