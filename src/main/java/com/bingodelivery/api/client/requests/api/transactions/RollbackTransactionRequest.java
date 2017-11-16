package com.bingodelivery.api.client.requests.api.transactions;

import com.bingodelivery.api.client.request_data.ApiUser;
import com.bingodelivery.api.client.request_data.CsrfToken;
import com.bingodelivery.api.client.requests.ResultListener;
import com.bingodelivery.api.client.requests.api.ApiRequest;
import org.springframework.http.HttpMethod;

import static org.springframework.http.HttpMethod.GET;

public class RollbackTransactionRequest extends ApiRequest
{

    public RollbackTransactionRequest(ApiUser apiUser, ResultListener resultListener, CsrfToken csrfToken)
    {
        super(apiUser, resultListener, csrfToken);
    }

    @Override
    protected String getRequestBody() {
        return null;
    }

    @Override
    protected HttpMethod getHttpMethod() {
        return GET;
    }

    @Override
    protected String getPath() {
        return "acceptance_test/transaction/rollback";
    }
}
