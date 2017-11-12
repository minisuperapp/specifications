package com.bingodelivery.api.client.util;

import static java.util.Objects.nonNull;

import org.json.JSONObject;
import xyz.greatapp.libs.service.ServiceResult;

public class ParserUtil {
    public static ServiceResult toServiceResult(String json) {
        try {
            JSONObject jsonObject = new JSONObject(json);
            boolean success = jsonObject.getBoolean("success");
            String message = jsonObject.getString("message");
            String object = "{}";
            if (jsonObject.has("object") &&
                    nonNull(jsonObject.get("object")) &&
                    !jsonObject.isNull("object") &&
                    !jsonObject.getString("object").equals(""))
            {
                object = jsonObject.getString("object");
            }
            return new ServiceResult(success, message, object);
        } catch (Exception ex) {
            throw new RuntimeException("Error when parsing JSON to Service Result. JSON String: " + json, ex);
        }

    }
}
