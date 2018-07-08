Feature: Update Offer Location

Background:
  Given Deliverer 'D1' registers with phone number '6483516383' and password 'secret1'
  And Deliverer 'D1' logs in with phone number '6483516383' and password 'secret1'

Scenario: Update Offer (Deliverer) Location
  Given Deliverer 'D1' publishes a new offer
  When Deliverer 'D1' updates offer location
  Then Deliverer should receive successful response
