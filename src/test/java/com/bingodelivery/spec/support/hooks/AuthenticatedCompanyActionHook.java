package xyz.greatapp.step_definitions.hooks;

import cucumber.api.java.Before;
import com.bingodelivery.api.client.api_client.ApiUser;
import com.bingodelivery.api.client.requests.auth.login.GetTokenRequest;
import xyz.greatapp.libs.service.ServiceResult;

public class AuthenticatedCompanyActionHook {

    private final ApiUser apiUser;

    public AuthenticatedCompanyActionHook(ApiUser apiUser) {
        this.apiUser = apiUser;
    }

    @Before("@authenticated_company_action")
    public final void loginCompanyAndGetApiUser() {
        ServiceResult jsonObject = new GetTokenRequest(null)
                .withUsername("test@greatapp.xyz")
                .withPassword("secret").send();
        apiUser.withAccessToken(jsonObject.getObject());
    }
}
