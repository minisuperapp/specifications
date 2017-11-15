package com.bingodelivery.api.client.requests.api.delivery_request;

import static org.springframework.http.HttpMethod.POST;

import com.bingodelivery.api.client.api_client.ApiUser;
import com.bingodelivery.api.client.api_client.CsrfToken;
import com.bingodelivery.api.client.requests.ResultListener;
import com.bingodelivery.api.client.requests.api.ApiRequest;
import org.json.JSONObject;
import org.springframework.http.HttpMethod;

public class DeliveryRequestRQ extends ApiRequest
{
    private String latitude = "";
    private String longitude = "";

    public DeliveryRequestRQ(ApiUser apiUser, ResultListener resultListener, CsrfToken csrfToken) {
        super(apiUser, resultListener, csrfToken);
    }

    @Override
    protected String getRequestBody() {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("latitude", latitude);
        jsonObject.put("longitude", longitude);
        return jsonObject.toString();
    }

    @Override
    protected HttpMethod getHttpMethod() {
        return POST;
    }

    @Override
    protected String getUrlPath() {
        return "request";
    }

    public DeliveryRequestRQ withLatitude(String latitude) {
        this.latitude = latitude;
        return this;
    }

    public DeliveryRequestRQ withLongitude(String longitude) {
        this.longitude = longitude;
        return this;
    }
}
