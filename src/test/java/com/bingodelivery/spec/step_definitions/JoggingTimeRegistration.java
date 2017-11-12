
package com.bingodelivery.spec.step_definitions;

import static java.lang.Integer.valueOf;
import static java.util.Calendar.DAY_OF_MONTH;
import static java.util.Calendar.MONTH;
import static java.util.Calendar.YEAR;

import cucumber.api.java8.En;

import java.util.Calendar;

import com.bingodelivery.api.client.holders.LastCreatedJoggingTime;
import com.bingodelivery.api.client.requests.api.joggingTime.JoggingTimeRegistrationRequest;
import xyz.greatapp.libs.service.ServiceResult;

public class JoggingTimeRegistration implements En
{
    public JoggingTimeRegistration(
            JoggingTimeRegistrationRequest registerJoggingTimeRequest,
            LastCreatedJoggingTime lastCreatedJoggingTime)
    {
        Given("^User provides correct jogging time information$", () -> {
            Calendar cal = Calendar.getInstance();
            registerJoggingTimeRequest
                    .withYear(cal.get(YEAR))
                    .withMonth(cal.get(MONTH) + 1)
                    .withDay(cal.get(DAY_OF_MONTH));
        });

        When("^User sends create jogging time request$", registerJoggingTimeRequest::send);

        Given("^User provides (\\d+) as day, (\\d+) as month and (\\d+) as year$",
                (Integer day, Integer month, Integer year) -> registerJoggingTimeRequest
                        .withDay(day)
                        .withMonth(month)
                        .withYear(year));

        Given("^User provides null day$", () -> registerJoggingTimeRequest
                .withDay(null));

        Given("^User provides null month$", () -> registerJoggingTimeRequest
                .withMonth(null));

        Given("^User provides null year$", () -> registerJoggingTimeRequest
                .withYear(null));

        Given("^User provides future date$", () -> {
            Calendar cal = Calendar.getInstance();
            cal.add(DAY_OF_MONTH, 1);
            registerJoggingTimeRequest
                    .withYear(cal.get(YEAR))
                    .withMonth(cal.get(MONTH) + 1)
                    .withDay(cal.get(DAY_OF_MONTH));
        });

        Given("^User provides date in the past$", () -> {
            Calendar cal = Calendar.getInstance();
            cal.add(DAY_OF_MONTH, -2);
            registerJoggingTimeRequest
                    .withYear(cal.get(YEAR))
                    .withMonth(cal.get(MONTH) + 1)
                    .withDay(cal.get(DAY_OF_MONTH));
        });

        Given("^User registers jogging time for \"([^\"]*)\"$", (String date) -> {
            String[] dateParts = date.split("-");
            registerJoggingTimeRequest
                    .withDay(valueOf(dateParts[0]))
                    .withMonth(valueOf(dateParts[1]))
                    .withYear(valueOf(dateParts[2]));
            ServiceResult serviceResult = registerJoggingTimeRequest.send();
            lastCreatedJoggingTime.withJoggingTimeId(serviceResult.getObject());
        });

        Given("^User registers new jogging time", () -> {
            ServiceResult serviceResult = registerJoggingTimeRequest.send();
            lastCreatedJoggingTime.withJoggingTimeId(serviceResult.getObject());
        });

        Given("^User registers jogging time with (\\d+) as distance and (\\d+) as time$", (Integer distance, Integer time) -> {
            registerJoggingTimeRequest
                    .withDistance(distance)
                    .withTime(time);
            ServiceResult serviceResult = registerJoggingTimeRequest.send();
            lastCreatedJoggingTime.withJoggingTimeId(serviceResult.getObject());
        });
        Given("^User registers jogging time for \"([^\"]*)\" with distance (\\d+) and seconds (\\d+)$",
                (String date, Integer distance, Integer seconds) -> {
                    String[] dateParts = date.split("-");
                    registerJoggingTimeRequest
                            .withDay(valueOf(dateParts[0]))
                            .withMonth(valueOf(dateParts[1]))
                            .withYear(valueOf(dateParts[2]))
                            .withDistance(distance)
                            .withTime(seconds);
                    ServiceResult serviceResult = registerJoggingTimeRequest.send();
                    lastCreatedJoggingTime.withJoggingTimeId(serviceResult.getObject());
                });
    }
}
