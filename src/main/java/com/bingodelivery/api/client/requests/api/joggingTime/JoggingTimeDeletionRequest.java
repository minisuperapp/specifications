package com.bingodelivery.api.client.requests.api.joggingTime;

import static org.springframework.http.HttpMethod.DELETE;

import com.bingodelivery.api.client.api_client.ApiUser;
import com.bingodelivery.api.client.api_client.CsrfToken;
import com.bingodelivery.api.client.requests.ResultListener;
import com.bingodelivery.api.client.requests.api.ApiRequest;
import org.json.JSONObject;
import org.springframework.http.HttpMethod;

public class JoggingTimeDeletionRequest extends ApiRequest
{
    private String joggingTimesId;

    public JoggingTimeDeletionRequest(ApiUser apiUser, ResultListener resultListener, CsrfToken csrfToken) {
        super(apiUser, resultListener, csrfToken);
    }

    @Override
    protected String getRequestBody() {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("jogging_times_id", joggingTimesId);
        return jsonObject.toString();
    }

    @Override
    protected HttpMethod getHttpMethod() {
        return DELETE;
    }

    @Override
    protected String getUrlPath() {
        return "joggingTime/delete";
    }

    public JoggingTimeDeletionRequest withJoggingTimesId(String joggingTimesId)
    {
        this.joggingTimesId = joggingTimesId;
        return this;
    }
}
