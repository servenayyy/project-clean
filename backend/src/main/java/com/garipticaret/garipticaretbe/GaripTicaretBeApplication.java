package com.garipticaret.garipticaretbe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class GaripTicaretBeApplication {
    public static void main(String[] args) {
        SpringApplication.run(GaripTicaretBeApplication.class, args);
    }
}