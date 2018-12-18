package com.example.blockchain.activities;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.arlib.floatingsearchview.FloatingSearchView;
import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.bumptech.glide.request.RequestOptions;
import com.example.blockchain.R;
import com.example.blockchain.contracts.CheeTest;
import com.example.blockchain.fragments.TrackingFragment;
import com.example.blockchain.models.StoreItem;
import com.google.android.material.snackbar.Snackbar;

import org.web3j.crypto.CipherException;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.Web3jFactory;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.Transfer;
import org.web3j.utils.Convert;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.concurrent.Future;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

public class StoreItemActivity extends AppCompatActivity {


    private final String INFURA_HTTP_CLIENT = "https://ropsten.infura.io/v3/5851eb9b0b58489086bc8e1ef2485a94";
    private final String CONTRACT_ADDRESS = "0x35E6403DC05AdC89Abe5241fDBbB936D5089C5Be";
    private final String PASSWORD = "khortesting";
    private final BigInteger GAS_LIMIT = new BigInteger("3000000");
    private final BigInteger GAS_PRICE = new BigInteger("20000000000");
    private CheeTest cheeTest;
    private Web3j web3j;
    private Credentials credentials;
    @SuppressLint("CheckResult")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_store);


        final StoreItem storeItem = getIntent().getParcelableExtra("item");

        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        if (getSupportActionBar() != null) {
            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
            getSupportActionBar().setTitle(storeItem.getDescription());
        }

        web3j = Web3jFactory.build(new HttpService(INFURA_HTTP_CLIENT));

        // create
        InputStream in = getResources().openRawResource(R.raw.wallet_file);
        File file = new File(getCacheDir() + File.separator + "temp.txt");
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

        credentials = null;
        try {
            credentials = WalletUtils.loadCredentials(PASSWORD, file);
        } catch (IOException | CipherException e) {
            Snackbar.make(null, "Oops! There's something wrong with your credentials.", Snackbar.LENGTH_SHORT).show();
            e.printStackTrace();
        }

        // backdrop of the appbar
        ImageView durianImage = findViewById(R.id.store_image);
        RequestOptions options = new RequestOptions();
        options.placeholder(R.drawable.image_placeholder);
        options.diskCacheStrategy(DiskCacheStrategy.ALL);
        options.centerCrop();
        Glide.with(this)
                .load(storeItem.getImageUrl())
                .apply(options)
                .into(durianImage);


        final Button buy = findViewById(R.id.buy);
        buy.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                try {
                    Future<TransactionReceipt> t = Transfer.sendFunds(
                            web3j, credentials, "0x14899E060c873F9F396fa3AB43e882e332Ef388f",
                            BigDecimal.valueOf(0.2048), Convert.Unit.ETHER).sendAsync();

                    Toast.makeText(StoreItemActivity.this, "Transaction successful. " + t.get().getTransactionHash(), Toast.LENGTH_SHORT).show();

                } catch (Exception e) {
                    e.printStackTrace();
                }
                TrackingFragment.updated = true;
                Snackbar.make(buy, "Bought!", Snackbar.LENGTH_SHORT).show();

            }
        });

    }

}
