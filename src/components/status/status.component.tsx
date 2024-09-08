import { StatusType } from '@/types/character.type';
import { View } from 'react-native';
import { MD2Colors } from 'react-native-paper';

const Status = ({ status }: { status: StatusType }) => {
  const mapStatusToColor: Record<StatusType, string> = {
    alive: MD2Colors.green500,
    dead: MD2Colors.red500,
    unknown: MD2Colors.black,
  };
  return (
    <View
      style={{
        width: 12,
        height: 12,
        borderRadius: 100,
        backgroundColor: mapStatusToColor[status],
        overflow: 'hidden',
      }}
    />
  );
};

export default Status;
