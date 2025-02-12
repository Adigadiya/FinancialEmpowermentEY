import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const MySchemeScreen = () => {
    const customCSS = `
        document.body.style.backgroundColor = "#000";  
        document.body.style.color = "#FFC107";  
        let elements = document.querySelectorAll('*');
        elements.forEach(el => el.style.fontFamily = 'Arial, sans-serif'); 
    `;

    return (
        <View style={styles.container}>
            <WebView 
                source={{ uri: 'https://www.myscheme.gov.in/hi' }}  
                style={styles.webView}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                injectedJavaScript={customCSS}
                startInLoadingState={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        marginTop: 0  // ✅ Moves schemes below buttons
    },
    webView: { 
        flex: 1 
    }
});

export default MySchemeScreen;
