# Microservicio de Seguridad (MS Security)

Este proyecto es un microservicio de seguridad que proporciona funcionalidades relacionadas con la autenticación, autorización y gestión de usuarios, roles y permisos en una aplicación web.

## Descripción general

El microservicio de seguridad está desarrollado en Java utilizando el framework Spring Boot y se integra con una base de datos MongoDB para almacenar la información de usuarios, roles y permisos. Proporciona un conjunto de API RESTful para realizar operaciones CRUD (crear, leer, actualizar, eliminar) sobre estos recursos, así como endpoints para autenticación y autorización.

## Estructura del proyecto

El proyecto está estructurado de la siguiente manera:

- **Controllers:** Contiene los controladores REST para manejar las solicitudes HTTP relacionadas con usuarios, roles, permisos y seguridad.
- **Models:** Define las clases que representan los recursos de la aplicación, como User, Role, Permission, etc.
- **Repositories:** Contiene las interfaces de repositorio para interactuar con la base de datos MongoDB.
- **Services:** Contiene los servicios que encapsulan la lógica de negocio, como la generación de tokens JWT, encriptación de contraseñas, validación de roles y permisos, etc.
- **Interceptors:** Define los interceptores que se aplican a las solicitudes HTTP para realizar tareas de seguridad, como la verificación de tokens JWT.
- **Configurations:** Contiene las configuraciones de la aplicación, como la configuración de interceptores.

## Funcionalidades principales

- **Autenticación y autorización:** Los usuarios pueden autenticarse en la aplicación mediante el endpoint `/api/public/security/login`, que devuelve un token JWT válido para realizar solicitudes autenticadas.
- **Gestión de usuarios:** Permite la creación, recuperación, actualización y eliminación de usuarios.
- **Gestión de roles y permisos:** Permite la creación, recuperación y eliminación de roles y permisos, así como la asignación de permisos a roles.
- **Validación de roles y permisos:** Implementa un interceptor de seguridad que valida los roles y permisos de los usuarios para cada solicitud HTTP.

## Configuración

Antes de ejecutar la aplicación, asegúrate de configurar correctamente las propiedades del archivo `application.properties` para la conexión a la base de datos MongoDB y otras configuraciones relacionadas con la seguridad.

## Dependencias

El proyecto utiliza las siguientes dependencias:

```xml
<dependencies>

    <!-- JSON Web Token (JWT) -->
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.11.5</version>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-impl</artifactId>
        <version>0.11.5</version>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-jackson</artifactId>
        <version>0.11.5</version>
    </dependency>

    <!-- Spring Boot -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-mongodb</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!-- Lombok -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>

    <!-- Spring Boot Test -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>

</dependencies>
```

## Ejecución

Para ejecutar la aplicación, simplemente ejecuta la clase `MsSecurityApplication` como una aplicación Spring Boot. La aplicación se iniciará en el puerto predeterminado (generalmente el puerto 8080).

