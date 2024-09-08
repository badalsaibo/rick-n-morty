import Reactotron, { networking } from 'reactotron-react-native';

Reactotron.configure() // controls connection & communication settings
  .use(
    networking({
      ignoreUrls: /\/(logs|symbolicate)$/,
    }),
  )
  .useReactNative()
  .connect(); // let's connect!
