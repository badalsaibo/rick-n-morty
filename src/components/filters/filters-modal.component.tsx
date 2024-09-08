import { STYLES } from '@/constants/style.constant';
import { View } from 'react-native';
import { Chip, Modal, Portal, Surface, Text } from 'react-native-paper';
import { FilterKeys, FILTERS } from './filters.constant';

type FiltersModalProps = {
  visible: boolean;
  handleHideModal: () => void;
  onChangeFilter: (prop: { property: FilterKeys; value: string }) => void;
  selectedFilters: Record<FilterKeys, string>;
};

const FiltersModal = ({ visible, handleHideModal, onChangeFilter, selectedFilters }: FiltersModalProps) => {
  const containerStyle = { padding: 20 };

  const handleChangeFilter = (name: FilterKeys, val: string) => () => {
    onChangeFilter({ property: name, value: val });
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={handleHideModal} contentContainerStyle={containerStyle}>
        <Surface style={{ padding: STYLES.GUTTER, borderRadius: 8 }}>
          <View style={{ gap: STYLES.GUTTER }}>
            {FILTERS.map(({ name, values }) => (
              <View key={name} style={{ gap: 8 }}>
                <Text style={{ textTransform: 'capitalize' }}>{name}</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                  {values.map(val => (
                    <Chip
                      key={val}
                      mode="flat"
                      onPress={handleChangeFilter(name, val)}
                      selected={selectedFilters[name] === val}>
                      {val}
                    </Chip>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </Surface>
      </Modal>
    </Portal>
  );
};

export default FiltersModal;
