package com.example.agency.controller;

import com.example.agency.exception.PhotoRetrievalException;
import com.example.agency.exception.ResourceNotFoundException;
import com.example.agency.model.BookedTour;
import com.example.agency.model.Tour;
import com.example.agency.response.BookingResponse;
import com.example.agency.response.TourResponse;
import com.example.agency.service.BookingService;
import com.example.agency.service.TourService;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/tours")
public class TourController {

    private final TourService tourService;
    private final BookingService bookedTourService;

    @PostMapping("/add/new-tour")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<TourResponse> addNewTour(
            @RequestParam("photo") MultipartFile photo,
            @RequestParam("tourName") String tourName,
            @RequestParam("tourPrice") BigDecimal tourPrice) throws SQLException, IOException {

        Tour savedTour = tourService.addNewTour(photo, tourName, tourPrice);
        TourResponse response = new TourResponse(savedTour.getId(), savedTour.getTourName(), savedTour.getTourPrice());
        return ResponseEntity.ok(response);
    }


    @GetMapping("/tour/names")
    public List<String> getTourTypes() {
        return tourService.getAllTourTypes();
    }


    @GetMapping("/all-tours")
    public ResponseEntity<List<TourResponse>> getAllTours() throws SQLException {
        List<Tour> tours = tourService.getAllTours();
        List<TourResponse> tourResponses = new ArrayList<>();
        for(Tour tour : tours) {
            byte[] photoBytes = tourService.getTourPhotoByTourId(tour.getId());
            if (photoBytes != null && photoBytes.length > 0) {
                String base64Photo = Base64.encodeBase64String(photoBytes);
//                String base64Photo = Base64.getEncoder().encodeToString(photoBytes);
                TourResponse tourResponse = getTourResponse(tour);
                tourResponse.setPhoto(base64Photo);
                tourResponses.add(tourResponse);
            }
        }
        return ResponseEntity.ok(tourResponses);
    }

    @GetMapping("/test-tour")
    public String testTourEndpoint() {
        System.out.println("test-tour endpoint");
        return "YASSSS";
    }


    @DeleteMapping("/delete/tour/{tourId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteTour(@PathVariable Long tourId) {
        tourService.deleteTour(tourId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @PutMapping("/update/{tourId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<TourResponse> updateTour(@PathVariable Long tourId,
                                                   @RequestParam(required = false) String tourName,
                                                   @RequestParam(required = false) BigDecimal tourPrice,
                                                   @RequestParam(required = false) MultipartFile photo) throws IOException, SQLException {
        byte[] photoBytes = photo != null && photo.isEmpty() ?
                photo.getBytes() : tourService.getTourPhotoByTourId(tourId);
        Blob photoBlob = photoBytes != null && photoBytes.length > 0 ?
                new SerialBlob(photoBytes) : null;
        Tour theTour = tourService.updateTour(tourId, tourName, tourPrice, photoBytes);
        theTour.setPhoto(photoBlob);
        TourResponse tourResponse = getTourResponse(theTour);
        return ResponseEntity.ok(tourResponse);
    }

    @GetMapping("/tour/{tourId}")
    public ResponseEntity<Optional<TourResponse>> getTourById(@PathVariable Long tourId) {
        Optional<Tour> theTour = tourService.getTourById(tourId);
        return theTour.map(tour -> {
            TourResponse tourResponse = getTourResponse(tour);
            return ResponseEntity.ok(Optional.of(tourResponse));
        }).orElseThrow(() -> new ResourceNotFoundException("Тур не найден"));
    }


    private TourResponse getTourResponse(Tour tour) {
        List<BookedTour> bookings = getAllBookingsByTourId(tour.getId());
        List<BookingResponse> bookingInfo = bookings
                .stream()
                .map(booking -> new BookingResponse(booking.getBookingId(),
                        booking.getBookingConfirmationCode())).toList();
        byte[] photoBytes = null;
        Blob photoBlob = tour.getPhoto();
        if (photoBlob != null) {
            try {
                photoBytes = photoBlob.getBytes(1, (int) photoBlob.length());
            }catch (SQLException e) {
                throw new PhotoRetrievalException("Ошибка получения фото");
            }
        }
        return new TourResponse(tour.getId(),
                tour.getTourName(), tour.getTourPrice(),
                tour.isBooked(), photoBytes, bookingInfo);
    }

    private List<BookedTour> getAllBookingsByTourId(Long tourId) {
        return bookedTourService.getAllBookingsByTourId(tourId);
    }
}
