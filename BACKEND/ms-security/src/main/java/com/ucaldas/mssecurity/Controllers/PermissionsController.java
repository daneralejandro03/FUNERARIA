package com.ucaldas.mssecurity.Controllers;

import com.ucaldas.mssecurity.Models.Permission;
import com.ucaldas.mssecurity.Repositories.PermissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/permissions")
public class PermissionsController {
    
    @Autowired
    private PermissionRepository thePermissionRepository;

    @GetMapping("")
    public List<Permission> findAll(){
        return this.thePermissionRepository.findAll();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Permission create(@RequestBody Permission theNewPermission){
        return this.thePermissionRepository.save(theNewPermission);
    }

    @GetMapping("{id}")
    public Permission findById(@PathVariable String id) {
        Permission thePermission = this.thePermissionRepository
                .findById(id)
                .orElse(null);
        return thePermission;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Permission> update(@PathVariable String id, @RequestBody Permission updatedPermission) {
        Permission existingPermission = thePermissionRepository.findById(id).orElse(null);
        if (existingPermission != null) {
            existingPermission.setUrl(updatedPermission.getUrl());
            existingPermission.setMethod(updatedPermission.getMethod());
            Permission updated = thePermissionRepository.save(existingPermission);
            return ResponseEntity.ok().body(updated);
        } else {
            return ResponseEntity.notFound().build(); // Manejo de permiso no encontrado
        }
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id}")
    public void delete(@PathVariable String id) {
        Permission thePermission = this.thePermissionRepository
                .findById(id)
                .orElse(null);
        if (thePermission != null) {
            this.thePermissionRepository.delete(thePermission);
        }
    }

}
