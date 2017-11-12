package com.bingodelivery.api.client.requests.api.joggingTime;

import static org.springframework.http.HttpMethod.POST;

import org.json.JSONObject;
import org.springframework.http.HttpMethod;
import com.bingodelivery.api.client.api_client.ApiUser;
import com.bingodelivery.api.client.api_client.CsrfToken;
import com.bingodelivery.api.client.requests.ResultListener;
import com.bingodelivery.api.client.requests.api.ApiRequest;

public class JoggingTimeListingRequest extends ApiRequest
{
    private Integer fromDay = 1;
    private Integer fromMonth = 8;
    private Integer fromYear = 2017;

    private Integer toDay = 7;
    private Integer toMonth = 8;
    private Integer toYear = 2017;

    public JoggingTimeListingRequest(ApiUser apiUser, ResultListener resultListener, CsrfToken csrfToken) {
        super(apiUser, resultListener, csrfToken);
    }

    @Override
    protected String getRequestBody() {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("from", createFromToObject(fromDay, fromMonth, fromYear));
        jsonObject.put("to", createFromToObject(toDay, toMonth, toYear));
        return jsonObject.toString();
    }

    private JSONObject createFromToObject(Integer fromDay, Integer fromMonth, Integer fromYear)
    {
        JSONObject from = new JSONObject();
        from.put("day", fromDay);
        from.put("month", fromMonth);
        from.put("year", fromYear);
        return from;
    }

    @Override
    protected HttpMethod getHttpMethod() {
        return POST;
    }

    @Override
    protected String getUrlPath() {
        return "joggingTime/getAll";
    }

    public JoggingTimeListingRequest withFromDay(Integer fromDay)
    {
        this.fromDay = fromDay;
        return this;
    }

    public JoggingTimeListingRequest withFromMonth(Integer fromMonth)
    {
        this.fromMonth = fromMonth;
        return this;
    }

    public JoggingTimeListingRequest withFromYear(Integer fromYear)
    {
        this.fromYear = fromYear;
        return this;
    }

    public JoggingTimeListingRequest withToDay(Integer toDay)
    {
        this.toDay = toDay;
        return this;
    }

    public JoggingTimeListingRequest withToMonth(Integer toMonth)
    {
        this.toMonth = toMonth;
        return this;
    }

    public JoggingTimeListingRequest withToYear(Integer toYear)
    {
        this.toYear = toYear;
        return this;
    }
}
