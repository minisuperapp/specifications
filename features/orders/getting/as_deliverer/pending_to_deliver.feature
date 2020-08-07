Feature: Get Orders Pending To Deliver As Deliverer

  Background:
    Given Customer access the application
    And Deliverer 'D1' registers and logs in
    And Deliverer 'D1' publishes a new offer for product 'tortillas_de_maiz' with price '18.50'

  Scenario: Get New Started Order
    Given Customer places an order using offer from deliverer 'D1' with quantity '2' and location '28.1867348', '-105.4608849'
    When Deliverer 'D1' sends request to receive started orders pending to deliver
    Then Deliverer should receive successful response
    And Deliverer should receive one order
    And the order should be for product 'tortillas_de_maiz'
    And the order should have quantity '2'
