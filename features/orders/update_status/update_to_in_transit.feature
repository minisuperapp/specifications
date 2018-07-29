Feature: Update Order To In Transit

Background:
  Given Deliverer 'D1' registers with phone number '6483516383' and logs in
  And Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA' with price '18.50'

Scenario: Get New Started Order
  Given Customer places an order using offer from deliverer 'D1' with quantity '2' and location '28.1867048', '-105.4600849'
  When Deliverer 'D1' updates last placed order to -in transit-
