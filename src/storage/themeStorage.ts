import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeName } from "../theme/theme";

const STORAGE_KEY = "APP_THEME_SELECTED";

/**
 * Kaydedilen temayı getirir.
 */
export async function getSavedTheme(): Promise<ThemeName | null> {
    try {
        const value = await AsyncStorage.getItem(STORAGE_KEY);
        if (!value) return null;
        return value as ThemeName;
    } catch (e) {
        console.warn("ThemeStorage get error:", e);
        return null;
    }
}

/**
 * Temayı kaydeder.
 */
export async function saveTheme(t: ThemeName): Promise<void> {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, t);
    } catch (e) {
        console.warn("ThemeStorage save error:", e);
    }
}

/**
 * Temayı storage’dan tamamen siler.
 */
export async function clearTheme(): Promise<void> {
    try {
        await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        console.warn("ThemeStorage clear error:", e);
    }
}

/**
 * Uygulama ilk kez açılıp açılmadığını kontrol eder.
 */
const FIRST_RUN_KEY = "APP_FIRST_RUN";

export async function isFirstRun(): Promise<boolean> {
    try {
        const flag = await AsyncStorage.getItem(FIRST_RUN_KEY);
        if (flag) return false;

        await AsyncStorage.setItem(FIRST_RUN_KEY, "1");
        return true;
    } catch {
        return false;
    }
}
