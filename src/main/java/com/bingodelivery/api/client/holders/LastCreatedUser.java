package com.bingodelivery.api.client.holders;

public class LastCreatedUser
{
    private String userId;

    public String getUserId()
    {
        return userId;
    }

    public void withUserId(String userId)
    {
        this.userId = userId;
    }
}
