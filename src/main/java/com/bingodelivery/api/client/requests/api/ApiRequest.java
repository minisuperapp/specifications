package com.bingodelivery.api.client.requests.api;

import static java.util.Objects.nonNull;
import static com.bingodelivery.api.client.util.ParserUtil.toServiceResult;

import com.bingodelivery.api.client.requests.ResultListener;
import org.springframework.http.HttpMethod;
import com.bingodelivery.api.client.request_data.HttpClient;
import com.bingodelivery.api.client.request_data.ApiUser;
import com.bingodelivery.api.client.request_data.CsrfToken;
import com.bingodelivery.api.client.request_data.HttpRequestData;
import xyz.greatapp.libs.service.ServiceResult;

public abstract class ApiRequest
{

    private final static HttpClient apiClient = new HttpClient();
    private final ApiUser apiUser;
    private final ResultListener resultListener;
    private final CsrfToken csrfToken;

    public ApiRequest(ApiUser apiUser, ResultListener resultListener, CsrfToken csrfToken)
    {
        this.apiUser = apiUser;
        this.resultListener = resultListener;
        this.csrfToken = csrfToken;
    }

    public ServiceResult send()
    {
        final HttpRequestData httpRequestData = getHttpRequestData();
        final String restResponse = apiClient.getRestResponse(httpRequestData);
        ServiceResult serviceResult = toServiceResult(restResponse);
        if (nonNull(resultListener))
        {
            resultListener.set(serviceResult);
        }
        return serviceResult;
    }

    protected HttpRequestData getHttpRequestData()
    {
        HttpRequestData httpRequestData = new HttpRequestData()
                .setHttpMethod(getHttpMethod())
                .setApiUser(apiUser)
                .setBody(getRequestBody())
                .setUrlPath(getPath())
                .setContentType("application/json")
                .setApiUrl(getHost());
        if (apiUser != ApiUser.NULL && nonNull(apiUser.getAccessToken()) && apiUser.getAccessToken().length() > 0)
        {
            httpRequestData.setAuthorization("Bearer " + httpRequestData.getApiUser().getAccessToken());
        }
        if (csrfToken != CsrfToken.NULL)
        {
            httpRequestData.setCsrfToken(csrfToken.getToken());
        }
        return httpRequestData;
    }

    protected String getHost() {
        return "http://test.localhost:9090/";
    }

    public ApiUser getApiUser()
    {
        return apiUser;
    }

    protected abstract String getRequestBody();

    protected abstract HttpMethod getHttpMethod();

    protected abstract String getPath();
}
