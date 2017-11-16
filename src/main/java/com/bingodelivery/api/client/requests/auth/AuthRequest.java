package com.bingodelivery.api.client.requests.auth;

import com.bingodelivery.api.client.request_data.HttpClient;
import com.bingodelivery.api.client.requests.ResultListener;
import org.json.JSONObject;
import org.springframework.http.HttpMethod;
import org.springframework.web.client.HttpClientErrorException;
import com.bingodelivery.api.client.request_data.HttpRequestData;

import com.bingodelivery.api.client.requests.auth.login.GetTokenRequest;
import com.bingodelivery.api.client.requests.auth.login.RefreshTokenRequest;
import xyz.greatapp.libs.service.ServiceResult;

import static java.util.Base64.getEncoder;
import static java.util.Objects.nonNull;

public abstract class AuthRequest
{
    private final static HttpClient apiClient = new HttpClient();
    private final ResultListener resultListener;

    public AuthRequest(ResultListener resultListener)
    {
        this.resultListener = resultListener;
    }

    public ServiceResult send()
    {
        HttpRequestData httpRequestData = getHttpRequestData();
        ServiceResult serviceResult = new ServiceResult(false, "");
        JSONObject token = new JSONObject();
        try
        {
            String restResponse = apiClient.getRestResponse(httpRequestData);
            token = new JSONObject(restResponse);
            serviceResult = new ServiceResult(true, "", token.getString("access_token"));

            if (this instanceof GetTokenRequest)
            {
                return new RefreshTokenRequest(resultListener).withRefreshToken(token.getString("refresh_token")).send();
            }
        }
        catch (HttpClientErrorException e)
        {
            if (!isLoginRequest(httpRequestData, e))
                throw e;
        }
        if (nonNull(resultListener))
        {
            resultListener.set(serviceResult);
        }
        return serviceResult;
    }

    private boolean isLoginRequest(HttpRequestData httpRequestData, HttpClientErrorException e)
    {
        return (e.getRawStatusCode() == 401 ||
                e.getRawStatusCode() == 400) &&
                httpRequestData.getUrlPath().endsWith("/oauth/token");
    }

    private HttpRequestData getHttpRequestData()
    {
        return new HttpRequestData()
                .setHttpMethod(getHttpMethod())
                .setBody(getRequestBody())
                .setUrlPath(getUrlPath())
                .setContentType("application/x-www-form-urlencoded")
                .setAuthorization("Basic " + new String(getEncoder().encode("greatappxyz:greatappxyzsecret".getBytes())))
                .setApiUrl("http://test.localhost:9000/");
    }

    protected abstract String getRequestBody();

    protected abstract HttpMethod getHttpMethod();

    protected abstract String getUrlPath();
}
