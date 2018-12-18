package com.example.blockchain.adapters;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.bumptech.glide.request.RequestOptions;
import com.example.blockchain.R;
import com.example.blockchain.activities.MainActivity;
import com.example.blockchain.activities.MapActivity;
import com.example.blockchain.activities.StoreItemActivity;
import com.example.blockchain.contracts.CheeTest;
import com.example.blockchain.models.TrackingItem;
import com.google.android.material.snackbar.Snackbar;

import org.web3j.crypto.CipherException;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.Web3jFactory;
import org.web3j.protocol.http.HttpService;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

public class TrackingAdapter extends RecyclerView.Adapter<TrackingAdapter.ViewHolder> {

    private Context context;
    private ArrayList<TrackingItem> trackingItems;
    private final String INFURA_HTTP_CLIENT = "https://ropsten.infura.io/v3/5851eb9b0b58489086bc8e1ef2485a94";
    private final String CONTRACT_ADDRESS = "0x35E6403DC05AdC89Abe5241fDBbB936D5089C5Be";
    private final String PASSWORD = "khortesting";
    private final BigInteger GAS_LIMIT = new BigInteger("3000000");
    private final BigInteger GAS_PRICE = new BigInteger("2000000000");

    public TrackingAdapter(Context context, ArrayList<TrackingItem> trackingItems) {
        this.context = context;
        this.trackingItems = trackingItems;
    }

    @NonNull
    @Override
    public TrackingAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_tracking, parent, false);
        return new ViewHolder(itemView);
    }

    @SuppressLint("CheckResult")
    @Override
    public void onBindViewHolder(@NonNull TrackingAdapter.ViewHolder holder, int position) {
        TrackingItem trackingItem = trackingItems.get(position);
        holder.description.setText(trackingItem.getDescription());
        holder.tracking.setText(trackingItem.getTrackingCode());

        RequestOptions options = new RequestOptions();
        options.placeholder(R.drawable.image_placeholder);
        options.diskCacheStrategy(DiskCacheStrategy.ALL);
        options.centerCrop();
        Glide.with(context)
                .load(trackingItem.getImageUrl())
                .apply(options)
                .into(holder.imageView);
    }

    @Override
    public int getItemCount() {
        return trackingItems.size();
    }

    class ViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

        private LinearLayout item;
        private ImageView imageView;
        private TextView description;
        private TextView tracking;

        ViewHolder(@NonNull View itemView) {
            super(itemView);
            this.description = itemView.findViewById(R.id.description);
            this.imageView = itemView.findViewById(R.id.store_image);
            this.tracking = itemView.findViewById(R.id.tracking_code);
            this.item = itemView.findViewById(R.id.item);
            this.item.setOnClickListener(this);
        }

        @Override
        public void onClick(View view) {
            Web3j web3j = Web3jFactory.build(new HttpService(INFURA_HTTP_CLIENT));

            // create
            InputStream in = context.getResources().openRawResource(R.raw.wallet_file);
            File file = new File(context.getCacheDir() + File.separator + "temp.txt");
            try {
                file.createNewFile();
                FileOutputStream outputStream = new FileOutputStream(file);
                int read;
                byte[] bytes = new byte[1024];
                while ((read = in.read(bytes)) != -1) {
                    outputStream.write(bytes, 0, read);
                }
                outputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }

            Credentials credentials = null;
            try {
                credentials = WalletUtils.loadCredentials(PASSWORD, file);
            } catch (IOException | CipherException e) {
                Snackbar.make(null, "Oops! There's something wrong with your credentials.", Snackbar.LENGTH_SHORT).show();
                e.printStackTrace();
            }

            CheeTest cheeTest = new CheeTest(trackingItems.get(getAdapterPosition()).getTrackingCode(), web3j, credentials, GAS_PRICE, GAS_LIMIT);

            Future<String> item = cheeTest.getItem().sendAsync();

            try {
                String data = item.get();
                Intent intent = new Intent(context, MapActivity.class);
                intent.putExtra("data", data);
                context.startActivity(intent);
            } catch (ExecutionException | InterruptedException e) {
                Snackbar.make(null, "Oops! Couldn't retrieve data from the smart contract.", Snackbar.LENGTH_SHORT).show();
                e.printStackTrace();
            }

        }
    }
}

