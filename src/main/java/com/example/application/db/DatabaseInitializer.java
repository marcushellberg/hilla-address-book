package com.example.application.db;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DatabaseInitializer {

    @Bean
    public ApplicationRunner initializer(ContactRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.save(new Contact("John", "Doe", "john.doe@example.com", "123-456-7890"));
                repository.save(new Contact("Jane", "Doe", "jane.doe@example.com", "123-456-7891"));
                repository.save(new Contact("Alice", "Smith", "alice.smith@example.com", "123-456-7892"));
                repository.save(new Contact("Bob", "Johnson", "bob.johnson@example.com", "123-456-7893"));
                repository.save(new Contact("Charlie", "Brown", "charlie.brown@example.com", "123-456-7894"));
            }
        };
    }
}
