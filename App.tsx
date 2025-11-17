import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainScreen from './src/screens/MainScreen/MainScreen';

export default function App() {
    return (
        <GestureHandlerRootView>
            <SafeAreaProvider>
                <MainScreen />
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
