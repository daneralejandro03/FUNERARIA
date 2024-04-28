package com.ucaldas.mssecurity.Services;

import com.ucaldas.mssecurity.Models.Session;
import com.ucaldas.mssecurity.Models.User;
import com.ucaldas.mssecurity.Repositories.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Random;

@Service
public class SessionService {

    @Autowired
    private SessionRepository theSessionRepository;

    public Session createSession(User user, String token) {
        Session theSession = new Session();
        Random rand = new Random();
        int token2FA = rand.nextInt(9000) + 1000;
        Date startAt = new Date();
        long ONE_HOUR_IN_MILLIS = 60 * 60 * 1000;
        Date endAt = new Date(startAt.getTime() + ONE_HOUR_IN_MILLIS);

        theSession.setToken2FA(token2FA);
        theSession.setToken(token);
        theSession.setStartAt(startAt);
        theSession.setEndAt(endAt);
        theSession.setUser(user);

        return theSessionRepository.save(theSession);
    }

    public void verifySession(User user){
        Session theSession = this.theSessionRepository.getSessionByUser(user.get_id());

        if (theSession != null){
            this.theSessionRepository.delete(theSession);
        }
    }
    
}
