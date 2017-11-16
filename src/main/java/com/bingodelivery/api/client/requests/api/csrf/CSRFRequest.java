package com.bingodelivery.api.client.requests.api.csrf;

import static org.springframework.http.HttpMethod.HEAD;

import com.bingodelivery.api.client.requests.ResultListener;
import org.springframework.http.HttpMethod;
import com.bingodelivery.api.client.request_data.ApiUser;
import com.bingodelivery.api.client.request_data.CsrfToken;
import com.bingodelivery.api.client.request_data.HttpClient;
import com.bingodelivery.api.client.requests.api.ApiRequest;

public class CSRFRequest extends ApiRequest
{
    private final static HttpClient httpClient = new HttpClient();

    public CSRFRequest(ApiUser apiUser, ResultListener resultListener, CsrfToken csrfToken)
    {
        super(apiUser, resultListener, csrfToken);
    }

    @Override
    protected String getRequestBody()
    {
        return null;
    }

    @Override
    protected HttpMethod getHttpMethod()
    {
        return HEAD;
    }

    @Override
    protected String getPath()
    {
        return "";
    }
}
