package com.bingodelivery.api.client.request_data;

public class CsrfToken
{
    public static CsrfToken NULL = new CsrfToken();
    private String token;

    public void withToken(String token) {
        this.token = token;
    }

    public String getToken()
    {
        return token;
    }
}
