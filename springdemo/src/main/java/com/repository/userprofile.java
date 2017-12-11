package com.repository;


import com.entity.userprofileentity;
import org.springframework.data.repository.CrudRepository;

public interface userprofile extends CrudRepository<userprofileentity, Long> {

//
//    userprofileentity findByEmail(String email);
}
