package com.bingodelivery.api.client.requests;

import xyz.greatapp.libs.service.ServiceResult;

public interface ResultListener {
    ResultListener NULL = serviceResult -> {
    };

    void set(ServiceResult serviceResult);
}
