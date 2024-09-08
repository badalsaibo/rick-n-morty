import { View } from 'react-native';
import { Modal, Portal, Surface, Text } from 'react-native-paper';

const FILTERS = [
  {
    name: 'status',
    values: ['alive', 'dead', 'unknown'],
  },
  {
    name: 'species',
    values: [
      'Human',
      'Alien',
      'Humanoid',
      'Poopybutthole',
      'Mythological Creature',
      'Robot',
      'Cronenberg',
      'Unknown',
      'Parasite',
      'Animal',
      'Disease',
      'Alien Parasite',
      'Plant',
    ],
  },
  {
    name: 'gender',
    values: ['male', 'female', 'genderless', 'unknown'],
  },
  {
    name: 'type',
    values: ['Parasite', 'Cronenberg', 'Disease', 'Mythological Creature', 'Plant', 'Alien Parasite'],
  },
];

const FiltersModal = ({ visible, handleHideModal }: { visible: boolean; handleHideModal: () => void }) => {
  const containerStyle = { padding: 20 };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={handleHideModal} contentContainerStyle={containerStyle}>
        <Surface style={{ backgroundColor: 'red' }}>
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Surface>
      </Modal>
    </Portal>
  );
};

export default FiltersModal;
