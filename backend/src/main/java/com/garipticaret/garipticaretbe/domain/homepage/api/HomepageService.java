package com.garipticaret.garipticaretbe.domain.homepage.api;

public interface HomepageService {

    HomepageDto getHomepageData();
    HomepageDto getHomepageData(int newArrivalsLimit,
                                int discountedLimit,
                                int featuredLimit);
}