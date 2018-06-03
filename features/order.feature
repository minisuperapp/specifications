Feature: Order

Scenario: Place an order successfully
  When Customer send request to place an order
  Then Customer should receive successful response
