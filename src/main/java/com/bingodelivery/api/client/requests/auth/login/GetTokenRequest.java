package com.bingodelivery.api.client.requests.auth.login;

import com.bingodelivery.api.client.requests.ResultListener;
import com.bingodelivery.api.client.requests.auth.AuthRequest;
import org.springframework.http.HttpMethod;

import static org.springframework.http.HttpMethod.POST;

public class GetTokenRequest extends AuthRequest
{
    private String username = "test@greatapp.xyz";
    private String password = "secret";

    public GetTokenRequest(ResultListener resultListener)
    {
        super(resultListener);
    }

    @Override
    protected String getRequestBody()
    {
        return "grant_type=password&client_id=greatappxyz&username=" + username + "&password=" + password;
    }

    @Override
    protected HttpMethod getHttpMethod()
    {
        return POST;
    }

    @Override
    protected String getUrlPath()
    {
        return "oauth/token";
    }

    public GetTokenRequest withUsername(String username)
    {
        this.username = username;
        return this;
    }

    public GetTokenRequest withPassword(String password)
    {
        this.password = password;
        return this;
    }
}
