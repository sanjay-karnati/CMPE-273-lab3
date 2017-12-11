package com.controller;

import com.entity.activityentity;
import com.entity.dgroup;
import com.entity.file;
import com.service.activtyservice;
import com.service.groupservice;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.Iterator;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/group")
public class dgroupjava {

//    @Autowired
    @Autowired
private groupservice groups;

    @Autowired
    private activtyservice aservice;


    @PostMapping(path="/createGroup",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public @ResponseBody String sfile (@RequestBody String group, HttpSession session ) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
//Getting all the files with that username
        JSONObject jsonObject = new JSONObject(group);
        String input=jsonObject.getString("group");

        String email=session.getAttribute("name").toString();
        activityentity activty=new activityentity();
        activty.setEmail(email);
        activty.setDescription("User Created the Group");
        Date d=new Date();
        activty.setCurrenttime(d.toString());
        aservice.save(activty);





        dgroup group1=new dgroup();
group1.setEmail(session.getAttribute("name").toString());
group1.setGroupname(input);
group1.setPermission("yes");
groups.creategroup(group1);
return "201";
    }


    @PostMapping(path="/deletegroup",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public @ResponseBody String deletegroup (@RequestBody String name, HttpSession session ) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
//Getting all the files with that username
        String email=session.getAttribute("name").toString();
        activityentity activty=new activityentity();
        activty.setEmail(email);
        activty.setDescription("User Deleted the Group");
        Date d=new Date();
        activty.setCurrenttime(d.toString());
        aservice.save(activty);

        JSONObject jsonObject = new JSONObject(name);
        String input=jsonObject.getString("name");
        dgroup d1=groups.getgroup(input);
    groups.deleteFile(d1);

        return "201";
    }


    @GetMapping(path="/grouplist",produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Iterable<dgroup> getAllFiles(HttpSession session) {
        // This returns a JSON with the users
        return groups.getData(session.getAttribute("name").toString());
    }


}
