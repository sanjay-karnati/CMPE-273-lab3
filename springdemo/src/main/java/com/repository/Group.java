package com.repository;

import com.entity.dgroup;
import com.entity.file;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

public interface Group extends CrudRepository<dgroup, Long> {

    Iterable<dgroup> findByEmail(String email);
    dgroup findBygroupname(String groupname);

}
