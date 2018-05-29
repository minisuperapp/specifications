Feature: Deliverers

Scenario: Place an order successfully
  When I send request to get deliverers
  Then I should receive successful response
