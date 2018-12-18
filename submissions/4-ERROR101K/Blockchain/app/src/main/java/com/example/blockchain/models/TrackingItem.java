package com.example.blockchain.models;

import android.os.Parcel;
import android.os.Parcelable;

public class TrackingItem implements Parcelable {

    private String description;
    private String imageUrl;
    private String trackingCode;

    public TrackingItem(String description, String imageUrl, String trackingCode) {
        this.description = description;
        this.imageUrl = imageUrl;
        this.trackingCode = trackingCode;
    }

    protected TrackingItem(Parcel in) {
        description = in.readString();
        imageUrl = in.readString();
        trackingCode = in.readString();
    }

    public static final Creator<TrackingItem> CREATOR = new Creator<TrackingItem>() {
        @Override
        public TrackingItem createFromParcel(Parcel in) {
            return new TrackingItem(in);
        }

        @Override
        public TrackingItem[] newArray(int size) {
            return new TrackingItem[size];
        }
    };

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getTrackingCode() {
        return trackingCode;
    }

    public void setTrackingCode(String trackingCode) {
        this.trackingCode = trackingCode;
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel parcel, int i) {
        parcel.writeString(description);
        parcel.writeString(imageUrl);
        parcel.writeString(trackingCode);
    }
}
