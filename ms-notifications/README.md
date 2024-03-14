# Enviador de Correos Electrónicos con Flask y Azure

Esta es una aplicación Flask que expone un punto final `/send_email` para enviar correos electrónicos utilizando los Servicios de Comunicación de Azure.

## Configuración

1. Asegúrate de tener Python instalado en tu sistema.
2. Instala los paquetes necesarios usando `pip install -r requirements.txt`.
3. Configura tus variables de entorno en un archivo `.env`. Las variables requeridas son:
   - `CONNECTION_STRING`: Cadena de conexión de los Servicios de Comunicación de Azure.
   - `SENDER_ADDRESS`: Dirección de correo electrónico del remitente.
4. Ejecuta la aplicación Flask usando `python app.py`.

## Puntos finales

### Enviar Correo Electrónico [/send_email]

#### Enviar Correo Electrónico [POST]

Envía un correo electrónico utilizando los datos de correo electrónico proporcionados.

+ Solicitud (application/json)

    + Cuerpo

            {
                "address": "destinatario@example.com",
                "subject": "Correo de Prueba",
                "plainText": "Este es un correo de prueba enviado desde Flask."
            }

+ Respuesta 200 (application/json)

    + Cuerpo

            {
                "message": "Correo enviado exitosamente"
            }

+ Respuesta 400 (application/json)

    + Cuerpo

            {
                "error": "Faltan campos requeridos"
            }

+ Respuesta 500 (application/json)

    + Cuerpo

            {
                "error": "Se produjo un error al enviar el correo electrónico"
            }

## Mejoras

1. **Error en Variable de Entorno**: Asegúrate de que la variable de entorno esté escrita correctamente.
2. **Manejo de Errores**: Maneja diferentes tipos de excepciones por separado para una mejor notificación de errores.
3. **Validación de Entrada**: Valida los datos de entrada para asegurarse de que cumplan con el formato y contenido esperados.
4. **Registro**: Agrega declaraciones de registro para depuración y monitoreo.
5. **Seguridad**: Asegura información sensible como las cadenas de conexión y las direcciones de remitente.


