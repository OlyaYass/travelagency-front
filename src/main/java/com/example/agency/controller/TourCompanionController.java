package com.example.agency.controller;

import com.example.agency.request.CompanionRequest;
import com.example.agency.response.CompanionResponse;
import com.example.agency.service.TourCompanionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/companions")
@RequiredArgsConstructor
public class TourCompanionController {
    private final TourCompanionService tourCompanionService;

    @GetMapping("/has-companion/{tourId}")
    public ResponseEntity<Boolean> hasCompanion(@PathVariable Long tourId, Principal principal) {
        boolean hasCompanion = tourCompanionService.hasUserCompanion(principal.getName(), tourId);
        return ResponseEntity.ok(hasCompanion);
    }

    @PostMapping("/{tourId}")
    public ResponseEntity<?> addCompanion(@PathVariable Long tourId,
                                          @RequestBody CompanionRequest request,
                                          Principal principal) {
        tourCompanionService.addCompanion(principal.getName(), tourId, request.getContactInfo());
        return ResponseEntity.ok("Вы добавлены в список попутчиков");
    }

    @GetMapping("/{tourId}")
    public ResponseEntity<List<CompanionResponse>> getCompanions(@PathVariable Long tourId) {
        return ResponseEntity.ok(tourCompanionService.getCompanions(tourId));
    }

    @DeleteMapping("/{tourId}")
    public ResponseEntity<?> removeCompanion(@PathVariable Long tourId, Principal principal) {
        try {
            System.out.println("Попытка удалить попутчика: " + principal.getName() + " для тура: " + tourId);
            tourCompanionService.removeCompanion(principal.getName(), tourId);
            return ResponseEntity.ok("You were deleted");
        } catch (Exception e) {
            System.out.println("Delete error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Delete Error");
        }
    }
}
