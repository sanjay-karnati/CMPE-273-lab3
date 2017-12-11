package com.service;
import com.entity.file;
import com.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;

@Service
public class fileservice {


@Autowired
public FileRepository fileRepository;

public void save(file file1){
        fileRepository.save(file1);
    }

    public Iterable<file> getData(String email){
        return fileRepository.findByEmail(email);
    }

    public ArrayList<file> getDeleteFile(String path)
{
return fileRepository.findByPath(path);
}

public void deleteFile(file f)
{
    fileRepository.delete(f);
}

 public void updateStar(file f)
 {
   fileRepository.save(f);
 }

}
