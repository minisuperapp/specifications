package com.bingodelivery.api.client.requests.api.delivery;

import static org.springframework.http.HttpMethod.POST;

import com.bingodelivery.api.client.request_data.ApiUser;
import com.bingodelivery.api.client.request_data.CsrfToken;
import com.bingodelivery.api.client.requests.ResultListener;
import com.bingodelivery.api.client.requests.api.ApiRequest;
import org.json.JSONObject;
import org.springframework.http.HttpMethod;

public class OrderRQ extends ApiRequest
{
    private String latitude = "";
    private String longitude = "";

    public OrderRQ(ApiUser apiUser, ResultListener resultListener, CsrfToken csrfToken) {
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
    protected String getPath() {
        return "order";
    }

    public OrderRQ withLatitude(String latitude) {
        this.latitude = latitude;
        return this;
    }

    public OrderRQ withLongitude(String longitude) {
        this.longitude = longitude;
        return this;
    }
}
