package net.axihost.uniid;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

public class RegisterActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        Button btnRegister = findViewById(R.id.btnSend);
        setSupportActionBar(toolbar);


        btnRegister.setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
                Toast.makeText(getApplicationContext(),
                        "Universal ID created", Toast.LENGTH_LONG)
                        .show();
                // TODO: 16/12/18
                /*
                * Connect to Ethereum block and create ID using Biodata
                * and org.web3j:core:3.3.1-android API
                * return data and pass to Display Activity
                * */
                startActivity(new Intent(RegisterActivity.this, ThirdActivity.class));
                finish();

            }
        });
    }
    @Override
    public void onBackPressed() {
        Intent i = new Intent(RegisterActivity.this, MainActivity.class);
        startActivity(i);
        finish();
    }

}
