package com.ucaldas.mssecurity.Repositories;

import com.ucaldas.mssecurity.Models.Fidelity;
import com.ucaldas.mssecurity.Models.Statistic;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface FidelityRepository extends MongoRepository<Fidelity, String> {
    @Query("{'user.$id':ObjectId(?0)}")
    Fidelity getFidelityByIdUser(String userId);
}
