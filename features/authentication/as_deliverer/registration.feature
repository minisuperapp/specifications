Feature: Deliverer Registration

Scenario: Successful registration as deliverer
  When Deliverer 'D1' registers with name 'Alonso Ayala', phone number '6623471507', and password 'secret1'
  Then Customer should receive successful response

Scenario: Register with existing phone number
  Given Deliverer 'D1' registers with phone number '6483516383' and password 'secret1'
  When Deliverer 'D1' registers with phone number '6483516383' and password 'secret2'
  Then Deliverer should receive unsuccessful response
  And Deliverer should receive single error message with property 'phoneNumber' and message 'existing'
