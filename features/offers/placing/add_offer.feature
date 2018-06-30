Feature: Add Offer As Deliverer

Background:
  Given Deliverer 'D1' registers with phone number '6481095678' and logs in

Scenario: Add Offer Successfully
  When Deliverer 'D1' adds a new offer
  Then Deliverer should receive successful response

Scenario: Unknown Deliverer Adds An Offer
  When Deliverer 'D2' adds a new offer
  Then Deliverer should receive unsuccessful response
  And Deliverer should receive single error message with property '' and message 'unknown.deliverer'
