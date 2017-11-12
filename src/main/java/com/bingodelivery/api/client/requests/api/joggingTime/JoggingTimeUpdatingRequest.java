package com.bingodelivery.api.client.requests.api.joggingTime;

import static org.springframework.http.HttpMethod.PUT;

import com.bingodelivery.api.client.api_client.ApiUser;
import com.bingodelivery.api.client.api_client.CsrfToken;
import com.bingodelivery.api.client.requests.ResultListener;
import com.bingodelivery.api.client.requests.api.ApiRequest;
import org.json.JSONObject;
import org.springframework.http.HttpMethod;

public class JoggingTimeUpdatingRequest extends ApiRequest
{
    private String joggingTimeId = "";
    private Integer day = 1;
    private Integer month = 8;
    private Integer year = 2017;
    private Integer distance = 1000;
    private Integer time = 60;

    public JoggingTimeUpdatingRequest(ApiUser apiUser, ResultListener resultListener, CsrfToken csrfToken)
    {
        super(apiUser, resultListener, csrfToken);
    }

    @Override
    protected String getRequestBody()
    {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("jogging_times_id", joggingTimeId);
        jsonObject.put("day", day);
        jsonObject.put("month", month);
        jsonObject.put("year", year);
        jsonObject.put("distance", distance);
        jsonObject.put("time", time);
        return jsonObject.toString();
    }

    @Override
    protected HttpMethod getHttpMethod()
    {
        return PUT;
    }

    @Override
    protected String getUrlPath()
    {
        return "joggingTime/update";
    }

    public JoggingTimeUpdatingRequest withDay(Integer day)
    {
        this.day = day;
        return this;
    }

    public JoggingTimeUpdatingRequest withMonth(Integer month)
    {
        this.month = month;
        return this;
    }

    public JoggingTimeUpdatingRequest withYear(Integer year)
    {
        this.year = year;
        return this;
    }

    public JoggingTimeUpdatingRequest withDistance(Integer distance)
    {
        this.distance = distance;
        return this;
    }

    public JoggingTimeUpdatingRequest withTime(Integer time)
    {
        this.time = time;
        return this;
    }

    public JoggingTimeUpdatingRequest withJoggingTimeId(String joggingTimeId)
    {
        this.joggingTimeId = joggingTimeId;
        return this;
    }
}
