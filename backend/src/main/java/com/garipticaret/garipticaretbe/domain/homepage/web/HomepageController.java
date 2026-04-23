package com.garipticaret.garipticaretbe.domain.homepage.web;

import com.garipticaret.garipticaretbe.domain.homepage.api.HomepageDto;
import com.garipticaret.garipticaretbe.domain.homepage.api.HomepageService;
import com.garipticaret.garipticaretbe.shared.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/homepage")
@RequiredArgsConstructor
public class HomepageController {

    private final HomepageService homepageService;

    @GetMapping
    public ResponseEntity<ApiResponse<HomepageDto>> getHomepage() {
        return ResponseEntity.ok(
                ApiResponse.ok(homepageService.getHomepageData()));
    }

    @GetMapping("/custom")
    public ResponseEntity<ApiResponse<HomepageDto>> getHomepageCustom(
            @RequestParam(defaultValue = "8") int newArrivals,
            @RequestParam(defaultValue = "8") int discounted,
            @RequestParam(defaultValue = "8") int featured) {
        return ResponseEntity.ok(
                ApiResponse.ok(homepageService.getHomepageData(
                        newArrivals, discounted, featured)));
    }
}