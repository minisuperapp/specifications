Feature: Delete An Offer

  Background:
    Given Deliverer 'D1' registers with phone number '6483516383' and password 'secret1'
    And Deliverer 'D1' logs in with phone number '6483516383' and password 'secret1'
    Given Deliverer 'D1' publishes a new offer for product 'tortillas_de_maiz' with price '20.00'

  Scenario: Delete An Offer
    When Deliverer 'D1' deletes the last published offer
    Then Deliverer should receive successful response

  Scenario: Customer gets no offers after deletion
    Given Deliverer 'D1' deletes the last published offer
    When Customer sends request to get offers grouped by product
    Then Customer should receive zero offers for product 'tortillas_de_maiz'

  Scenario: Deliverer gets no offers after deletion
    Given Deliverer 'D1' deletes the last published offer
    When Deliverer 'D1' sends request to get published offers
    Then Deliverer 'D1' should get zero offers for product 'tortillas_de_maiz'
