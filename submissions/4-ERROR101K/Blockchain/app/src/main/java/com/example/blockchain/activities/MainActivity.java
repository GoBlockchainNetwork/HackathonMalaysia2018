package com.example.blockchain.activities;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.arlib.floatingsearchview.FloatingSearchView;
import com.arlib.floatingsearchview.suggestions.model.SearchSuggestion;
import com.example.blockchain.R;
import com.example.blockchain.contracts.CheeTest;
import com.example.blockchain.fragments.TrackingFragment;
import com.example.blockchain.fragments.StoreFragment;
import com.google.android.material.snackbar.Snackbar;
import com.google.android.material.tabs.TabLayout;

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
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentPagerAdapter;
import androidx.viewpager.widget.ViewPager;

public class MainActivity extends AppCompatActivity implements FloatingSearchView.OnSearchListener {

    private final String INFURA_HTTP_CLIENT = "https://ropsten.infura.io/v3/5851eb9b0b58489086bc8e1ef2485a94";
    private final String CONTRACT_ADDRESS = "0x35E6403DC05AdC89Abe5241fDBbB936D5089C5Be";
    private final String PASSWORD = "khortesting";
    private final BigInteger GAS_LIMIT = new BigInteger("3000000");
    private final BigInteger GAS_PRICE = new BigInteger("2000000000");
    private FrameLayout progressOverlay;
    private LinearLayout mainContent;
    private FloatingSearchView searchView;
    private CheeTest cheeTest;
    private Web3j web3j;
    private Credentials credentials;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        setupUI();

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
            Snackbar.make(mainContent, "Oops! There's something wrong with your credentials.", Snackbar.LENGTH_SHORT).show();
            e.printStackTrace();
        }



    }

    private void setupUI(){
        mainContent = findViewById(R.id.main_content);
        progressOverlay = findViewById(R.id.progress_overlay);
        // Set up the ViewPager with the sections adapter.

        ViewPager viewPager = findViewById(R.id.container);
        viewPager.setAdapter(new fragmentPagerAdapter(getSupportFragmentManager()));
        TabLayout tabLayout = findViewById(R.id.tabs);
        viewPager.addOnPageChangeListener(new TabLayout.TabLayoutOnPageChangeListener(tabLayout));
        tabLayout.addOnTabSelectedListener(new TabLayout.ViewPagerOnTabSelectedListener(viewPager));

        searchView = findViewById(R.id.search);
        searchView.setOnSearchListener(this);
        searchView.setOnMenuItemClickListener(new FloatingSearchView.OnMenuItemClickListener() {
            @Override
            public void onActionMenuItemSelected(MenuItem item) {
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
        });

        viewPager.addOnPageChangeListener(new ViewPager.OnPageChangeListener() {
            @Override
            public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {

            }

            @Override
            public void onPageSelected(int position) {
                if (position == 0)
                    searchView.setSearchHint("Search for item");
                else
                    searchView.setSearchHint("Enter tracking code");

            }

            @Override
            public void onPageScrollStateChanged(int state) {

            }
        });

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == 0) {

            if (resultCode == RESULT_OK) {
                String contents = data.getStringExtra("SCAN_RESULT");
                cheeTest = new CheeTest(contents, web3j, credentials, GAS_PRICE, GAS_LIMIT);
                searchView.clearSearchFocus();
                progressOverlay.setVisibility(View.VISIBLE);

                Future<String> item = cheeTest.getItem().sendAsync();

                try {
                    String s = item.get();
                    Intent intent = new Intent(MainActivity.this, MapActivity.class);
                    intent.putExtra("data", s);
                    startActivity(intent);
                    TrackingFragment.updated = true;
                    progressOverlay.setVisibility(View.GONE);
                } catch (ExecutionException | InterruptedException e) {
                    Snackbar.make(mainContent, "Oops! Couldn't retrieve data from the smart contract.", Snackbar.LENGTH_SHORT).show();
                    progressOverlay.setVisibility(View.GONE);
                    e.printStackTrace();
                }
            }
        }
    }

    @Override
    public void onSuggestionClicked(SearchSuggestion searchSuggestion) {

    }

    @Override
    public void onSearchAction(String currentQuery) {
        cheeTest = new CheeTest(CONTRACT_ADDRESS, web3j, credentials, GAS_PRICE, GAS_LIMIT);
        searchView.clearSearchFocus();
        progressOverlay.setVisibility(View.VISIBLE);

        Future<String> item = cheeTest.getItem().sendAsync();

        try {
            String data = item.get();
            Intent intent = new Intent(MainActivity.this, MapActivity.class);
            intent.putExtra("data", data);
            startActivity(intent);
            progressOverlay.setVisibility(View.GONE);
        } catch (ExecutionException | InterruptedException e) {
            Snackbar.make(mainContent, "Oops! Couldn't retrieve data from the smart contract.", Snackbar.LENGTH_SHORT).show();
            progressOverlay.setVisibility(View.GONE);
            e.printStackTrace();
        }
    }


    public class fragmentPagerAdapter extends FragmentPagerAdapter {
        fragmentPagerAdapter(FragmentManager fm) {
            super(fm);
        }

        @NonNull
        @Override
        public Fragment getItem(int position) {
            switch (position) {
                case 0:
                    return new StoreFragment();
                case 1:
                    return new TrackingFragment();
                default:
                    return null;
            }
        }

        @Override
        public int getCount() {
            return 2;
        }
    }

}
