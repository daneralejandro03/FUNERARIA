package com.ucaldas.mssecurity.Controllers;

import com.ucaldas.mssecurity.Models.Session;
import com.ucaldas.mssecurity.Models.User;
import com.ucaldas.mssecurity.Repositories.SessionRepository;
import com.ucaldas.mssecurity.Repositories.UserRepository;
import com.ucaldas.mssecurity.Services.EncryptionService;
import com.ucaldas.mssecurity.Services.JwtService;
import com.ucaldas.mssecurity.Services.NotificationService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Map;


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
    private JwtService thejwtService;

    @Autowired
    private NotificationService theNotificationService;

    @PostMapping("login")
    public String login(@RequestBody User theUser, final HttpServletResponse response) throws IOException {
        String token = "";

        User actualUser = theUserRepository.getUsersByEmail(theUser.getEmail());

        if (actualUser != null && actualUser.getPassword().equals(theEncryptionService.convertSHA256(theUser.getPassword()))) {

            token = this.thejwtService.generateToken(actualUser);
            theNotificationService.generateAndSend2FA(actualUser, token);

        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
        }

        return token;
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
            String resetToken = thejwtService.generatePasswordResetToken(user);
            // Enviar correo electrónico con el token
            theNotificationService.sendPasswordResetEmail(user.getEmail(), resetToken);
        }
    }

    @PostMapping("/reset-password")
    public void resetPassword(@RequestBody Map<String, String> requestBody) {
        String resetToken = requestBody.get("token");
        String newPassword = requestBody.get("newPassword");
        System.out.println("Token recibido: "+ resetToken);
        try{
        if (thejwtService.validatePasswordResetToken(resetToken)) {
            System.out.println("Token válido: "+ resetToken);
            String userEmail = thejwtService.getUserIdEmailFromPasswordResetToken(resetToken);
            System.out.println("Email del de usuario: "+ userEmail);
            User user = theUserRepository.getUsersByEmail(userEmail);
            if (user != null) {
                user.setPassword(theEncryptionService.convertSHA256(newPassword));
                theUserRepository.save(user);
                System.out.println("Contraseña cambiada para el usuario con Correo: " + userEmail);
            }
        } else {
            System.out.println("Token inválido: "+ resetToken);
        }
        }catch (Exception e){
            System.out.println("Error al validar el token:: "+ e);
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
