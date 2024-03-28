package com.ucaldas.mssecurity.Repositories;

import com.ucaldas.mssecurity.Models.Session;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface SessionRepository extends MongoRepository<Session, String>{
    @Query ("{'user._id': ?0}")
    public Session getSessionByUser(String idUser);
}
