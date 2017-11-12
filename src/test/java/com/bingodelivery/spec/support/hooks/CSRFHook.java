package xyz.greatapp.step_definitions.hooks;

import cucumber.api.java.Before;
import com.bingodelivery.api.client.api_client.ApiUser;
import com.bingodelivery.api.client.api_client.CsrfToken;
import com.bingodelivery.api.client.requests.api.csrf.CSRFRequest;
import xyz.greatapp.libs.service.ServiceResult;

public class CSRFHook
{
    private final CsrfToken csrfToken;

    public CSRFHook(CsrfToken csrfToken) {

        this.csrfToken = csrfToken;
    }

    @Before(order = 1)
    public final void getCsrfToken() {
        CSRFRequest csrfRequest = new CSRFRequest(ApiUser.NULL, null, CsrfToken.NULL);
        ServiceResult serviceResult = csrfRequest.send();
        csrfToken.withToken(serviceResult.getObject());
    }

}
