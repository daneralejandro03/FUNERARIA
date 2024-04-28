package com.ucaldas.mssecurity.Services;

import com.ucaldas.mssecurity.Models.Session;
import com.ucaldas.mssecurity.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;


@Service
public class NotificationService {

    @Autowired
    private SessionService theSessionService;

    @Value("${notifications.baseurl}")
    private String emailServiceUrl;

    public void send2FAEmail(User user, Session session) {
        Map<String, Object> emailContent = new HashMap<>();
        emailContent.put("address", user.getEmail());
        emailContent.put("subject", "Su token de 2FA");
        emailContent.put("plainText", "Su token es: " + session.getToken2FA());

        sendEmail(emailContent);
    }

    public void sendPasswordResetEmail(String email, String resetToken) {
        // Construir el contenido del correo electrónico con el enlace al formulario de restablecimiento de contraseña, incluyendo el token en el enlace
        Map<String, Object> emailContent = new HashMap<>();
        emailContent.put("address", email);
        emailContent.put("subject", "Restablecimiento de contraseña");
        emailContent.put("plainText", "Hemos recibido una solicitud para restablecer tu contraseña. Por favor, copia el siguiente TOKEN para restablecer su contraseña:\n\n"
                + "TOKEN = " + resetToken + "\n\n"
                + "Si no solicitaste un restablecimiento de contraseña, puedes ignorar este mensaje.\n\n"
                + "Saludos,\n"
                + "Equipo de Soporte");

        // Enviar el correo electrónico al usuario
        sendEmail(emailContent);
    }
    public void sendEmail(Map<String, Object> emailContent) {
        RestTemplate restTemplate = new RestTemplate();

        // Configurar las cabeceras HTTP
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Crear la entidad HTTP con los datos del correo electrónico y las cabeceras
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(emailContent, headers);

        // Enviar la solicitud POST al servicio de envío de correo electrónico
        restTemplate.postForObject(emailServiceUrl, entity, String.class);
    }

    public String generateAndSend2FA(User user, String token) {
        Session theSession = theSessionService.createSession(user, token);

        if (theSession != null) {
            send2FAEmail(user, theSession);
            return theSession.getToken();
        } else {
            return "";
        }
    }

}
