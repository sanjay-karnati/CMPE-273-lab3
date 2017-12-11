package com.repository;


import com.entity.activityentity;
import org.springframework.data.repository.CrudRepository;

public interface activityrepository extends CrudRepository<activityentity,Long> {
    Iterable<activityentity> findByEmail(String email);


}
