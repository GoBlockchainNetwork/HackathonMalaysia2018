package com.example.qrcodescanner;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.material.snackbar.Snackbar;

import org.web3j.crypto.CipherException;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.Web3jFactory;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private final String INFURA_HTTP_CLIENT = "https://ropsten.infura.io/v3/5851eb9b0b58489086bc8e1ef2485a94";
    private final String PASSWORD = "khorsupply";
    private final BigInteger GAS_LIMIT = new BigInteger("3000000");
    private final BigInteger GAS_PRICE = new BigInteger("2000000000");
    private CheeTest cheeTest;
    private Web3j web3j;
    private Credentials credentials;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

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

        try {

            Intent intent = new Intent("com.google.zxing.client.android.SCAN");
            intent.putExtra("SCAN_MODE", "QR_CODE_MODE"); // "PRODUCT_MODE for bar codes

            startActivityForResult(intent, 0);

        } catch (Exception e) {

            Uri marketUri = Uri.parse("market://details?id=com.google.zxing.client.android");
            Intent marketIntent = new Intent(Intent.ACTION_VIEW,marketUri);
            startActivity(marketIntent);

        }

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == 0) {

            if (resultCode == RESULT_OK) {
                assert data != null;
                String contents = data.getStringExtra("SCAN_RESULT");
                cheeTest = new CheeTest(contents, web3j, credentials, GAS_PRICE, GAS_LIMIT);
                Future<String> item = cheeTest.getItem().sendAsync();

                try {
                    String[] s = item.get().split("!");
                    String ns = s[0] + "!" + s[1] + ",Harimau Timur Sdn Bhd!" + s[2] + "/16 Dec 2018 14:26!" + s[3] + ":5.804904:101.910247";
                    Future<TransactionReceipt> t = cheeTest.updateItemLocation(ns).sendAsync();
                    ((TextView)findViewById(R.id.results)).setText(String.format("Successful transaction.\n\nTransaction hash: %s\n\nGas used: %s", t.get().getTransactionHash(), t.get().getGasUsed()));

                } catch (ExecutionException e) {
                    e.printStackTrace();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } catch (Exception e) {
                    e.printStackTrace();
                }


            }
        }
    }
}
