
package xyz.greatapp.step_definitions.domain_verifiers;

import static com.jayway.jsonpath.JsonPath.parse;
import static java.lang.Integer.valueOf;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import cucumber.api.java8.En;
import org.json.JSONArray;
import xyz.greatapp.step_definitions.domain_holders.ServiceResultHolder;

public class ServiceResultVerifier implements En
{

    public ServiceResultVerifier(ServiceResultHolder serviceResult)
    {
        Then("^The response should be successful$", () -> assertTrue(serviceResult.get().isSuccess()));

        Then("^The response should NOT be successful$", () -> assertFalse(serviceResult.get().isSuccess()));

        And("^The response should contain message \"([^\"]*)\"$",
                (String message) -> assertEquals(message, serviceResult.get().getMessage()));

        And("^The response should contain array object of size (\\d+)$",
                (Integer size) -> assertEquals(size, valueOf(new JSONArray(serviceResult.get().getObject()).length())));

        And("^The response should contain \"([^\"]*)\" as object$",
                (String object) -> assertEquals(object, serviceResult.get().getObject()));

        And("^The response should have (\\d+) in path \"([^\"]*)\"$", (Integer value, String path) ->
                assertEquals(value, parse(serviceResult.get().getObject()).read(path)));

        And("^The response should have (\\d+\\.\\d+) in path \"([^\"]*)\"$", (Double value, String path) ->
                assertEquals(value, parse(serviceResult.get().getObject()).read(path)));
    }
}
