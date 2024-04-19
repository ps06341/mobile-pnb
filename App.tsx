import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";

export default function App() {
  const [source, setSource] = useState("https://nhasachphuongnam.com");

  const handleShouldStartLoadWithRequest = (event: any) => {
    if(typeof event == 'undefined' || typeof event.nativeEvent == 'undefined') {
      return true;
    }
    let url = event.nativeEvent.url;
    if (typeof url == 'undefined') {
      url = 'https://nhasachphuongnam.com';
    }
    if (url === source) return false;
    setSource(url);
    return true;
  };

  const handleNavigationStateChange = (navState: any) => {
    // Handle changes to the WebView's navigation state
    // This function is called whenever the URL changes
    // You can access the new URL from navState.url
    const newUrl = navState.url;
    console.log(newUrl);
  };

  const injectJavaScript = `
    window.onerror = function(message, source, lineno, colno, error) {
      // Handle the error here or prevent it from being displayed
      return true;
    };
  `;

  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        source={{ uri: source }}
        originWhitelist={["https://*"]}
        javaScriptEnabled={true}
        // onError={(error: any) => console.error("WebView error:", error)}
        // onError={(syntheticEvent:any) => {}}
        // onHttpError={(syntheticEvent:any) => {}}
        // renderError={(errorName:any) => {}}
        injectedJavaScript={injectJavaScript}
        //   injectedJavaScript={`
        // // Override console methods with empty functions
        // console.log = function() {};
        // console.error = function() {};
        // console.warn = function() {};
        // console.info = function() {};
        // console.debug = function() {};
        // `}
        onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
        // onShouldStartLoadWithRequest={() => {}}
        // injectedJavaScript={INJECTED_JAVASCRIPT}
        onOpenWindow={(syntheticEvent: any) => {
          const { nativeEvent } = syntheticEvent;
          const { targetUrl } = nativeEvent;
          setSource(targetUrl);
        }}
        onNavigationStateChange={handleNavigationStateChange}
        onMessage={(event: any) => {
          // const data = JSON.parse(event.nativeEvent.data);
          return;
        }}
        onReceivedResponseBody={(event: any) => {
          event.preventDefault();
        }}
        //
        allowFileAccessFromFileURLs={true}
        allowUniversalAccessFromFileURLs={true}
        allowsBackForwardNavigationGestures={false}
        automaticallyAdjustContentInsets={false}
        allowFileAccess={true}
        enableApplePay={true}
        useWebView2={true}
      />
    </View>
  );
}
