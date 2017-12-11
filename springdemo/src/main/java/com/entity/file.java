package com.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class file {


    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getStar() {
        return star;
    }

    public void setStar(String star) {
        this.star = star;
    }

    public String getDeletefile() {
        return deletefile;
    }

    public void setDeletefile(String deletefile) {
        this.deletefile = deletefile;
    }

    public String getIsdirectory() {
        return isdirectory;
    }

    public void setIsdirectory(String isdirectory) {
        this.isdirectory = isdirectory;
    }

    private String email;
    private String path;
    private String star;
    private String deletefile;
    private String isdirectory;

    public String getDname() {
        return dname;
    }

    public void setDname(String dname) {
        this.dname = dname;
    }

    private String dname;

}
