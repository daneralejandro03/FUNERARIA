package com.ucaldas.mssecurity.Services;

import com.ucaldas.mssecurity.Models.*;
import com.ucaldas.mssecurity.Repositories.PermissionRepository;
import com.ucaldas.mssecurity.Repositories.RolePermissionRepository;
import com.ucaldas.mssecurity.Repositories.StatisticRepository;
import com.ucaldas.mssecurity.Repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
public class ValidatorsService {
    @Autowired
    private JwtService jwtService;

    @Autowired
    private PermissionRepository thePermissionRepository;
    @Autowired
    private UserRepository theUserRepository;
    @Autowired
    private RolePermissionRepository theRolePermissionRepository;
    @Autowired
    private StatisticRepository theStatisticRepository;
    private static final String BEARER_PREFIX = "Bearer ";
    public boolean validationRolePermission(HttpServletRequest request,String url,String method){
        boolean success=false;
        User theUser=this.getUser(request);
        if(theUser!=null){
            Role theRole=theUser.getRole();
            System.out.println("Antes URL "+url+" metodo "+method);
            url = url.replaceAll("[0-9a-fA-F]{24}|\\d+", "?");
            System.out.println("URL "+url+" metodo "+method);
            Permission thePermission=this.thePermissionRepository.getPermission(url,method);
            if(theRole!=null && thePermission!=null){
                System.out.println("Rol "+theRole.getName()+ " Permission "+thePermission.getUrl());
                RolePermission theRolePermission=this.theRolePermissionRepository.getRolePermission(theRole.get_id(),thePermission.get_id());
                if (theRolePermission!=null){
                    success=true;
                }
            }else{
                success=false;

                erroresDeValidacion(theUser);

            }
        }
        return success;
    }

    public void erroresDeValidacion(User theUser){
        Statistic statistic = this.theStatisticRepository.getStatisticByIdUser(theUser.get_id());

        if (statistic != null){
            int erroresDeValidacion = statistic.getNumberErrorsValidation();
            erroresDeValidacion += 1;
            statistic.setNumberErrorsValidation(erroresDeValidacion);
            this.theStatisticRepository.save(statistic);

        }else{
            Statistic statisticNuevo = new Statistic(1,0);
            statisticNuevo.setUser(theUser);
            this.theStatisticRepository.save(statisticNuevo);
        }
    }

    public User getUser(final HttpServletRequest request) {
        User theUser=null;
        String authorizationHeader = request.getHeader("Authorization");
        System.out.println("Header "+authorizationHeader);
        if (authorizationHeader != null && authorizationHeader.startsWith(BEARER_PREFIX)) {
            String token = authorizationHeader.substring(BEARER_PREFIX.length());
            System.out.println("Bearer Token: " + token);
            User theUserFromToken=jwtService.getUserFromToken(token);
            System.out.println("User from token: "+theUserFromToken);
            if(theUserFromToken!=null) {
                theUser= this.theUserRepository.findById(theUserFromToken.get_id())
                        .orElse(null);
                theUser.setPassword("");
            }
        }
        return theUser;
    }
}
