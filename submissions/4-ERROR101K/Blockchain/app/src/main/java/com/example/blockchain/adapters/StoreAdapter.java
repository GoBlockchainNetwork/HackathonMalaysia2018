package com.example.blockchain.adapters;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.bumptech.glide.request.RequestOptions;
import com.example.blockchain.R;
import com.example.blockchain.activities.StoreItemActivity;
import com.example.blockchain.models.StoreItem;

import java.util.ArrayList;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

public class StoreAdapter extends RecyclerView.Adapter<StoreAdapter.ViewHolder> {

    private Context context;
    private ArrayList<StoreItem> storeItems;

    public StoreAdapter(Context context, ArrayList<StoreItem> storeItems) {
        this.context = context;
        this.storeItems = storeItems;
    }

    @NonNull
    @Override
    public StoreAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_store, parent, false);
        return new ViewHolder(itemView);
    }

    @SuppressLint("CheckResult")
    @Override
    public void onBindViewHolder(@NonNull StoreAdapter.ViewHolder holder, int position) {
        StoreItem storeItem = storeItems.get(position);
        holder.description.setText(storeItem.getDescription());

        RequestOptions options = new RequestOptions();
        options.placeholder(R.drawable.image_placeholder);
        options.diskCacheStrategy(DiskCacheStrategy.ALL);
        options.centerCrop();
        Glide.with(context)
                .load(storeItem.getImageUrl())
                .apply(options)
                .into(holder.imageView);
    }

    @Override
    public int getItemCount() {
        return storeItems.size();
    }

    class ViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

        private FrameLayout item;
        private ImageView imageView;
        private TextView description;

        ViewHolder(@NonNull View itemView) {
            super(itemView);
            this.description = itemView.findViewById(R.id.description);
            this.imageView = itemView.findViewById(R.id.store_image);
            this.item = itemView.findViewById(R.id.item);
            this.item.setOnClickListener(this);
        }

        @Override
        public void onClick(View view) {
            Intent intent  = new Intent(context, StoreItemActivity.class);
            intent.putExtra("item", storeItems.get(getAdapterPosition()));
            context.startActivity(intent);
        }
    }
}
