package com.controller;

import com.entity.activityentity;
import com.service.activtyservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/activity")
public class activitycontroller {

    @Autowired
    activtyservice aservice;

    @GetMapping(path="/getuseractivity",produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    Iterable<activityentity> getAllActivity(HttpSession session) {
        // This returns a JSON with the users
        System.out.println("inside activity");
        return aservice.getData(session.getAttribute("name").toString());
    }
}
