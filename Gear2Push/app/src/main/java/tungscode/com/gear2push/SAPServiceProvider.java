package tungscode.com.gear2push;


import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.os.Build;
import android.os.Handler;
import android.os.IBinder;
import android.os.Message;
import android.os.RemoteCallbackList;
import android.os.RemoteException;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;


import com.samsung.android.sdk.SsdkUnsupportedException;
import com.samsung.android.sdk.accessory.SA;
import com.samsung.android.sdk.accessory.SAAgent;
import com.samsung.android.sdk.accessory.SAPeerAgent;
import com.samsung.android.sdk.accessory.SASocket;


import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

public class SAPServiceProvider extends SAAgent{

    public static final String TAG = "SAPService";

    public final static int SERVICE_CONNECTION_RESULT_OK = 0;

    public final static int SAP_SERVICE_CHANNEL_ID = 100;
    private static final int SENT_THROUGH_SOCKET = 1; //this doesn't guarantee that Gear receives it
    private static final int CONNECTION_ERROR = -1;
    private static final int NO_CONNECTION = -2;
    private static final int MESSAGE_QUEUE_ERROR = -3;
    private static final int INIT_CAPACITY = 20;
    public static final String EXTRA_PAY_LOAD = "pay_load_msg";

    HashMap<Integer, SAPServiceProviderConnection> connectionMap = null;
    HashSet<String> mLiteralMsgQueue = new HashSet<String>(INIT_CAPACITY);
    final Object msgLock = new Object();


    long lastActiveMillis =0;
    final Object timeLock = new Object();

    private Timer mTimer;
    private NotifyTask mNotifyTask;
    private static final int MINUTE_VALUE = 5;
    private static final long INTERVAL_TO_CHECK_CONNECTION_MILLIS = 1000 * 60 * MINUTE_VALUE;
    private static final long EXPIRY_PERIOD_MILLIS = INTERVAL_TO_CHECK_CONNECTION_MILLIS; //these two isn't neccessarily the same, just for convenience now





    int mValue = 0;
    NotificationManager mNM;

    IncomingHandler mIncomingHandler;

    private void changeActiveTimeSync(long millis) {
        synchronized (timeLock){
            lastActiveMillis = millis;
        }
    }

    private void changeActiveTimeSync(){
        long current = System.currentTimeMillis();
        changeActiveTimeSync(current);
    }

    private long getActiveTimeMillisSync(){
        synchronized (timeLock){
            return lastActiveMillis;
        }

    }

    /***/
    private void startActiveStateCheckingTimer() {
        if (mTimer == null) {
            mTimer = new Timer();

            mNotifyTask = new NotifyTask();
            mTimer.scheduleAtFixedRate(mNotifyTask, 0,
                    INTERVAL_TO_CHECK_CONNECTION_MILLIS);
        }
    }

    private class NotifyTask extends TimerTask {
        @Override
        public void run() {
            if (  System.currentTimeMillis() - getActiveTimeMillisSync()> EXPIRY_PERIOD_MILLIS){
                //todoTung: stop service here
            }

        }

    }



    public SAPServiceProvider() {
        super(TAG, SAPServiceProviderConnection.class);
        Log.d("SAP PROVIDER", "SERVICE CONSTRUCTOR");
    }


    private void disconnectAllAgents() {
        if (connectionMap!=null){
            for (SAPServiceProviderConnection connection: connectionMap.values()){
                connection.close();
            }
        }
    }

    @Override
    public int onStartCommand(Intent intent, int i, int i2) {
        super.onStartCommand(intent,i, i2);

        //change, put the message into the queue

        String literalMsg = intent.getStringExtra(EXTRA_PAY_LOAD);
        //notification is just for testing
        mIncomingHandler.sendMessage(mIncomingHandler.obtainMessage(IncomingHandler.SHOW_NOTIF,literalMsg));
        //these are the real deal
        //step 1: put the alert we want to send to gear in a queue
        mIncomingHandler.sendMessage(mIncomingHandler.obtainMessage(IncomingHandler.PUT_LITERAL_MSG_TO_QUEUE,literalMsg));
        //step 2: attempt connection if there's none
        mIncomingHandler.sendMessage(mIncomingHandler.obtainMessage(IncomingHandler.CHECK_AND_ATTEMP_CONNECTION));
        //step 3: call the method send to gear
        mIncomingHandler.sendMessage(mIncomingHandler.obtainMessage(IncomingHandler.SEND_TO_GEAR));

        return START_NOT_STICKY;
    }

    @Override
    public void onCreate() {
        super.onCreate();

        //Tung: test code
        mNM = (NotificationManager)getSystemService(NOTIFICATION_SERVICE);


        //Tung: end test code
        changeActiveTimeSync();

//        LogUtils.LOGD("TIMER", "service created at: " + System.currentTimeMillis()/1000);

        startActiveStateCheckingTimer();



        mIncomingHandler = new IncomingHandler();
        Log.i(TAG, "onCreate of smart view Provider Service");

        SA mAccessory = new SA();
        try {
            mAccessory.initialize(this);
            Log.d("SAP PROVIDER", "ON CREATE TRY BLOCK");
        } catch (SsdkUnsupportedException e) {
            // Error Handling
            Log.d("SAP PROVIDER", "ON CREATE TRY BLOCK ERROR UNSUPPORTED SDK");
        } catch (Exception e1) {
            Log.e(TAG, "Cannot initialize Accessory package.");
            e1.printStackTrace();
				/*
				 * Your application can not use Accessory package of Samsung
				 * Mobile SDK. You application should work smoothly without using
				 * this SDK, or you may want to notify user and close your app
				 * gracefully (release resources, stop Service threads, close UI
				 * thread, etc.)
				 */

            stopSelf();
        }
//        LogUtils.LOGD(TAG, "service created, bus registered");


    }



    @Override
    protected void onServiceConnectionRequested(SAPeerAgent peerAgent) {
        changeActiveTimeSync(System.currentTimeMillis());
        acceptServiceConnectionRequest(peerAgent);
        Log.d("SAP PROVIDER", "CONNECTION REQUESTED : " + peerAgent.getAppName());
    }


    @Override
    protected void onFindPeerAgentResponse(SAPeerAgent arg0, int arg1) {
        changeActiveTimeSync(System.currentTimeMillis());
        Log.d(TAG, "onFindPeerAgentResponse  arg1 =" + arg1);
        try {
            requestServiceConnection(arg0);
        }catch (Exception ex){
//            LogUtils.LOGD(TAG,"error calling requestServiceConnection, agent may be offline");
        }

    }


    @Override
    protected void onServiceConnectionResponse(SASocket thisConnection,
                                               int result) {
        if (result == CONNECTION_SUCCESS) {
            if (thisConnection != null) {
                SAPServiceProviderConnection myConnection = (SAPServiceProviderConnection) thisConnection;

                if (connectionMap == null) {
                    connectionMap = new HashMap<Integer, SAPServiceProviderConnection>();
                }


                myConnection.mConnectionId = (int) (System.currentTimeMillis() & 255);

                Log.d(TAG, "onServiceConnection connectionID = "
                        + myConnection.mConnectionId);

                connectionMap.put(myConnection.mConnectionId, myConnection);

                Toast.makeText(getBaseContext(),
                        "CONNECTION TO GEAR ESTABLISHED", Toast.LENGTH_LONG)
                        .show();

            } else {
                Log.e(TAG, "SASocket object is null");
            }
        } else if (result == CONNECTION_ALREADY_EXIST) {
            Log.e(TAG, "onServiceConnectionResponse, CONNECTION_ALREADY_EXIST");
        } else {
            Log.e(TAG, "onServiceConnectionResponse result error =" + result);
        }

        //in either case we want to send alert to gear
        if (result==CONNECTION_SUCCESS || result==CONNECTION_ALREADY_EXIST){
            changeActiveTimeSync();
            if (mIncomingHandler!=null)
                mIncomingHandler.sendMessage(mIncomingHandler.obtainMessage(IncomingHandler.SEND_TO_GEAR));
        }
    }


    private void checkAndAttemptConnection() {
        if (connectionMap==null||connectionMap.isEmpty()) //if there's no connection, should do it now
            findPeerAgents();
    }

    public String getDeviceInfo()
    {
        String manufacturer = Build.MANUFACTURER;

        String model = Build.MODEL;

        return manufacturer + " " + model ;
    }



    public void putLiteralMessageToQueue(String literalMsg){
        synchronized (msgLock){
            mLiteralMsgQueue.add(literalMsg);
        }
    }

    public void removeLiteralMessageToQueue(String literalMsg){
        synchronized (msgLock){
            mLiteralMsgQueue.remove(literalMsg);
        }
    }

    public int  broadCastToGear(String message){
//        LogUtils.LOGD(TAG, "service received Bus post");
        if (connectionMap!=null && !connectionMap.isEmpty()){
            for (SAPServiceProviderConnection providerConnection : connectionMap
                    .values()) {
                try {
                    if (!TextUtils.isEmpty(message))
                        providerConnection.send(SAP_SERVICE_CHANNEL_ID,
                            (message)
                                    .getBytes());

                } catch (IOException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();

                }
            }
            return SENT_THROUGH_SOCKET;
        }
        return  NO_CONNECTION;

    }

    /**
     * Handler of incoming messages from clients.
     */
    class IncomingHandler extends Handler {
        static final int SEND_TO_GEAR = 1;
        static final int PUT_LITERAL_MSG_TO_QUEUE = 2;
        static final int CHECK_AND_ATTEMP_CONNECTION = 3;
        static final int SHOW_NOTIF = 4;


        @Override
        public void handleMessage(Message msg) {
            switch (msg.what) {
                case SEND_TO_GEAR:
                    int lastResult=-1;
                    if (mLiteralMsgQueue!=null && !mLiteralMsgQueue.isEmpty()){
                        Iterator<String> iterator = mLiteralMsgQueue.iterator();

                        while (iterator.hasNext()){
                            String litMsg =  iterator.next();
                            int broadCastResult = broadCastToGear(litMsg);
                            if (broadCastResult==SENT_THROUGH_SOCKET)
                            {
                                iterator.remove();
                                changeActiveTimeSync(System.currentTimeMillis());
                            }
                            lastResult = broadCastResult;
                        }
                    }


                    break;
                case PUT_LITERAL_MSG_TO_QUEUE:
                    putLiteralMessageToQueue((String) msg.obj);
                    break;
                case CHECK_AND_ATTEMP_CONNECTION:
                    checkAndAttemptConnection();
                    break;
                case SHOW_NOTIF:
                    //test code removed
                    break;
            }
        }


    }



    @Override
    public void onDestroy() {
        // Tell the user we stopped.
        Toast.makeText(this,"service stopped", Toast.LENGTH_SHORT).show();


        disconnectAllAgents();
        super.onDestroy();
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }






    public class SAPServiceProviderConnection extends SASocket {
        private int mConnectionId;

        public SAPServiceProviderConnection() {
            super(SAPServiceProviderConnection.class.getName());
            Log.d("SAP PROVIDER", "SAP CONNECTION CONSTRUCTOR");
        }

        @Override
        public void onError(int channelId, String errorString, int error) {
            Log.e(TAG, "Connection is not alive ERROR: " + errorString + "  "
                    + error);

            Log.d("SAP PROVIDER", "SAP CONNECTION ERROR " + errorString + " || " + error);
        }

        /**we don't expect to receive anything in this sample project, but if it does, just print out*/
        @Override
        public void onReceive(int channelId, byte[] data) {
            changeActiveTimeSync(System.currentTimeMillis());
            Log.d(TAG, "onReceive");

            final String message= new String(data);

            Log.d("SAP MESSAGE", message);



        }

        @Override
        protected void onServiceConnectionLost(int errorCode) {
            Log.e(TAG, "onServiceConectionLost  for peer = " + mConnectionId
                    + "error code =" + errorCode);
            //we are expecting only one connection
            if (connectionMap != null) {
                connectionMap.remove(mConnectionId);
            }
        }
    }

}