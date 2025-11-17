import React from "react";
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    ScrollView,
    Dimensions,
} from "react-native";
import { MotiView, MotiText } from "moti";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";
import Haptic from "react-native-haptic-feedback";

import ThemePreview from "./ThemePreview";
import { ThemeName, allThemes, AppTheme } from "../../theme/theme";

const SCREEN_HEIGHT = Dimensions.get("window").height;

interface Props {
    visible: boolean;
    onClose: () => void;
    currentTheme: ThemeName;
    onSelect: (t: ThemeName) => void;
}

export default function ThemeSelector({
                                          visible,
                                          onClose,
                                          currentTheme,
                                          onSelect,
                                      }: Props) {
    if (!visible) return null;

    const backdropPress = () => {
        Haptic.trigger("impactLight");
        onClose();
    };

    const handleSelect = (t: ThemeName) => {
        Haptic.trigger("impactMedium");
        onSelect(t);
        onClose();
    };

    return (
        <View style={styles.overlay}>
            {/* BACKDROP */}
            <Pressable style={styles.backdrop} onPress={backdropPress} />

            {/* MODAL */}
            <MotiView
                from={{ translateY: SCREEN_HEIGHT }}
                animate={{ translateY: 0 }}
                exit={{ translateY: SCREEN_HEIGHT }}
                transition={{ type: "spring", damping: 18 }}
                style={styles.modal}
            >
                <Text style={styles.title}>Tema Seç</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {Object.keys(allThemes).map((key) => {
                        const name = key as ThemeName;
                        const theme = allThemes[name];
                        const isSelected = name === currentTheme;

                        return (
                            <ThemeCard
                                key={name}
                                name={name}
                                theme={theme}
                                isSelected={isSelected}
                                onPress={() => handleSelect(name)}
                            />
                        );
                    })}
                </ScrollView>
            </MotiView>
        </View>
    );
}

/* -----------------------------------------------------------
   ThemeCard — 3D hover, preview, colors, animated borders
------------------------------------------------------------*/

function ThemeCard({
                       name,
                       theme,
                       isSelected,
                       onPress,
                   }: {
    name: ThemeName;
    theme: AppTheme;
    isSelected: boolean;
    onPress: () => void;
}) {
    const tilt = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: withTiming(isSelected ? 1 : 0.96, { duration: 200 }) },
            { rotateZ: `${tilt.value}deg` },
        ],
    }));

    const onPressIn = () => {
        tilt.value = withTiming(-3, { duration: 80 });
    };
    const onPressOut = () => {
        tilt.value = withTiming(0, { duration: 80 });
    };

    return (
        <Pressable
            onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={styles.cardWrapper}
        >
            <Animated.View
                style={[
                    styles.card,
                    {
                        backgroundColor: theme.bg,
                        borderColor: isSelected ? theme.primary : "rgba(255,255,255,0.04)",
                        borderWidth: isSelected ? 3 : 1,
                    },
                    animatedStyle,
                ]}
            >
                {/* Canlı SCREEN PREVIEW */}
                <ThemePreview theme={theme} />

                {/* Renk barları */}
                <View style={styles.colorRow}>
                    <View
                        style={[styles.colorBox, { backgroundColor: theme.primary }]}
                    />
                    <View
                        style={[styles.colorBox, { backgroundColor: theme.secondary }]}
                    />
                    <View style={[styles.colorBox, { backgroundColor: theme.surface }]} />
                </View>

                <MotiText
                    from={{ opacity: 0, translateY: 4 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ duration: 300 }}
                    style={[styles.cardText, { color: theme.text }]}
                >
                    {name}
                </MotiText>
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 200,
        justifyContent: "flex-end",
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.45)",
    },
    modal: {
        paddingTop: 20,
        paddingBottom: 40,
        paddingHorizontal: 20,
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
        backgroundColor: "#101010",
        elevation: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#fff",
        marginBottom: 16,
    },
    cardWrapper: {
        marginRight: 18,
    },
    card: {
        width: 150,
        borderRadius: 22,
        padding: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    cardText: {
        fontSize: 13,
        fontWeight: "600",
        marginTop: 10,
        textTransform: "capitalize",
    },
    colorRow: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 6,
    },
    colorBox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        marginHorizontal: 4,
    },
});
