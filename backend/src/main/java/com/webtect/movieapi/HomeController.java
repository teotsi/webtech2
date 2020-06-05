package com.webtect.movieapi;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

@RequestMapping(path = "/")
public String homePage() {
    return "page/index";
}
@GetMapping(value = "/login")
public String loginPage() {
    return "page/login";
}

@GetMapping(value = "/profile")
public String profilePage() {
    return "page/profile";
}



}
