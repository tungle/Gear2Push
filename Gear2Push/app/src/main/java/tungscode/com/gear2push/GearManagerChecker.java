package tungscode.com.gear2push;

import android.content.Context;
import android.content.pm.PackageManager;

/**
 * Created by Tung on 15/07/2014.
 * this class serves the purpose of checking whether the GearManager app exists on the phone to start connecting to Gear
 */
public class GearManagerChecker {
    String [] SAMSUNG_NAMES = {"com.samsung.android.app.watchmanager",
            "com.samsung.android.hostmanager.aidl",
            "com.samsung.android.uhm.framework"
    };

    public boolean isGearManagerAppInstalled(Context context, String packageName) {
        PackageManager pm =context.getPackageManager();
        boolean installed = false;
        try {
            pm.getPackageInfo(packageName, PackageManager.GET_ACTIVITIES| PackageManager.GET_SERVICES |
                                            PackageManager.GET_INTENT_FILTERS|PackageManager.GET_CONFIGURATIONS
                                            |PackageManager.GET_META_DATA
                                            |PackageManager.GET_CONFIGURATIONS|
                                            PackageManager.GET_PERMISSIONS
                                            |PackageManager.GET_SHARED_LIBRARY_FILES
                                            |PackageManager.GET_RECEIVERS);
            installed = true;
        } catch (PackageManager.NameNotFoundException e) {
            installed = false;
        }
        return installed;
    }
    public boolean isGearManagerAppInstalled(Context context) {
        boolean installed= false;
        for (String s: SAMSUNG_NAMES){
            installed |= isGearManagerAppInstalled(context, s);
        }
        return installed;
    }
}
