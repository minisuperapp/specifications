
package com.bingodelivery.spec.step_definitions;

import cucumber.api.java8.En;
import com.bingodelivery.api.client.requests.api.joggingTime.JoggingTimeDeletionRequest;
import com.bingodelivery.api.client.holders.LastCreatedJoggingTime;

public class JoggingTimeDeletion implements En
{
    public JoggingTimeDeletion(
            JoggingTimeDeletionRequest joggingTimeDeletionRequest,
            LastCreatedJoggingTime lastCreatedJoggingTime)
    {
        When("^User deletes last created jogging time$",
                () -> joggingTimeDeletionRequest
                        .withJoggingTimesId(lastCreatedJoggingTime.getJoggingTimeId())
                        .send());

        When("^User deletes created jogging time with wrong id$",
                () -> joggingTimeDeletionRequest
                        .withJoggingTimesId("wrongId")
                        .send());
    }
}
