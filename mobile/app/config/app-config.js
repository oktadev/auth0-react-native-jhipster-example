import { Platform } from 'react-native';
import Constants from 'expo-constants';

// load extra config from the app.json file
const extra = Constants.manifest?.extra ?? {};

export default {
  // use 10.0.2.2 for Android to connect to host machine
  apiUrl: 'http://localhost:8080/',
  // leave blank if using Keycloak
  nativeClientId: '4wVRhHAtI93zilT8k41B2SxMRLfSrT7H',
  // use expo auth proxy with login, disable to enable logout completely from oauth provider
  useExpoAuthProxy: false, // Platform.select({ web: false, default: true }),
  // use fixtures instead of real API requests
  useFixtures: false,
  // debug mode
  debugMode: __DEV__,
  extra,
};
