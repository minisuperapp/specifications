Feature: Add Offer As Deliverer

Background:
  Given Deliverer 'A' logs in with phone number '6483516383' and password 'secret1'

Scenario: Add Offer Successfully
  When Deliverer 'A' adds a new offer
  Then Deliverer should receive successful response
