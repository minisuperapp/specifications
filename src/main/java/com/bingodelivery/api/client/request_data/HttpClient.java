package com.bingodelivery.api.client.request_data;

import static java.util.Objects.nonNull;
import static org.springframework.http.HttpMethod.HEAD;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

public class HttpClient
{
    public String getRestResponse(HttpRequestData httpRequestData)
    {
        HttpEntity<String> entity = new HttpEntity<>(httpRequestData.getBody(), getHttpHeaders(httpRequestData));
        ResponseEntity<String> responseEntity;
        try {
            responseEntity = getRestTemplate().exchange(
                    httpRequestData.getUrlPath(),
                    httpRequestData.getHttpMethod(),
                    entity,
                    String.class);
        } catch (HttpClientErrorException e) {
            System.out.println(httpRequestData);
            if (httpRequestData.getHttpMethod() == HEAD) {
                return getXSRFToken(e);
            }
            if (e.getRawStatusCode() == 403) {
                return createServiceResult(false, "");
            }
            throw e;
        }
        return responseEntity.getBody();
    }

    private String getXSRFToken(HttpClientErrorException e)
    {
        List<String> headers = e.getResponseHeaders().get("Set-Cookie");
        if(headers == null)
            return createServiceResult(true, "");

        for (String header : headers)
        {
            if (header.startsWith("XSRF-TOKEN"))
            {
                String token = header.split("=")[1];
                if (token.contains(";"))
                {
                    token = token.substring(0, token.indexOf(";"));
                }
                return createServiceResult(true, token);
            }
        }
        return createServiceResult(true, "");
    }

    private String createServiceResult(boolean success, String body)
    {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("success", success);
        jsonObject.put("message", "");
        jsonObject.put("object", body);
        return jsonObject.toString();
    }

    private HttpHeaders getHttpHeaders(HttpRequestData httpRequestData)
    {
        HttpHeaders headers = new HttpHeaders();
        if (httpRequestData == null)
        {
            return headers;
        }
        if (nonNull(httpRequestData.getAuthorization()) && httpRequestData.getAuthorization().length() > 0)
        {
            headers.set("Authorization", httpRequestData.getAuthorization());
        }
        if (nonNull(httpRequestData.getCsrfToken()) && httpRequestData.getCsrfToken().length() > 0)
        {
            headers.set("X-XSRF-TOKEN", httpRequestData.getCsrfToken());
            headers.add("Cookie", "XSRF-TOKEN=" + httpRequestData.getCsrfToken());
        }
        headers.set("Accept", "*/*");
        headers.set("Content-Type", httpRequestData.getContentType());
        return headers;
    }

    private RestTemplate getRestTemplate()
    {
        RestTemplate restTemplate = new RestTemplate();
        List<HttpMessageConverter< ? >> list = new ArrayList<>();
        list.add(new StringHttpMessageConverter());
        restTemplate.setMessageConverters(list);
        return restTemplate;
    }
}
