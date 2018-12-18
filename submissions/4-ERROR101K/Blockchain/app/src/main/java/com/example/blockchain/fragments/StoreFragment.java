package com.example.blockchain.fragments;


import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.blockchain.R;
import com.example.blockchain.adapters.StoreAdapter;
import com.example.blockchain.models.StoreItem;

import java.util.ArrayList;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

public class StoreFragment extends androidx.fragment.app.Fragment {

    private Context context;

    public StoreFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_store, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        ArrayList<StoreItem> storeItems = new ArrayList<>();
        storeItems.add(new StoreItem("Coil Spring","http://www.nfmautoparts.com.my/images/shop/virtuemart/category/resized/coilspring_%E5%89%AF%E6%9C%AC_300x300.jpg", "RM"));
        storeItems.add(new StoreItem("Brake Pump","http://www.nfmautoparts.com.my/images/shop/virtuemart/category/resized/Untitled_%E5%89%AF%E6%9C%AC_300x300.jpg", "RM"));
        storeItems.add(new StoreItem("Oil Filter","http://www.nfmautoparts.com.my/images/shop/virtuemart/category/resized/oilfilter_300x300.png", "RM"));
        storeItems.add(new StoreItem("Brake Pad","http://www.nfmautoparts.com.my/images/shop/virtuemart/category/resized/brakepad_300x300.jpg","RM"));
        storeItems.add(new StoreItem("Fuel Pump","http://www.nfmautoparts.com.my/images/shop/virtuemart/category/resized/Untitled_%E5%89%AF%E6%9C%AC5_300x300.png","RM"));
        storeItems.add(new StoreItem("Lower/ Upper arm","http://www.nfmautoparts.com.my/images/shop/virtuemart/category/resized/lower_ARM_300x300.jpg", "RM"));


        RecyclerView storeList = view.findViewById(R.id.store_list);
        storeList.setAdapter(new StoreAdapter(context, storeItems));
        storeList.setLayoutManager(new GridLayoutManager(context, 2, RecyclerView.VERTICAL, false));
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
}
