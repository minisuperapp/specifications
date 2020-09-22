Feature: Update Offer Location

  Background:
    Given Deliverer 'D1' registers with email 'd1@minisuper.app' and password 'secret1'
    And Deliverer 'D1' logs in with email 'd1@minisuper.app' and password 'secret1'

  Scenario: Update Offer (Deliverer) Location
    Given Deliverer 'D1' publishes a new offer
    When Deliverer 'D1' updates offer location
    Then Deliverer should receive successful response

  Scenario: Notify Offer Location Update
    Given Customer sends request to set location to '28.1867348', '-105.4608849'
    And Customer sends request to get offers grouped by product
    And Customer subscribes to get offers updates with location '28.1867348', '-105.4608849'
    And Deliverer 'D1' publishes a new offer for product 'tortillas_de_maiz' with location '28.1867348', '-105.4700849' and delivery radius of 1000 M
    When Deliverer 'D1' updates offer location to '28.1867348', '-105.4782849'
    Then the offer location for product 'tortillas_de_maiz' should be updated to '28.1867348', '-105.4782849'

  Scenario: Do Not Notify Deliverer Location Update If Customer Disconnected Subscription
    Given Customer sends request to set location to '28.1867348', '-105.4608849'
    And Customer sends request to get offers grouped by product
    And Customer subscribes to get offers updates with location '28.1867348', '-105.4608849'
    And Deliverer 'D1' publishes a new offer for product 'tortillas_de_maiz' with location '28.1867348', '-105.4700849' and delivery radius of 1000 M
    And Deliverer 'D1' updates offer location to '28.1867348', '-105.4782849'
    And Customer disconnects subscription for updates
    And Deliverer 'D1' updates offer location to '28.1866048', '-105.4786849'
    Then the offer location for product 'tortillas_de_maiz' should be updated to '28.1867348', '-105.4782849'
