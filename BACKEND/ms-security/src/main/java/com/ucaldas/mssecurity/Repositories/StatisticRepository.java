package com.ucaldas.mssecurity.Repositories;

import com.ucaldas.mssecurity.Models.Statistic;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface StatisticRepository extends MongoRepository <Statistic, String> {
    @Query ("{'user.$id':ObjectId(?0)}")
    Statistic getStatisticByIdUser(String userId);
}
