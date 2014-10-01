package tungscode.com.gear2push;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import java.util.Random;

/**
 * Created by Tung on 11/07/2014.
 */
public class Binding extends Activity {




    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.layout);


//        button.setOnClickListener(mUnbindListener);
        Button btnSend = (Button) findViewById(R.id.send_msg) ;
        btnSend.setOnClickListener(mSendListener);

    }




    private View.OnClickListener mSendListener = new View.OnClickListener() {
        String [] manualMsgs = {"manual message 1", "manual mess 2", "manual mess 3", "manual mess 4"};
        @Override
        public void onClick(View v) {


            GearMessageSender sender = new GearMessageSender();
            String msg = manualMsgs[(int)(new Random().nextDouble()*4)];
            String payLoad = GearMessageSender.buildMessage("title", "short_des", msg,"12345", "walk", GearMessageSender.GEAR_ACTION_CANCEL);
            sender.sendReminder(Binding.this, payLoad    );



        }
    };



}