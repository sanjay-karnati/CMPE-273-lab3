package com.controller;
import com.entity.User;
import com.repository.UserRepository;
import com.service.UserService;
import com.service.fileservice;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;

@Controller    // This means that this class is a Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/user") // This means URL's start with /demo (after Application path)
public class UserController {

    @Autowired
    private UserService userService;
@Autowired
    private UserRepository ur;

    @PostMapping(path="/add",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public @ResponseBody  String addNewUser (@RequestBody User user) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        userService.addUser(user);
        System.out.println("Saved");
        return "200";
       // return new ResponseEntity(null, HttpStatus.CREATED);
    }

    @GetMapping(path="/all")
    public @ResponseBody
    String getAllUsers() {
        // This returns a JSON with the users
    Iterable<User> users=userService.getAllUsers();
        Iterator<User>users2=users.iterator();
        Integer i=0;
        System.out.println("ssssssssssssssssssss");
        System.out.println();
    while(users2.hasNext())
    {
        i++;
    }
    String k=i.toString();
        return k;
    }


    @GetMapping(path="/getemail")
    public @ResponseBody
    String getuser(@RequestBody String user1,HttpSession session) {
        // This returns a JSON with the users
        fileservice fservice;
        //String email=session.getAttribute("name").toString();
        //System.out.println(email);

       User user=new User();
        List<User>users =userService.login("sankmjay","123");
        System.out.println(users);
        String out;
        if(users.size()==0)
            out="not valid";
        else
            out="valid";
        return out;
    }




    @PostMapping(path="/login",consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody  String login(@RequestBody String user, HttpSession session)
    {
        JSONObject jsonObject = new JSONObject(user);
        System.out.println(jsonObject);
        //System.out.println(jsonObject.getJSONArray("bytes"));
        session.setAttribute("name",jsonObject.getString("username"));
        List<User> user1=userService.login(jsonObject.getString("username"),jsonObject.getString("password"));
        System.out.println("usedetails aft login"+user1);
        if(user1.isEmpty()) {
            System.out.println("login failed");
            return "404";
            //return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        else {
            System.out.println("login success");
         return "200";
            //   return new ResponseEntity(userService.login(jsonObject.getString("username"), jsonObject.getString("password")), HttpStatus.OK);
        }
    }



    @PostMapping(value = "/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> logout(HttpSession session) {
        System.out.println(session.getAttribute("name"));
        session.invalidate();
        return  new ResponseEntity(HttpStatus.OK);
    }
}