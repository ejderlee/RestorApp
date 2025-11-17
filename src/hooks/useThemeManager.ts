import { useCallback, useEffect, useRef, useState } from "react";
import { ThemeName, allThemes, AppTheme } from "../theme/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

type UseThemeManagerReturn = {
    theme: AppTheme;
    themeName: ThemeName;
    changeTheme: (t: ThemeName, fireConfetti?: boolean) => void;
    fadeScaleStyle: any; // Reanimated animated style
    confettiSignal: number;
};

const STORAGE_KEY = "APP_THEME_SELECTED";

export function useThemeManager(): UseThemeManagerReturn {
    const [themeName, setThemeName] = useState<ThemeName>("dark");
    const theme = allThemes[themeName];

    // global fade/scale transition animation
    const anim = useSharedValue(1);

    // konfeti tetikleme sinyali
    const [confettiSignal, setConfettiSignal] = useState(0);

    // İlk açılışta AsyncStorage’dan yükle
    useEffect(() => {
        AsyncStorage.getItem(STORAGE_KEY).then((val) => {
            if (val && val in allThemes) {
                setThemeName(val as ThemeName);
            }
        });
    }, []);

    const changeTheme = useCallback(
        (t: ThemeName, fireConfetti: boolean = true) => {
            setThemeName(t);
            AsyncStorage.setItem(STORAGE_KEY, t).catch(() => null);

            // global fade + scale
            anim.value = 0.85;
            anim.value = withTiming(1, { duration: 150 });

            // konfeti tetikleme
            if (fireConfetti) {
                setConfettiSignal(Math.random());
            }
        },
        []
    );

    const fadeScaleStyle = useAnimatedStyle(() => {
        return {
            opacity: anim.value,
            transform: [{ scale: anim.value }],
        };
    });

    return {
        theme,
        themeName,
        changeTheme,
        fadeScaleStyle,
        confettiSignal,
    };
}
