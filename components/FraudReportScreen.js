import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const FraudReportScreen = () => {
    const customCSS = `
        document.body.style.backgroundColor = "#000";  
        document.body.style.color = "#FFD700";  
        let elements = document.querySelectorAll('*');
        elements.forEach(el => {
            el.style.fontFamily = 'Arial, sans-serif'; 
            el.style.color = "#FFD700"; 
        }); 
    `;

    return (
        <View style={styles.container}>
            <WebView 
                source={{ uri: 'https://cybercrime.gov.in/Hindi/Accepthn.aspx' }}  
                style={styles.webView}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                injectedJavaScript={customCSS}
                startInLoadingState={true}
                setSupportMultipleWindows={false}  // Prevents popups breaking the experience
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: "#000"  // ✅ Ensures background remains black
    },
    webView: { 
        flex: 1 
    }
});

export default FraudReportScreen;
