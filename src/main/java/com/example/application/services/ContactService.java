package com.example.application.services;

import com.example.application.db.Contact;
import com.example.application.db.ContactRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.List;

@BrowserCallable
@Service
@AnonymousAllowed
public class ContactService {

    private final ContactRepository repository;

    public ContactService(ContactRepository repository) {
        this.repository = repository;
    }

    public List<Contact> findAll() {
        return repository.findAll();
    }

    public Contact save(Contact contact) {
        return repository.save(contact);
    }

    // return a flux of all contacts with 2 second delay
    public Flux<Contact> findAllFlux() {
        return Flux.fromIterable(repository.findAll())
            .delayElements(Duration.ofSeconds(2));
    }
}
