package webapp.weblab4.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import webapp.weblab4.repositories.EntryRepository;
import webapp.weblab4.security.services.UserService;
import webapp.weblab4.DTO.EntryDTO;
import webapp.weblab4.entities.Entry;
import webapp.weblab4.entities.User;

import java.security.Principal;

@Slf4j
@RestController
@RequestMapping("/web-lab4/api/entries")
public class EntriesController {
    @Autowired
    private UserService userService;

    @Autowired
    private EntryRepository entryRepository;

    @GetMapping
    ResponseEntity<?> getUserEntries(Principal principal) {
        User user = (User) userService.loadUserByUsername(principal.getName());
        return ResponseEntity.ok(entryRepository.findByUser(user));
    }

    @PostMapping
    ResponseEntity<?> addEntry(@Validated @RequestBody EntryDTO entryDTO, Principal principal) {
        User user = (User) userService.loadUserByUsername(principal.getName());
        return ResponseEntity.ok(entryRepository.save(new Entry(
                entryDTO.getX(),
                entryDTO.getY(),
                entryDTO.getR(),
                user)));
    }

    @DeleteMapping
    ResponseEntity<?> deleteUserEntries(Principal principal) {
        User user = (User) userService.loadUserByUsername(principal.getName());
        return ResponseEntity.ok(entryRepository.deleteByUser(user));
    }
}
