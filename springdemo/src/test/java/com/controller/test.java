package com.controller;

//import com.entity.FileDetails;
  //      import com.entity.FileOperationLogs;
    //    import com.entity.ShareData;
        import com.entity.User;
      //  import com.service.FileLogService;
        //import com.service.FileService;
        //import com.service.ShareService;
        import com.entity.file;
        import com.service.UserService;
        import com.service.fileservice;
        import com.service.groupservice;
        import org.junit.Test;
        import org.junit.runner.RunWith;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.boot.test.context.SpringBootTest;
        import org.springframework.test.context.junit4.SpringRunner;
        import org.springframework.web.bind.annotation.SessionAttribute;

        import javax.servlet.http.HttpSession;
        import java.util.HashMap;
        import java.util.Iterator;
        import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class test {

    @Autowired
    UserService userService;

    @Autowired
    fileservice fileService;

    @Autowired
    filecontroller fileController;

    @Autowired
    dgroupjava dgroupJava;

    @Autowired
    public groupservice groupService;

    public void setUp() {

    }

    public void tearDown() {

    }

    @Test
    public void addingnewuser() {
        User user=new User();
        userService.addUser(user);
        user.setEmail("asd");
        user.setPassword("asd");
        List<User> userList = userService.login("asd", "asd");
        if (userList.size() == 0) {
            assert true;
        } else {
            assert false;
        }
//		assert
    }

    @Test
    public void findUsers()
    {
        Iterable<User> userList = userService.getAllUsers();

        if(userList.spliterator().estimateSize()>0)
        {
            assert true;
        }
        else {
            assert false;
        }
    }


    @Test
    public void getfiles()
    {
        Iterable<file>f=fileService.getData("sanjay");

        if(f.iterator().hasNext())
        {
            assert true;
        }
        else
        {
            assert false;
        }

    }

    @Test
    public void cannotgetfiles()
    {
        Iterable<file>f=fileService.getData("sanjayas");
System.out.println(f);
        if(!f.iterator().hasNext())
        {
            assert true;
        }
        else
        {
            assert false;
        }
    }


    @Test
public void checkdelete()
{
    file file1=new file();
file1.setPath("testing");
    fileService.deleteFile(file1);

Iterable<file>f=fileService.getData("kunal@gmail.com");
Iterator<file>f2=f.iterator();
if(f2.hasNext())
{
    assert true;
}
else
{
    assert false;
}
}


    @Test
    public void checkcantdelete()
    {
        file file1=new file();
        file1.setPath("testing");
        fileService.deleteFile(file1);

        Iterable<file>f=fileService.getData("kunal@gmail.com");
        Iterator<file>f2=f.iterator();

        System.out.println(f2.hasNext());
        if(!f2.hasNext())
        {
            assert false;
        }
        else
        {
            assert true;
        }
    }





@Test
public void addfile()
{

    HashMap<String,Object>sessionattr=new HashMap<String,Object>();
    sessionattr.put("name","sanjay");

    String l=fileController.createD("newdirectory");
System.out.println(l);
if(l=="201")
    assert true;
}


//    @Test
//    public void gettingfiles()
//    {
//        Iterable<file>f=  fileService.getData("sanjay");
//        Iterator<file>f2=f.iterator();
//        int i=0;
//        while (f2.hasNext())
//        {
//            i++;
//        }
//i=3;
//        if(i==3)
//        {
//            assert true;
//        }
//        else
//        {
//            assert false;
//        }
//    }


}