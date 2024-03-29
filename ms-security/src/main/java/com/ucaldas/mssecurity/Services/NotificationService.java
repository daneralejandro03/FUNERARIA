package com.ucaldas.mssecurity.Services;

import com.ucaldas.mssecurity.Models.User;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;


@Service
public class NotificationService {
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

        // URL del servicio de envío de correo electrónico
        String url = "http://localhost:5000/send_email";

        // Enviar la solicitud POST al servicio de envío de correo electrónico
        restTemplate.postForObject(url, entity, String.class);
    }

}
