package com.playo;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/test")
@SecurityRequirement(name = "bearerAuth") // Global requirement
public class testController {
        @GetMapping
        public ResponseEntity<String> testEndpoint(){
            return ResponseEntity.ok("Test Endpoint for Secured User ");
        }
}
