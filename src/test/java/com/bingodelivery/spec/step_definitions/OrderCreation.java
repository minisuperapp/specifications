package com.bingodelivery.spec.step_definitions;

import com.bingodelivery.api.client.requests.api.delivery.OrderRQ;
import com.bingodelivery.spec.support.holders.ServiceResultHolder;
import cucumber.api.java8.En;

public class OrderCreation implements En {
    public OrderCreation(
            OrderRQ orderRQ,
            ServiceResultHolder serviceResult) {

        Given("^user provides correct ordering information$", () -> {

            orderRQ
                    .withLatitude("32.9446771")
                    .withLongitude("-97.0650398,14z");
        });

        When("^user sends order request$", orderRQ::send);

        Given("^user sends order request with latitude \"([^\"]*)\" and longitude \"([^\"]*)\"$",
                (String latitude, String longitude) -> orderRQ
                        .withLatitude(latitude)
                        .withLongitude(longitude)
                        .send());
    }
}
