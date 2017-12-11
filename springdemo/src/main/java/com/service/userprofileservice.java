package com.service;

import com.entity.userprofileentity;
import com.repository.userprofile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class userprofileservice {

    @Autowired
    public userprofile up;

    public void save(userprofileentity ent)
    {
        up.save(ent);
    }



}
//package com.service;
//
//        import com.entity.userprofileentity;
//        import org.springframework.beans.factory.annotation.Autowired;
//        import org.springframework.stereotype.Service;
//
//@Service
//public class userprofile
//{
//    @Autowired
//    private com.repository.userprofile uprofile;
//
//    public void save(userprofileentity up)
//    {
//        uprofile.save(up);
//    }
//
//}