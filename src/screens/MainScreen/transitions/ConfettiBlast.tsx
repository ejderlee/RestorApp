import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const CONFETTI_COLORS = ["#ff6b6b", "#feca57", "#1dd1a1", "#5f27cd", "#54a0ff"];

interface Props {
    signal: number; // theme change signal (Math.random)
}

/**
 * Lightweight, FPS-friendly confetti effect
 * triggered by theme change.
 */
export default function ConfettiBlast({ signal }: Props) {
    const [pieces, setPieces] = useState<
        { id: number; x: number; y: number; color: string }[]
    >([]);

    useEffect(() => {
        if (signal === 0) return;

        const newPieces = Array.from({ length: 22 }).map((_, i) => ({
            id: i,
            x: Math.random() * width,
            y: -20,
            color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        }));

        setPieces(newPieces);

        // Auto clear after 700ms
        setTimeout(() => setPieces([]), 700);
    }, [signal]);

    return (
        <>
            {pieces.map((p) => (
                <ConfettiPiece key={p.id} {...p} />
            ))}
        </>
    );
}

const ConfettiPiece = ({
                           x,
                           y,
                           color,
                       }: {
    x: number;
    y: number;
    color: string;
}) => {
    const translateY = useSharedValue(y);

    useEffect(() => {
        translateY.value = withTiming(height + 50, { duration: 650 });
    }, []);

    const style = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    return (
        <Animated.View
            style={[
                styles.piece,
                { backgroundColor: color, left: x },
                style,
            ]}
        />
    );
};

const styles = StyleSheet.create({
    piece: {
        width: 8,
        height: 14,
        borderRadius: 3,
        position: "absolute",
    },
});
