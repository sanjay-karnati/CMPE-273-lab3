package com.repository;

import com.entity.User;
import com.entity.file;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;
import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository

public interface FileRepository extends CrudRepository<file, Long> {
    Iterable<file> findByEmail(String email);
    //String fname="Applied companies.txt";
    ArrayList<file> findByPath(String email);
}

