package com.bingodelivery.spec.support.domain_holders;

import com.bingodelivery.api.client.requests.ResultListener;
import org.json.JSONArray;
import org.json.JSONObject;
import xyz.greatapp.libs.service.ServiceResult;

public class ServiceResultHolder implements ResultListener {
    private ServiceResult serviceResult = new ServiceResult(false, "");

    public ServiceResult get() {
        return serviceResult;
    }

    public void set(ServiceResult serviceResult) {
        this.serviceResult = serviceResult;
    }

    public JSONObject getJSONObject() {
        return new JSONObject(serviceResult.getObject());
    }

    public JSONArray getJSONArray() {
        return new JSONArray(serviceResult.getObject());
    }

    public JSONObject getFirstObjectIfArray() {
        if (serviceResult.getObject().startsWith("["))
            return new JSONArray(serviceResult.getObject()).getJSONObject(0);

        return new JSONObject(serviceResult.getObject());
    }
}
