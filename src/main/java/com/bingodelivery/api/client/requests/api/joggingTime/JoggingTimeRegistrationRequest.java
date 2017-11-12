package com.bingodelivery.api.client.requests.api.joggingTime;

import static org.springframework.http.HttpMethod.POST;

import com.bingodelivery.api.client.api_client.ApiUser;
import com.bingodelivery.api.client.api_client.CsrfToken;
import com.bingodelivery.api.client.requests.ResultListener;
import com.bingodelivery.api.client.requests.api.ApiRequest;
import org.json.JSONObject;
import org.springframework.http.HttpMethod;

public class JoggingTimeRegistrationRequest extends ApiRequest
{
    private Integer day = 1;
    private Integer month = 8;
    private Integer year = 2017;
    private Integer distance = 1000;
    private Integer time = 60;

    public JoggingTimeRegistrationRequest(ApiUser apiUser, ResultListener resultListener, CsrfToken csrfToken) {
        super(apiUser, resultListener, csrfToken);
    }

    @Override
    protected String getRequestBody() {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("day", day);
        jsonObject.put("month", month);
        jsonObject.put("year", year);
        jsonObject.put("distance", distance);
        jsonObject.put("time", time);
        return jsonObject.toString();
    }

    @Override
    protected HttpMethod getHttpMethod() {
        return POST;
    }

    @Override
    protected String getUrlPath() {
        return "joggingTime/create";
    }

    public JoggingTimeRegistrationRequest withDay(Integer day)
    {
        this.day = day;
        return this;
    }

    public JoggingTimeRegistrationRequest withMonth(Integer month)
    {
        this.month = month;
        return this;
    }

    public JoggingTimeRegistrationRequest withYear(Integer year)
    {
        this.year = year;
        return this;
    }

    public JoggingTimeRegistrationRequest withDistance(Integer distance)
    {
        this.distance = distance;
        return this;
    }

    public JoggingTimeRegistrationRequest withTime(Integer time)
    {
        this.time = time;
        return this;
    }
}
