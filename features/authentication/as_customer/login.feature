Feature: Customer Login

  Background:
    Given Customer registers with email 'customer@minisuper.app' and password '1234'

  Scenario: Successful login
    When Customer logs in with email 'customer@minisuper.app' and password '1234'
    Then Customer should receive successful response
    And Customer should receive session token

  Scenario: Wrong email
    When Customer logs in with email 'xxx@minisuper.app' and password '1234'
    Then Customer should receive unsuccessful response
    And Customer should receive single error message with property '' and message 'invalid.credentials'

  Scenario: Wrong password
    When Customer logs in with email 'customer@minisuper.app' and password '1111'
    Then Customer should receive unsuccessful response
    And Customer should receive single error message with property '' and message 'invalid.credentials'
