package com.service;

import com.entity.dgroup;
import com.entity.file;
import com.repository.Group;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class groupservice {

    @Autowired
    private Group g;


    public Iterable<dgroup> getData(String email){
        // Iterable<file> l=fileRepository.findByEmail(email);
        return g.findByEmail(email);
    }
    public dgroup getgroup(String groupname){
        // Iterable<file> l=fileRepository.findByEm(email);
        return g.findBygroupname(groupname);
    }

    public void deleteFile(dgroup g1)
    {
        //   System.out.println(f.getPath());
        g.delete(g1);
    }

    public void creategroup(dgroup group){
        g.save(group);
    }

}
