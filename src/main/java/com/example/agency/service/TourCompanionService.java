package com.example.agency.service;


import com.example.agency.model.TourCompanion;
import com.example.agency.model.User;
import com.example.agency.repository.TourCompanionRepo;
import com.example.agency.repository.UserRepo;
import com.example.agency.response.CompanionResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TourCompanionService {
    private final TourCompanionRepo tourCompanionRepo;
    private final UserRepo userRepo;

    public boolean hasUserCompanion(String email, Long tourId) {
        User user = userRepo.findByEmail(email).orElseThrow();
        return tourCompanionRepo.existsByUserIdAndTourId(user.getId(), tourId);
    }

    public void addCompanion(String email, Long tourId, String contactInfo) {
        User user = userRepo.findByEmail(email).orElseThrow();

        if (!hasUserCompanion(email, tourId)) {
            TourCompanion companion = new TourCompanion();
            companion.setUser(user);
            companion.setTourId(tourId);
            companion.setContactInfo(contactInfo);
            tourCompanionRepo.save(companion);
        }
    }

    public List<CompanionResponse> getCompanions(Long tourId) {
        return tourCompanionRepo.findByTourId(tourId).stream()
                .map(c -> new CompanionResponse(
                        c.getUser().getFirstName() + " " + c.getUser().getLastName(),
                        c.getContactInfo()
                )).collect(Collectors.toList());
    }

    @Transactional
    public void removeCompanion(String email, Long tourId) {
        User user = userRepo.findByEmail(email).orElseThrow();
        if (!tourCompanionRepo.existsByUserIdAndTourId(user.getId(), tourId)) {
            throw new IllegalArgumentException("Don't found");
        }
        tourCompanionRepo.deleteByUserIdAndTourId(user.getId(), tourId);
    }
}
