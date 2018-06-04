Feature: Deliverer Login

Scenario: Successful login as deliverer
  When Deliverer 'A' logs in with phone number '6483516383' and password 'secret1'
  Then Deliverer should receive successful response
  And Deliverer should receive session token
