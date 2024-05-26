package com.ucaldas.mssecurity.Controllers;

import com.ucaldas.mssecurity.Models.Permission;
import com.ucaldas.mssecurity.Models.Session;
import com.ucaldas.mssecurity.Models.Statistic;
import com.ucaldas.mssecurity.Models.User;
import com.ucaldas.mssecurity.Repositories.SessionRepository;
import com.ucaldas.mssecurity.Repositories.StatisticRepository;
import com.ucaldas.mssecurity.Repositories.UserRepository;
import com.ucaldas.mssecurity.Services.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.HashMap;
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
    private StatisticRepository theStatisticRepository;

    @Autowired
    private JwtService thejwtService;

    @Autowired
    private SessionService theSessionService;

    @Autowired
    private NotificationService theNotificationService;

    @Autowired
    private ValidatorsService theValidatorService;

    /*@PostMapping("login")
    public HashMap<String, Object> login(@RequestBody User theUser, final HttpServletResponse response) throws IOException {

        HashMap<String, Object> responseMap = new HashMap<>();

        String token = "";
        User actualUser = theUserRepository.getUsersByEmail(theUser.getEmail());

        if (actualUser != null && actualUser.getPassword().equals(theEncryptionService.convertSHA256(theUser.getPassword()))) {

            token = this.thejwtService.generateToken(actualUser);
            theSessionService.verifySession(actualUser);

            theNotificationService.generateAndSend2FA(actualUser, token);

            actualUser.setPassword("");
            responseMap.put("user", actualUser);
            responseMap.put("token", token);
            return responseMap;

        }
        else if (actualUser!= null && !actualUser.getPassword().equals(theEncryptionService.convertSHA256(theUser.getPassword()))){
            erroresDeAutorizacion(actualUser);
        }
        else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
        }

        response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
        return responseMap;
    }*/

    @PostMapping("login")
    public boolean login(@RequestBody User theUser, final HttpServletResponse response) throws IOException {
        boolean respuesta = false;

        String token = "";
        User actualUser = theUserRepository.getUsersByEmail(theUser.getEmail());

        if (actualUser != null && actualUser.getPassword().equals(theEncryptionService.convertSHA256(theUser.getPassword()))) {

            token = this.thejwtService.generateToken(actualUser);
            theSessionService.verifySession(actualUser);

            theNotificationService.generateAndSend2FA(actualUser, token);

            respuesta = true;

            return respuesta;

        }
        else if (actualUser!= null && !actualUser.getPassword().equals(theEncryptionService.convertSHA256(theUser.getPassword()))){
            erroresDeAutorizacion(actualUser);
        }
        else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
        }

        response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
        return respuesta;
    }

    /*@PostMapping("login/2FA/{idUser}")
    public String login2FA(@RequestBody Session theSession, @PathVariable String idUser) {
        String response = "No ha iniciado sesión.";
        Session actualSession = theSessionRepository.getSessionByUser(idUser);
        User actualUser = theUserRepository.getUsersById(idUser);

        if (actualSession != null) {
            if (actualSession.getToken2FA() == theSession.getToken2FA()) {
                response = actualSession.getToken();
            } else {
                response = "No permitir entrar.";
                erroresDeAutorizacion(actualUser);
            }
        }

        return response;
    }*/

    @PostMapping("login/2FA/{idUser}")
    public HashMap<String, Object> login2FA(@PathVariable String idUser, @RequestBody Session theSession) {

        HashMap<String, Object> responseMap = new HashMap<>();
        System.out.println(theSession.getToken2FA());
        Session actualSession = theSessionRepository.getSessionByUser(idUser);
        User actualUser = theUserRepository.getUsersById(idUser);
        String token = actualSession.getToken();

        if (actualSession != null) {
            if (actualSession.getToken2FA() == theSession.getToken2FA()) {
                actualUser.setPassword("");
                responseMap.put("user", actualUser);
                responseMap.put("token", token);
                return responseMap;
            } else {
                erroresDeAutorizacion(actualUser);
                return responseMap;
            }
        }
        return responseMap;
    }

    @GetMapping("getUserId")
    public Map<String, String> getUserByEmail(String email){
        Map<String, String> response = new HashMap<>();
        User theUser = theUserRepository.getUsersByEmail(email);

        if (theUser != null){
            response.put("user_id", theUser.get_id());
        }

        return response;
    }


    public void erroresDeAutorizacion(User theUser){
        Statistic statistic = this.theStatisticRepository.getStatisticByIdUser(theUser.get_id());

        if (statistic != null){
            int erroresDeAutorizacion = statistic.getNumberErrorsAuthorization();
            erroresDeAutorizacion += 1;
            statistic.setNumberErrorsAuthorization(erroresDeAutorizacion);
            this.theStatisticRepository.save(statistic);

        }else{
            Statistic statisticNuevo = new Statistic(0,1);
            statisticNuevo.setUser(theUser);
            this.theStatisticRepository.save(statisticNuevo);
        }
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

    @PostMapping("permissions-validation")
    public  boolean permissionsValidation(final HttpServletRequest request, @RequestBody Permission thePermission){
        boolean success = this.theValidatorService.validationRolePermission(request, thePermission.getUrl(), thePermission.getMethod());
        return success;
    }

}
