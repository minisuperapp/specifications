Feature: Subscribe As Customer For Offers Updates

Background:
  Given Deliverer 'D1' registers with phone number '6481095678' and logs in

Scenario: Notify Offer Publishing
  Given Customer sends request to get offers grouped by product
  And Customer subscribes to get offers updates
  When Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA'
  Then Customer should see 1 offer(s) for product 'CORN_TORTILLA'

Scenario: Do Not Notify Offer Publishing If Customer Disconnect Subscription
  Given Customer sends request to get offers grouped by product
  And Customer subscribes to get offers updates
  And Deliverer 'D1' publishes a new offer for product 'RED_APPLE'
  And Customer disconnet subscription for offers updates
  And Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA'
  Then Customer should see zero offers for product 'CORN_TORTILLA'

Scenario: Do Not Notify Offer Publishing If Offer Is Outside Deliverer's Radius
  Given Customer sends request to get offers grouped by product with location '28.1867048', '-105.4600849'
  And Customer subscribes to get offers updates with location '28.1867048', '-105.4600849'
  When Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA' with location '28.1924005', '-105.39' and delivery radius of 1 KM
  Then Customer should see zero offers for product 'CORN_TORTILLA'

Scenario: Nofity Offer Location Update
  Given Customer sends request to get offers grouped by product with location '28.1867048', '-105.4600849'
  And Customer subscribes to get offers updates with location '28.1867048', '-105.4600849'
  And Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA' with location '28.1867048', '-105.4700849' and delivery radius of 1 KM
  When Deliverer 'D1' updates offer location to '28.1867048', '-105.4782849'
  Then Then the offer location for product 'CORN_TORTILLA' should be updated to '28.1867048', '-105.4782849'
