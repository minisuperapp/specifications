package com.bingodelivery.api.client.requests.api.delivery;

import com.bingodelivery.api.client.request_data.ApiUser;
import com.bingodelivery.api.client.request_data.CsrfToken;
import com.bingodelivery.api.client.requests.ResultListener;
import com.bingodelivery.api.client.requests.api.ApiRequest;
import org.springframework.http.HttpMethod;

import static org.springframework.http.HttpMethod.GET;

public class NextDeliveryLocationRQ extends ApiRequest {

    public NextDeliveryLocationRQ(ApiUser apiUser, ResultListener resultListener, CsrfToken csrfToken) {
        super(apiUser, resultListener, csrfToken);
    }

    @Override
    protected String getRequestBody() {
        return "";
    }

    @Override
    protected HttpMethod getHttpMethod() {
        return GET;
    }

    @Override
    protected String getPath() {
        return "delivery_location/next";
    }
}
