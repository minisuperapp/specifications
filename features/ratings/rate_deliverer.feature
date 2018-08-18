Feature: Rate Deliverer

  Background:
    Given Deliverer 'D1' registers with phone number '6483516383' and logs in
    And Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA'
    And Customer sends request to get offers for product 'CORN_TORTILLA'
    And Customer places an order using offer from deliverer 'D1'

  Scenario: Rate Deliverer By Customer
    When Customer rates last order deliverer for 'SERVICE' with rating '2'
    Then Customer should receive successful response