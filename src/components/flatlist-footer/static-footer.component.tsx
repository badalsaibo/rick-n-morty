import RickImg from '@/assets/img/rick.jpg';
import { Image, View } from 'react-native';

const StaticFooter = () => {
  return (
    <View style={{ width: '100%' }}>
      <Image source={RickImg} style={{ width: '100%', height: 250 }} />
    </View>
  );
};

export default StaticFooter;
