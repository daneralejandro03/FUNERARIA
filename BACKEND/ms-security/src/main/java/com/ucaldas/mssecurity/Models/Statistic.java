package com.ucaldas.mssecurity.Models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Statistic {
    @Id
    private String _id;
    private int numberErrorsValidation;
    private int numberErrorsAuthorization;

    @DBRef
    private User user;

    public Statistic() {
    }

    public Statistic(int numberErrorsValidation, int numberErrorsAuthorization) {
        this.numberErrorsValidation = numberErrorsValidation;
        this.numberErrorsAuthorization = numberErrorsAuthorization;
    }

    public String get_id() {
        return _id;
    }

    public int getNumberErrorsValidation() {
        return numberErrorsValidation;
    }

    public void setNumberErrorsValidation(int numberErrorsValidation) {
        this.numberErrorsValidation = numberErrorsValidation;
    }

    public int getNumberErrorsAuthorization() {
        return numberErrorsAuthorization;
    }

    public void setNumberErrorsAuthorization(int numberErrorsAuthorization) {
        this.numberErrorsAuthorization = numberErrorsAuthorization;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
