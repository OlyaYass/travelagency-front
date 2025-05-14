package com.example.agency.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name="tour_companions")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TourCompanion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private User user;

    private Long tourId;
    @Column(columnDefinition = "TEXT")
    private String contactInfo;
}
