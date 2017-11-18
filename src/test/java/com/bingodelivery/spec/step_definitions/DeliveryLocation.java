package com.bingodelivery.spec.step_definitions;

import com.bingodelivery.api.client.requests.api.delivery.NextDeliveryLocationRQ;
import cucumber.api.java8.En;

public class DeliveryLocation implements En {
    public DeliveryLocation(NextDeliveryLocationRQ rq) {
        When("^deliverer gets to get next delivery location$", rq::send);
    }
}
