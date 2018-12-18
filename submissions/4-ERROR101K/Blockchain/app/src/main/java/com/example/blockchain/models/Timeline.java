package com.example.blockchain.models;

public class Timeline {

    private String locationName;
    private String date;

    public Timeline(String locationName, String date) {
        this.locationName = locationName;
        this.date = date;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

}
