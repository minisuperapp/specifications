Feature: Order Placement

Background:
  Given Deliverer 'D1' registers with phone number '6483516383' and logs in
  And Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA'

Scenario: Place an order successfully
  Given Customer sends request to get offers for product 'CORN_TORTILLA'
  When Customer places order using offer from deliverer 'D1' with quantity '2'
  Then Customer should receive successful response
  And Customer should receive an order id
