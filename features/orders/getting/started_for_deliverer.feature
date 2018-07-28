Feature: Get Started Orders Assigned To A Deliverer

Background:
  Given Deliverer 'D1' registers with phone number '6483516383' and logs in
  And Deliverer 'D1' publishes a new offer for product 'CORN_TORTILLA' with price '18.50'

Scenario: Get New Started Order
  Given Customer places an order using offer from deliverer 'D1' with quantity '2'
  When Deliverer 'D1' gets started orders pending to deliver
  Then Deliverer should receive successful response
