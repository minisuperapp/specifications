package com.bingodelivery.api.client.requests.api.transactions;

import com.bingodelivery.api.client.api_client.ApiUser;
import com.bingodelivery.api.client.api_client.CsrfToken;
import com.bingodelivery.api.client.requests.ResultListener;
import com.bingodelivery.api.client.requests.api.ApiRequest;
import org.springframework.http.HttpMethod;

import static org.springframework.http.HttpMethod.GET;

public class BeginTransactionRequest extends ApiRequest
{
    public BeginTransactionRequest(ApiUser apiUser, ResultListener resultListener, CsrfToken csrfToken)
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
        return GET;
    }

    @Override
    protected String getUrlPath()
    {
        return "acceptance_test/transaction/begin";
    }
}
