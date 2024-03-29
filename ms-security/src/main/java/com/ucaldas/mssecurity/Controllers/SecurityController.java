package com.ucaldas.mssecurity.Controllers;

import com.ucaldas.mssecurity.Models.Session;
import com.ucaldas.mssecurity.Models.User;
import com.ucaldas.mssecurity.Repositories.SessionRepository;
import com.ucaldas.mssecurity.Repositories.UserRepository;
import com.ucaldas.mssecurity.Services.EncryptionService;
import com.ucaldas.mssecurity.Services.JwtService;
import com.ucaldas.mssecurity.Services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@CrossOrigin
@RestController
@RequestMapping("/api/public/security")
public class SecurityController {

    @Autowired
    private UserRepository theUserRepository;

    @Autowired
    private EncryptionService theEncryptionService;

    @Autowired
    private SessionRepository theSessionRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private NotificationService theNotificationService;

    @PostMapping("login")
    public String login(@RequestBody User theUser) {
        String token = "";
        User actualUser = theUserRepository.getUsersByEmail(theUser.getEmail());

        if (actualUser != null && actualUser.getPassword().equals(theEncryptionService.convertSHA256(theUser.getPassword()))) {
            token = generateAndSend2FA(actualUser);
        }

        return token;
    }

    private String generateAndSend2FA(User user) {
        Session theSession = createSession(user);

        if (theSession != null) {
            send2FAEmail(user, theSession);
            return theSession.getToken();
        } else {
            return "";
        }
    }

    private Session createSession(User user) {
        Session theSession = new Session();
        Random rand = new Random();
        int token2FA = rand.nextInt(9000) + 1000;
        Date startAt = new Date();
        long ONE_HOUR_IN_MILLIS = 60 * 60 * 1000;
        Date endAt = new Date(startAt.getTime() + ONE_HOUR_IN_MILLIS);

        theSession.setToken2FA(token2FA);
        theSession.setStartAt(startAt);
        theSession.setEndAt(endAt);
        theSession.setUser(user);

        return theSessionRepository.save(theSession);
    }

    private void send2FAEmail(User user, Session session) {
        Map<String, Object> emailContent = new HashMap<>();
        emailContent.put("address", user.getEmail());
        emailContent.put("subject", "Su token de 2FA");
        emailContent.put("plainText", "Su token es: " + session.getToken2FA());

        theNotificationService.sendEmail(emailContent);
    }


    @PostMapping("login/2FA/{idUser}")
    public String login2FA(@RequestBody Session theSession, @PathVariable String idUser) {
        String response = "No ha iniciado sesión.";

        Session actualSession = theSessionRepository.getSessionByUser(idUser);

        if (actualSession != null) {
            if (actualSession.getToken2FA() == theSession.getToken2FA()) {
                response = "Conceder acceso.";
            } else {
                response = "No permitir entrar.";
            }
        }

        return response;
    }

    @PostMapping("/forgot-password")
    public void forgotPassword(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");
        User user = theUserRepository.getUsersByEmail(email);
        if (user != null) {
            // Generar token de restablecimiento de contraseña
            String resetToken = jwtService.generatePasswordResetToken(user);
            // Enviar correo electrónico con el token
            theNotificationService.sendPasswordResetEmail(user.getEmail(), resetToken);
        }
    }

    @PostMapping("/reset-password")
    public void resetPassword(@RequestBody Map<String, String> requestBody) {
        String resetToken = requestBody.get("token");
        String newPassword = requestBody.get("newPassword");
        if (jwtService.validatePasswordResetToken(resetToken)) {
            String userId = jwtService.getUserIdFromPasswordResetToken(resetToken);
            User user = theUserRepository.findById(userId).orElse(null);
            if (user != null) {
                user.setPassword(theEncryptionService.convertSHA256(newPassword));
                theUserRepository.save(user);
            }
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");
        String currentPassword = requestBody.get("currentPassword");
        String newPassword = requestBody.get("newPassword");

        User user = theUserRepository.getUsersByEmail(email);
        if (user != null && user.getPassword().equals(theEncryptionService.convertSHA256(currentPassword))) {
            user.setPassword(theEncryptionService.convertSHA256(newPassword));
            theUserRepository.save(user);
            return ResponseEntity.ok("Contraseña cambiada exitosamente");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
    }
}
