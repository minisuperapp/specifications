Feature: Rate Deliverer

  Background:
    Given Deliverer 'D1' registers with phone number '6483516383' and logs in
    And Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA' with price '18.50'

Scenario: Rate Deliverer By Customer
  When Customer rates deliverer 'D1' for 'SERVICE' with rating '2'
  Then Customer should receive successful response