Feature: Deliverer Login

Background:
  Given Deliverer 'D1' registers with phone number '6483516383' and password 'secret1'

Scenario: Successful login as deliverer
  When Deliverer 'D1' logs in with phone number '6483516383' and password 'secret1'
  Then Deliverer should receive successful response
  And Deliverer should receive session token

Scenario: Wrong password
  When Deliverer 'D1' logs in with phone number '6483516383' and password 'secret2'
  Then Deliverer should receive unsuccessful response
