import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import { ReactotronReactNative } from 'reactotron-react-native';

type ReactotronType = ReactotronReactNative & { 
  createEnhancer: () => any 
};

const reactotron = Reactotron
    .configure({ name: 'Demo App', host: '10.0.2.2' }) // ← Use IP for Android or localhost for iOS
    .useReactNative()
    .use(reactotronRedux())
    .connect() as unknown as ReactotronType;

reactotron.clear?.();

export default reactotron;
