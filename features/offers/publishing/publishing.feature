Feature: Publish An Offer

  Background:
    Given Deliverer 'D1' registers and logs in
    And Customer access the application
    And Customer sends request to set location to '28.1867348', '-105.4608849'

  Scenario: Add Offer Successfully
    When Deliverer 'D1' publishes a new offer
    Then Deliverer should receive successful response

  Scenario: Unknown Deliverer Adds An Offer
    When Deliverer 'D2' publishes a new offer
    Then Deliverer should receive unsuccessful response
    Then Deliverer should receive a 401 error response

  Scenario: Notify Offer Publishing
    Given Customer subscribes to get offers updates
    When Deliverer 'D1' publishes a new offer for product 'tortillas_de_maiz'
    Then Customer should see one offer for product 'tortillas_de_maiz'

  Scenario: Do Not Notify Offer Publishing If Customer Disconnected Subscription
    Given Customer sends request to get offers grouped by product
    And Customer subscribes to get offers updates
    And Deliverer 'D1' publishes a new offer for product 'RED_APPLE'
    And Customer disconnects subscription for updates
    And Deliverer 'D1' publishes a new offer for product 'tortillas_de_maiz'
    Then Customer should see zero offers for product 'tortillas_de_maiz'

  Scenario: Do Not Notify Offer Publishing If Offer Is Outside Deliverer's Radius
    Given Customer sends request to set location to '28.1867348', '-105.4608849'
    And Customer sends request to get offers grouped by product
    And Customer subscribes to get offers updates with location '28.1867348', '-105.4608849'
    When Deliverer 'D1' publishes a new offer for product 'tortillas_de_maiz' with location '28.1924005', '-105.39' and delivery radius of 1000 M
    Then Customer should see zero offers for product 'tortillas_de_maiz'
