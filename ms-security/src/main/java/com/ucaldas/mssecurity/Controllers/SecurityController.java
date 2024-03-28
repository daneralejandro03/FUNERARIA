package com.ucaldas.mssecurity.Controllers;

import com.ucaldas.mssecurity.Models.Session;
import com.ucaldas.mssecurity.Models.User;
import com.ucaldas.mssecurity.Repositories.SessionRepository;
import com.ucaldas.mssecurity.Repositories.UserRepository;
import com.ucaldas.mssecurity.Services.EncryptionService;
import com.ucaldas.mssecurity.Services.JwtService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

@CrossOrigin
@RestController
@RequestMapping("/api/public/security")
public class SecurityController {

    @Autowired
    private UserRepository theUserRepository;

    @Autowired
    private SessionRepository theSessionRepository;

    @Autowired
    private EncryptionService theEncryptionService;

    @Autowired
    private JwtService theJwtService;

    @PostMapping("login")
    public String login(@RequestBody User theUser, final HttpServletResponse response) throws IOException {
        String token = "";

        User actualUser=this.theUserRepository.getUsersByEmail(theUser.getEmail());

        if (actualUser != null && actualUser.getPassword().equals(this.theEncryptionService.convertSHA256(theUser.getPassword()))){
            token = this.theJwtService.generateToken(actualUser);

            Send2FA(actualUser, token);

        }else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
        }
        return token;
    }

    //Nuevo
    public void Send2FA(User user, String token){
        verifySession(user);

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
        this.theSessionRepository.save(theSession);

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> map = new HashMap<>();
        map.put("address", user.getEmail());
        map.put("subject", "Su token de 2FA");
        map.put("plainText", "Su token es: " + token2FA);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(map, headers);
        String url = "http://localhost:5000/send_email";
        restTemplate.postForObject(url, entity, String.class);
    }

    public void verifySession(User user){
        Session theSession = this.theSessionRepository.getSessionByUser(user.get_id());

        if (theSession != null){
            this.theSessionRepository.delete(theSession);
        }
    }

    @PostMapping("login/2FA/{idUser}")
    public String login2FA(@RequestBody Session theSession, @PathVariable String idUser){
        String response = "No ha iniciado sesión.";

        Session actualSession = this.theSessionRepository.getSessionByUser(idUser);

        if (actualSession != null){
            if (actualSession.getToken2FA() == theSession.getToken2FA()){
                response = "Conceder acceso.";
            }
            else {
                response = "No permitir entrar.";
            }
        }

        return response;
    }

}
