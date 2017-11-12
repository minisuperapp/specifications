
package com.bingodelivery.spec.step_definitions;

import static java.lang.Integer.valueOf;

import cucumber.api.java8.En;
import com.bingodelivery.api.client.requests.api.joggingTime.JoggingTimeUpdatingRequest;
import com.bingodelivery.api.client.holders.LastCreatedJoggingTime;

public class JoggingTimeUpdating implements En
{
    public JoggingTimeUpdating(
            JoggingTimeUpdatingRequest joggingTimeUpdatingRequest,
            LastCreatedJoggingTime lastCreatedJoggingTime)
    {
        When("^User updates last created jogging time with date \"([^\"]*)\"$", (String date) -> {
            String[] dateParts = date.split("-");
            joggingTimeUpdatingRequest
                    .withJoggingTimeId(lastCreatedJoggingTime.getJoggingTimeId())
                    .withDay(valueOf(dateParts[0]))
                    .withMonth(valueOf(dateParts[1]))
                    .withYear(valueOf(dateParts[2]));
            joggingTimeUpdatingRequest.send();
        });
        When("^User updates last create jogging time with (\\d+) as distance and (\\d+) as time$",
                (Integer distance, Integer time) -> {
                    joggingTimeUpdatingRequest
                            .withJoggingTimeId(lastCreatedJoggingTime.getJoggingTimeId())
                            .withDistance(distance)
                            .withTime(time);
                    joggingTimeUpdatingRequest.send();
                });

        When("^User updates jogging time with wrong id$", () -> {
            joggingTimeUpdatingRequest
                    .withJoggingTimeId("wrong id");
            joggingTimeUpdatingRequest.send();
        });
    }
}
