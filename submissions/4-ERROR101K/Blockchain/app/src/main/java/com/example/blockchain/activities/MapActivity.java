package com.example.blockchain.activities;

import android.content.res.Resources;
import android.os.Bundle;
import android.util.DisplayMetrics;
import android.util.TypedValue;

import com.example.blockchain.R;
import com.example.blockchain.adapters.TimeLineAdapter;
import com.example.blockchain.models.Timeline;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.JointType;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.LatLngBounds;
import com.google.android.gms.maps.model.MapStyleOptions;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.maps.model.PolylineOptions;
import com.google.android.gms.maps.model.RoundCap;

import java.util.ArrayList;
import java.util.Arrays;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

public class MapActivity extends AppCompatActivity implements OnMapReadyCallback {

    private GoogleMap googleMap;
    private ArrayList<String> coordinates;
    private ArrayList<String> companies;
    private ArrayList<String> timestamps;
    private ArrayList<Timeline> timelines;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_map);
        String[] data = getIntent().getStringExtra("data").split("!");

        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        if (getSupportActionBar() != null) {
            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
            // ref number
            getSupportActionBar().setTitle(data[0]);
        }

        // get Data
        timelines = new ArrayList<>();
        companies = new ArrayList<>(Arrays.asList(data[1].split(",")));
        timestamps = new ArrayList<>(Arrays.asList(data[2].split("/")));
        coordinates = new ArrayList<>(Arrays.asList(data[3].split(":")));

        for (int i = companies.size()-1; i >= 0; i--){
            timelines.add(new Timeline(companies.get(i), timestamps.get(i)));
        }

        RecyclerView timeline = findViewById(R.id.timeline);
        timeline.setAdapter(new TimeLineAdapter(timelines,this));
        timeline.setLayoutManager(new LinearLayoutManager(this));

        // setup the small map
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager().findFragmentById(R.id.map);
        assert mapFragment != null;
        mapFragment.getMapAsync(this);


    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        this.googleMap = googleMap;
        applyMapStyling();
        plotMarkersAndPolylines();

    }

    private void applyMapStyling() {
        try {
            // Customise the styling of the base map using a JSON object defined
            // in a raw resource file.
            googleMap.setMapStyle(MapStyleOptions.loadRawResourceStyle(this, R.raw.style_json));
        } catch (Resources.NotFoundException ignored) {
        }
    }

    private void plotMarkersAndPolylines(){
        ArrayList<LatLng> latLngs = new ArrayList<>();
        for(int i = 0; i < coordinates.size();){
            latLngs.add(new LatLng(Double.parseDouble(coordinates.get(i++)), Double.parseDouble(coordinates.get(i++))));
        }
        googleMap.addPolyline(new PolylineOptions()
                .addAll(latLngs)
                .color(0xFF008577)
                .startCap(new RoundCap())
                .endCap(new RoundCap())
                .width(12)
                .jointType(JointType.ROUND));

        googleMap.addMarker(new MarkerOptions().position(latLngs.get(0)).icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_AZURE)));
        googleMap.addMarker(new MarkerOptions().position(latLngs.get(latLngs.size()-1)).icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_RED)));

        LatLngBounds.Builder builder = LatLngBounds.builder();
        for (int i = 0; i < latLngs.size(); i++){
            builder.include(latLngs.get(i));
        }
        final LatLngBounds bounds = builder.build();

        DisplayMetrics metrics = this.getResources().getDisplayMetrics();
        int leftRight = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 70, metrics);
        int top = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 130, metrics);
        int bottom = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 170, metrics);


        googleMap.setPadding(leftRight, top, leftRight, bottom);
        googleMap.moveCamera(CameraUpdateFactory.newLatLngBounds(bounds, 0));
        googleMap.setPadding(0, 0, 0, 0);

    }
}
