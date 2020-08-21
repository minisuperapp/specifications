Feature: Product Wish

  Background:
    Given Customer access the application

  Scenario: Add A Product Wish
    When Customer adds a product wish with description 'Salsa Roja'
    Then Customer should receive successful response
