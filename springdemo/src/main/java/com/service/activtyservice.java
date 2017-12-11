package com.service;

import com.entity.activityentity;
import com.entity.file;
import com.repository.activityrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class activtyservice {

    @Autowired
public activityrepository activityrepo;

    public void save(activityentity activityEntity)
    {
        activityrepo.save(activityEntity);
    }
    public Iterable<activityentity> getData(String email){
        return activityrepo.findByEmail(email);
    }


}
