Feature: Publish An Offer

  Background:
    Given Deliverer 'D1' registers with email 'd1@minisuper.app' and logs in

  Scenario: Add Offer Successfully
    When Deliverer 'D1' publishes a new offer
    Then Deliverer should receive successful response

  Scenario: Unknown Deliverer Adds An Offer
    When Deliverer 'D2' publishes a new offer
    Then Deliverer should receive unsuccessful response
    And Deliverer should receive single error message with property '' and message 'unknown.deliverer'

  Scenario: Notify Offer Publishing
    Given Customer sends request to get offers grouped by product
    And Customer subscribes to get offers updates
    When Deliverer 'D1' publishes a new offer for product 'tortillas_de_maiz'
    Then Customer should see 1 offer(s) for product 'tortillas_de_maiz'

  Scenario: Do Not Notify Offer Publishing If Customer Disconnected Subscription
    Given Customer sends request to get offers grouped by product
    And Customer subscribes to get offers updates
    And Deliverer 'D1' publishes a new offer for product 'RED_APPLE'
    And Customer disconnects subscription for updates
    And Deliverer 'D1' publishes a new offer for product 'tortillas_de_maiz'
    Then Customer should see zero offers for product 'tortillas_de_maiz'

  Scenario: Do Not Notify Offer Publishing If Offer Is Outside Deliverer's Radius
    Given Customer sends request to get offers grouped by product with location '28.1867348', '-105.4608849'
    And Customer subscribes to get offers updates with location '28.1867348', '-105.4608849'
    When Deliverer 'D1' publishes a new offer for product 'tortillas_de_maiz' with location '28.1924005', '-105.39' and delivery radius of 1000 M
    Then Customer should see zero offers for product 'tortillas_de_maiz'
