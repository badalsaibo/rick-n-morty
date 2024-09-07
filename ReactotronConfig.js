import Reactotron, { networking } from 'reactotron-react-native';

Reactotron.configure() // controls connection & communication settings
  .use(
    networking({
      ignoreUrls: /\/(logs|symbolicate)$/,
    }),
  )
  .connect(); // let's connect!
