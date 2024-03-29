package com.ucaldas.mssecurity.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.Date;

public class Session {

    @Id
    private String _id;
    private int token2FA;
    private String token;
    private Date startAt;
    private Date endAt;

    @DBRef
    private User user;

    public Session(){}

    public Session(int token2FA, String token, Date startAt, Date endAt) {
        this.token2FA = token2FA;
        this.token = token;
        this.startAt = startAt;
        this.endAt = endAt;
    }

    public String get_id() {
        return _id;
    }

    public int getToken2FA() {
        return token2FA;
    }

    public void setToken2FA(int token2FA) {
        this.token2FA = token2FA;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Date getStartAt() {
        return startAt;
    }

    public void setStartAt(Date startAt) {
        this.startAt = startAt;
    }

    public Date getEndAt() {
        return endAt;
    }

    public void setEndAt(Date endAt) {
        this.endAt = endAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
