package com.example.agency.repository;

import com.example.agency.model.TourCompanion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TourCompanionRepo extends JpaRepository<TourCompanion, Long> {
    boolean existsByUserIdAndTourId(Long userId, Long tourId);
    List<TourCompanion> findByTourId(Long tourId);
    void deleteByUserIdAndTourId(Long userId, Long tourId);
}