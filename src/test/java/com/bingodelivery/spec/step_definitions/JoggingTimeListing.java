
package com.bingodelivery.spec.step_definitions;

import static java.lang.Integer.parseInt;

import cucumber.api.java8.En;
import com.bingodelivery.api.client.requests.api.joggingTime.JoggingTimeListingRequest;

public class JoggingTimeListing implements En
{
    public JoggingTimeListing(JoggingTimeListingRequest joggingTimeListingRequest)
    {
        When("^User sends request to get jogging times from \"([^\"]*)\" to \"([^\"]*)\"$",
                (String from, String to) -> {
                    String[] fromParts = from.split("-");
                    String[] toParts = to.split("-");

                    joggingTimeListingRequest
                            .withFromDay(parseInt(fromParts[0]))
                            .withFromMonth(parseInt(fromParts[1]))
                            .withFromYear(parseInt(fromParts[2]));
                    joggingTimeListingRequest
                            .withToDay(parseInt(toParts[0]))
                            .withToMonth(parseInt(toParts[1]))
                            .withToYear(parseInt(toParts[2]));

                    joggingTimeListingRequest.send();
        });
    }
}
