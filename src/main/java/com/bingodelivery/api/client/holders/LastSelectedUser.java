package com.bingodelivery.api.client.holders;

public class LastSelectedUser
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
