import { Appbar } from 'react-native-paper';

import Logo from '@/assets/svg/logo.svg'

const renderLogo = <Logo style={{ width: 90, height: 24, }} />

const CustomHeader = () => {
    return (
        <Appbar.Header>
            <Appbar.Content title={renderLogo} />
            <Appbar.Action icon="account-circle" onPress={() => { }} />
        </Appbar.Header>
    );
}

export default CustomHeader;