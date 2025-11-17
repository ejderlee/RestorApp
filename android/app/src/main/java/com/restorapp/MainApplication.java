package com.restorApp;

import android.app.Application;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactHost;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactHost;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.react.flipper.ReactNativeFlipper;

import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost =
            new DefaultReactNativeHost(this) {
                @Override
                public boolean getUseDeveloperSupport() {
                    return true; // <-- BuildConfig.DEBUG yerine
                }

                @Override
                protected List<ReactPackage> getPackages() {
                    return new PackageList(this).getPackages();
                }

                @Override
                protected String getJSMainModuleName() {
                    return "index";
                }

                @Override
                protected boolean isNewArchEnabled() {
                    return false; // <-- BuildConfig.IS_NEW_ARCHITECTURE_ENABLED yerine
                }

                @Override
                protected Boolean isHermesEnabled() {
                    return true; // <-- BuildConfig.IS_HERMES_ENABLED yerine
                }
            };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public ReactHost getReactHost() {
        return DefaultReactHost.getDefaultReactHost(this, mReactNativeHost);
    }

    @Override
    public void onCreate() {
        super.onCreate();
        // Flipper'ı debug modunda başlat
        ReactNativeFlipper.initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
    }
}
