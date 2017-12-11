package com.controller;
import com.entity.User;
import com.entity.file;
import com.service.activtyservice;
import com.service.fileservice;
import com.service.groupservice;
import com.sun.org.apache.xpath.internal.operations.Bool;
import org.json.JSONObject;
import org.json.simple.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import javax.servlet.http.HttpSession;
import com.entity.activityentity;
import javax.validation.constraints.Null;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.lang.reflect.Array;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;


@Controller    // This means that this class is a Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/file") // This means URL's start with /demo (after Application path)
public class filecontroller {

    @Autowired
    private fileservice fservice;

    @Autowired
    private activtyservice aservice;

    @GetMapping(path="/display",produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Iterable<file> getAllFiles(HttpSession session) {
        // This returns a JSON with the users
        return fservice.getData(session.getAttribute("name").toString());
    }


    @PostMapping(path="/sfile",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public @ResponseBody String sfile (@RequestBody String path,HttpSession session ) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
//Getting all the files with that username
        Iterable<file> f= fservice.getData(session.getAttribute("name").toString());
        Iterator<file>f2=f.iterator();
        String email=session.getAttribute("name").toString();
        activityentity activty=new activityentity();
        activty.setEmail(email);
        activty.setDescription("User made star changes to the file");
        Date d=new Date();
        activty.setCurrenttime(d.toString());
        aservice.save(activty);
        while(f2.hasNext())
        {
            file kl = f2.next();
            String k=kl.getPath();
            k='"'+k+'"';
            String kj=path;
            if(k.equals(kj))
            {
                if(kl.getStar().equals("No"))
                    kl.setStar("Yes");
                else
                    kl.setStar("No");
fservice.save(kl);
            }
        }
        return "201";
    }



    @PostMapping(path="/sharefile") // Map ONLY POST Requests
    public @ResponseBody ResponseEntity<?> sharefile (@RequestBody String input,  HttpSession session ) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        //Getting all the files with that username

      //  System.out.println(input);
        input=input.substring(1,input.length()-1);
        System.out.println(input);
        String [] inputdata=input.split("&");
String path=inputdata[0];
String otheruser=inputdata[1];
        //System.out.println(otheruser);

        String email=session.getAttribute("name").toString();
        activityentity activty=new activityentity();
        activty.setEmail(email);
        activty.setDescription("User Shared the file");
        Date d=new Date();
        activty.setCurrenttime(d.toString());
        aservice.save(activty);
        Iterable<file> f= fservice.getData(session.getAttribute("name").toString());
        Iterator<file>f2=f.iterator();
        file sharef=new file();
        sharef.setStar("No");
        sharef.setPath(path);
        sharef.setDeletefile("No");
        sharef.setIsdirectory("No");
        sharef.setEmail(otheruser);
        sharef.setDname("normal");
        fservice.save(sharef);
        return new ResponseEntity(null, HttpStatus.CREATED);
    }


    @PostMapping(path = "/createDirectory",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public @ResponseBody  String createD(@RequestBody String path) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        // userService.addUser(user);
       // System.out.println("saasd");
        //String email=session.getAttribute("name").toString();
        String email="sanjay";
        activityentity activty=new activityentity();
        activty.setEmail(email);
        activty.setDescription("User Created the Directory");
        Date d=new Date();
        activty.setCurrenttime(d.toString());
        aservice.save(activty);

        file f=new file();
       // f.setEmail(session.getAttribute("name").toString());
        f.setIsdirectory("yes");
        f.setDeletefile("yes");
        f.setStar("No");
        f.setDname("normal");
        f.setPath(path.substring(1,path.length()-1));
        fservice.save(f);
        return "201";
    }

    @PostMapping(path="/delete",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public @ResponseBody String deletefile (@RequestBody String path,HttpSession session ) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
//Getting all the files with that username
        Iterable<file> f= fservice.getData(session.getAttribute("name").toString());
        Iterator<file>f2=f.iterator();
        String email=session.getAttribute("name").toString();
        activityentity activty=new activityentity();
        activty.setEmail(email);
        activty.setDescription("User Deleted the file");
        Date d=new Date();
        activty.setCurrenttime(d.toString());
        aservice.save(activty);

        while(f2.hasNext())
            {
                file kl = f2.next();
                String k=kl.getPath();
                k='"'+k+'"';
                String kj=path;
              if(k.equals(kj))
                 {
                     fservice.deleteFile(kl);
                 }
           }
        return "201";
    }


    @PostMapping(path = "/add") // Map ONLY POST Requests
    public @ResponseBody  ResponseEntity<?> addNewUser(
            @RequestParam(name="mypic") MultipartFile uploadfile,@RequestParam(name="dname") String dname, HttpSession session) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        // userService.addUser(user);
 String Path1="C:\\sanjay\\273\\DEMOS\\SpringBootDemoCode\\front-end\\public";


       // Path path = Paths.get("Path1");
     //  uploadfile.transferTo(new File(Path1));

        //Path path = Paths.get(Path);
        System.out.println(session.getAttribute("name"));
        String email=session.getAttribute("name").toString();
       // System.out.println("saasd");
        Path1=Path1+'\\'+uploadfile.getOriginalFilename();

        try {
          //  File convFile = new File(uploadfile.getOriginalFilename());
            uploadfile.transferTo(new File(Path1));
        }
        catch (Exception e)
        {

        }
        activityentity activty=new activityentity();
        activty.setEmail(email);
        activty.setDescription("User Uploaded the file");
        Date d=new Date();
        activty.setCurrenttime(d.toString());
        aservice.save(activty);
        file f=new file();
          f.setEmail(email);
f.setDeletefile("yes");
f.setIsdirectory("No");
f.setPath(uploadfile.getOriginalFilename());
f.setStar("No");
f.setDname(dname);
//System.out.println("asddsa");
//System.out.println(f.getDname());
          fservice.save(f);
        return new ResponseEntity(null, HttpStatus.CREATED);
    }
}