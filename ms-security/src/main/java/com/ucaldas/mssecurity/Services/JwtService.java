package com.ucaldas.mssecurity.Services;

import com.ucaldas.mssecurity.Models.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
@Service
public class JwtService {
    @Value("${jwt.secret}")
    private String secret; // Esta es la clave secreta que se utiliza para firmar el token. Debe mantenerse segura.

    @Value("${jwt.expiration}")
    private Long expiration; // Tiempo de expiración del token en milisegundos.

    // Clave secreta para firmar y verificar los tokens JWT
    private static final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    // Método para validar si un token JWT es válido y no ha expirado
    public static boolean validatePasswordResetToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(getSecretKey()).build().parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            // El token ha expirado
            System.out.println("El token ha expirado: " + e.getMessage());
            return false;
        } catch (MalformedJwtException e) {
            // El token no tiene el formato correcto
            System.out.println("El token no tiene el formato correcto: " + e.getMessage());
            return false;
        } catch (SignatureException e) {
            // La firma del token es inválida
            System.out.println("La firma del token es inválida: " + e.getMessage());
            return false;
        } catch (Exception e) {
            // Otra excepción no prevista
            e.printStackTrace();
            return false;
        }
    }


    // Método para extraer y retornar el Email de usuario incrustado en el token JWT
    public static String getUserIdEmailFromPasswordResetToken(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(getSecretKey()).build().parseClaimsJws(token).getBody();
        return claims.getSubject();
    }

    // Método privado para obtener la clave secreta
    private static SecretKey getSecretKey() {
        byte[] keyBytes = secretKey.getEncoded();
        return Keys.hmacShaKeyFor(keyBytes);
    }
    public String generateToken(User theUser) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expiration);
        Map<String, Object> claims = new HashMap<>();
        claims.put("_id", theUser.get_id());
        claims.put("name", theUser.getName());
        claims.put("email", theUser.getEmail());
        claims.put("role", theUser.getRole());

        return Jwts.builder()


                .setClaims(claims)
                .setSubject(theUser.getName())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(secretKey)
                .compact();
    }
    public boolean validateToken(String token) {
        try {
            Jws<Claims> claimsJws = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token);

            // Verifica la expiración del token
            Date now = new Date();
            if (claimsJws.getBody().getExpiration().before(now)) {
                return false;
            }

            return true;
        } catch (SignatureException ex) {
            // La firma del token es inválida
            return false;
        } catch (Exception e) {
            // Otra excepción
            return false;
        }
    }


    public User getUserFromToken(String token) {
        try {
            Jws<Claims> claimsJws = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token);

            Claims claims = claimsJws.getBody();

            User user = new User();
            user.set_id((String) claims.get("_id"));
            user.setName((String) claims.get("name"));
            user.setEmail((String) claims.get("email"));
            return user;
        } catch (Exception e) {
            // En caso de que el token sea inválido o haya expirado
            return null;
        }
    }

    // Método para generar un token de restablecimiento de contraseña
    public String generatePasswordResetToken(User user) {
        try {
            // Utilizar la misma clave secreta para firmar el token
            SecretKey secretKey = getSecretKey();

            // Fecha y hora actual
            Date now = new Date();

            // Fecha y hora de expiración del token (1 hora desde ahora)
            Date expiryDate = new Date(now.getTime() + 3600000); // 1 hora en milisegundos

            // Construir el token JWT con la información del usuario y la fecha de expiración
            String token = Jwts.builder()
                    .setSubject(user.getEmail()) // Establecer el correo electrónico del usuario como sujeto del token
                    .setIssuedAt(now) // Establecer la fecha y hora de emisión del token
                    .setExpiration(expiryDate) // Establecer la fecha y hora de expiración del token
                    .signWith(secretKey) // Firmar el token con la clave secreta
                    .compact(); // Compactar el token en una cadena

            // Retornar el token generado
            return token;
        } catch (Exception e) {
            // Manejar cualquier excepción que ocurra durante la generación del token
            System.out.println("Error al generar el token de restablecimiento de contraseña: " + e.getMessage());
            return null;
        }
    }

}
