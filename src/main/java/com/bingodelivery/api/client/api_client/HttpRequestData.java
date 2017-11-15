package com.bingodelivery.api.client.api_client;

import org.springframework.http.HttpMethod;

public class HttpRequestData {
    private String apiUrl;
    private HttpMethod httpMethod = HttpMethod.GET;
    private String body = "{}";
    private String urlPath = "";
    private ApiUser apiUser = new ApiUser();
    private String contentType;
    private String authorization;
    private String csrfToken;

    public HttpMethod getHttpMethod() {
        return httpMethod;
    }

    public HttpRequestData setHttpMethod(HttpMethod httpMethod) {
        this.httpMethod = httpMethod;
        return this;
    }

    public String getBody() {
        return body;
    }

    public HttpRequestData setBody(String body) {
        this.body = body;
        return this;
    }

    public HttpRequestData setApiUrl(String apiUrl)
    {
        this.apiUrl = apiUrl;
        return this;
    }

    public String getUrlPath() {
        return this.apiUrl + urlPath;
    }

    public HttpRequestData setUrlPath(String urlPath) {
        this.urlPath = urlPath;
        return this;
    }

    public ApiUser getApiUser() {
        return apiUser;
    }

    public HttpRequestData setApiUser(ApiUser apiUser) {
        this.apiUser = apiUser;
        return this;
    }

    public HttpRequestData setContentType(String contentType)
    {
        this.contentType = contentType;
        return this;
    }

    public String getContentType()
    {
        return contentType;
    }

    public String getAuthorization()
    {
        return authorization;
    }

    public HttpRequestData setAuthorization(String authentication)
    {
        this.authorization = authentication;
        return this;
    }

    public String getCsrfToken()
    {
        return csrfToken;
    }

    public HttpRequestData setCsrfToken(String csrfToken)
    {
        this.csrfToken = csrfToken;
        return this;
    }

    @Override
    public String toString() {
        return "HttpRequestData{" +
                "apiUrl='" + apiUrl + '\'' +
                ", httpMethod=" + httpMethod +
                ", body='" + body + '\'' +
                ", urlPath='" + urlPath + '\'' +
                ", apiUser=" + apiUser +
                ", contentType='" + contentType + '\'' +
                ", authorization='" + authorization + '\'' +
                ", csrfToken='" + csrfToken + '\'' +
                '}';
    }
}
