package com.andres.proyectos.el_telon.admin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/api/admin")
public class DashboardController {

    @GetMapping("/dashboard")
    public String dashboard() {
        return "admin/dashboard";
    }
}
