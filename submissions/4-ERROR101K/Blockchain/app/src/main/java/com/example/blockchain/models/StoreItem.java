package com.example.blockchain.models;

import android.os.Parcel;
import android.os.Parcelable;

import androidx.annotation.NonNull;

public class StoreItem implements Parcelable {

    private String imageUrl;
    private String description;
    private String price;

    public StoreItem(String description, String imageUrl, String price) {
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    public StoreItem() {
    }

    protected StoreItem(Parcel in) {
        imageUrl = in.readString();
        description = in.readString();
        price = in.readString();
    }

    public static final Creator<StoreItem> CREATOR = new Creator<StoreItem>() {
        @Override
        public StoreItem createFromParcel(Parcel in) {
            return new StoreItem(in);
        }

        @Override
        public StoreItem[] newArray(int size) {
            return new StoreItem[size];
        }
    };

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel parcel, int i) {
        parcel.writeString(imageUrl);
        parcel.writeString(description);
        parcel.writeString(price);
    }

    @NonNull
    @Override
    public String toString() {
        return this.description + "," + this.imageUrl;
    }
}
