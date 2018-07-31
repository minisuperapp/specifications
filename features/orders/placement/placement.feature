Feature: Order Placement

Background:
  Given Deliverer 'D1' registers with phone number '6483516383' and logs in
  And Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA' with price '18.50'

Scenario: Place an order successfully
  Given Customer sends request to get offers for product 'CORN_TORTILLA'
  When Customer places an order using offer from deliverer 'D1' with quantity '2' and location '27.670799', '105.1599679'
  Then Customer should receive successful response
  And Customer should receive an order with non empty id
  And Customer should receive an order with total '37'
  And Customer should receive an order with status 'STARTED'
  And Deliverer 'D1' should receive a pending delivery with last placed order id
