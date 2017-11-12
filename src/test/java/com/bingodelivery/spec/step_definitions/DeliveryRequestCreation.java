package com.bingodelivery.spec.step_definitions;

import com.bingodelivery.api.client.requests.api.deliveryRequest.DeliveryRequestRQ;
import com.bingodelivery.spec.support.holders.ServiceResultHolder;
import cucumber.api.java8.En;

public class DeliveryRequestCreation implements En {
    public DeliveryRequestCreation(
            DeliveryRequestRQ deliveryRequestRQ,
            ServiceResultHolder serviceResult) {

        Given("^user provides correct delivery request information$", () -> {

            deliveryRequestRQ
                    .withLatitud("32.9446771")
                    .withLongitud("-97.0650398,14z");
        });

        When("^user sends delivery request request$", deliveryRequestRQ::send);
    }
}
