import React from 'react';
import { WebView } from 'react-native-webview';
import { Platform } from 'react-native';
import { Spinner, Center, Box } from '@gluestack-ui/themed';

const WebViewScreen = () => {
  // Use http://10.0.2.2:8080 for Android emulator to access host's localhost
  const erpnextUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8080' : 'http://localhost:8080';

  return (
    <Box flex={1} bg="$white">
      <WebView
        source={{ uri: erpnextUrl }}
        startInLoadingState={true}
        renderLoading={() => (
          <Center position="absolute" top={0} left={0} right={0} bottom={0} bg="$white">
            <Spinner size="large" />
          </Center>
        )}
        style={{ flex: 1 }}
      />
    </Box>
  );
};

export default WebViewScreen;
