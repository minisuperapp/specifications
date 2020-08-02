Feature: Deliverer Logout

  Background:
    Given Deliverer 'D1' registers and logs in

  Scenario: Successful logout
    When Deliverer 'D1' logs out
    Then Deliverer should receive successful response
