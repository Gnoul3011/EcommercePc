package com.app.ecommerce.utils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;

import org.apache.commons.io.FileUtils;
import org.springframework.web.multipart.MultipartFile;

public class Utils {
  public static void clearFolderContents(String path) throws IOException {
    FileUtils.deleteDirectory(new File(path));
    new File(path).mkdirs();
  }

  public static void copyFiles(MultipartFile file, String destination) throws IOException {
    Files.copy(file.getInputStream(),
        (new File(destination)).toPath(),
        StandardCopyOption.REPLACE_EXISTING);
  }

  public static String generateOTP() {
    int randomPin = (int) (Math.random() * 900000) + 1000;
    String otp = String.valueOf(randomPin);
    return otp; // returning value of otp
  }
}
