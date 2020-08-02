Feature: Customer Registration

  Scenario: Successful registration as customer
    When Customer is registered
    Then Customer should receive successful response
