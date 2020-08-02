Feature: Deliverer Logout

  Background:
    Given Deliverer 'D1' registers and logs in

  Scenario: Successful logout
    When Deliverer 'D1' logs out
    Then Deliverer should receive successful response

  Scenario: Publish a new offer after logout
    Given Deliverer 'D1' logs out
    When Deliverer 'D1' publishes a new offer
    Then Deliverer should receive a 401 error response

  Scenario: Publish a new offer after token expires
    Given All deliverer tokens are expired
    When Deliverer 'D1' publishes a new offer
    Then Deliverer should receive a 401 error response
