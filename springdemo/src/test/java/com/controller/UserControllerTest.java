package com.controller;

import com.entity.User;
import com.service.UserService;
import org.hamcrest.Matchers;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import com.controller.UserController;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MockMvcBuilder;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import javax.swing.text.html.parser.Entity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;


@RunWith(SpringJUnit4ClassRunner.class)
public class UserControllerTest {

    private MockMvc mockMvc;

    @Mock
    public UserService userService;


    @InjectMocks
    public UserController userController;

    @Before
    public void setUp() throws Exception {
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @After
    public void tearDown() throws Exception {

    }

    @Test
    public void shouldlogin() throws Exception {
        User u=new User();
        List<User> user1=new ArrayList<User>();
user1.add(u);
        Mockito.when(
                userService.login("sanjay","123")).thenReturn(user1);
        String json = "{\n" +
                "  \"username\": \"sanjay\",\n" +
                "  \"password\": \"123\"\n" +
                "}";

        mockMvc.perform(MockMvcRequestBuilders.post("/user/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
        .andExpect(MockMvcResultMatchers.content().string("200"));
    }

    @Test
    public void notlogin() throws Exception {
        User u=new User();
        List<User> user1=new ArrayList<User>();
        user1.add(u);
        Mockito.when(
                userService.login("sanay","123")).thenReturn(user1);
        String json = "{\n" +
                "  \"username\": \"sajay\",\n" +
                "  \"password\": \"123\"\n" +
                "}";
        mockMvc.perform(MockMvcRequestBuilders.post("/user/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(MockMvcResultMatchers.content().string("404"));
    }


    @Test
    public void adduser()
    {

        User user1=new User();
        user1.setName("asd");
        user1.setEmail("asd@gmail.com");
        user1.setPassword("password");
        userService.addUser(user1);
      List<User>userlist=userService.login("asd@gmail.com","password");
       System.out.println(userlist);
        if(userlist.isEmpty())
        {
assert true;
        }
        else
        {
            assert false;
        }
    }

}