import React from "react";
import { View, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

interface Props {
    animatedStyle: any;
    children: React.ReactNode;
}

export default function FadeScaleTransition({ animatedStyle, children }: Props) {
    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            {children}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
