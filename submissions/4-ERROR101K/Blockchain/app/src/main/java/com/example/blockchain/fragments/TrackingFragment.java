package com.example.blockchain.fragments;

import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.blockchain.R;
import com.example.blockchain.adapters.TrackingAdapter;
import com.example.blockchain.models.TrackingItem;

import java.util.ArrayList;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

public class TrackingFragment extends androidx.fragment.app.Fragment {

    private Context context;
    public static boolean updated;
    private RecyclerView trackingList;
    private ArrayList<TrackingItem> trackingItems;


    public TrackingFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_tracking, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        trackingItems = new ArrayList<>();
        trackingItems.add(new TrackingItem("Coil Spring","http://www.nfmautoparts.com.my/images/shop/virtuemart/category/resized/coilspring_%E5%89%AF%E6%9C%AC_300x300.jpg", "0x35E6403DC05AdC89Abe5241fDBbB936D5089C5Be"));
        trackingItems.add(new TrackingItem("Fuel Pump","http://www.nfmautoparts.com.my/images/shop/virtuemart/category/resized/Untitled_%E5%89%AF%E6%9C%AC5_300x300.png", "0x44cE67fa9b2Ff012137016c7EBfAE51694a9Fde7"));

        trackingList = view.findViewById(R.id.tracking_items);
        trackingList.setLayoutManager(new LinearLayoutManager(context));
        trackingList.setAdapter(new TrackingAdapter(context, trackingItems));
    }

    @Override
    public void onAttach(@NonNull Context context) {
        super.onAttach(context);
        this.context = context;
    }

    @Override
    public void onDetach() {
        super.onDetach();
        this.context = null;
    }

    @Override
    public void onResume() {
        super.onResume();
        if(updated && trackingItems.size() < 3) trackingItems.add(new TrackingItem("Brake Pad","http://www.nfmautoparts.com.my/images/shop/virtuemart/category/resized/brakepad_300x300.jpg", "0x0d5B5A42C184434805217d72900ea2216e0af385"));
        trackingList.setAdapter(new TrackingAdapter(context, trackingItems));

    }
}
