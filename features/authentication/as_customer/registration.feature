Feature: Customer Registration

  Scenario: Successful registration as customer
    When Customer registers with email 'customer@minisuper.app' and password '1234'
    Then Customer should receive successful response

  Scenario: Register with existing email
    When Customer registers with email 'customer@minisuper.app' and password '1234'
    When Customer registers with email 'customer@minisuper.app' and password '1234'
    Then Customer should receive unsuccessful response
