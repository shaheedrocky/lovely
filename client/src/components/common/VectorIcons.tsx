import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Feather from 'react-native-vector-icons/dist/Feather';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons';
import Octicons from 'react-native-vector-icons/dist/Octicons';
import Fontisto from 'react-native-vector-icons/dist/Fontisto';

type IconType =
  | 'MaterialCommunityIcons'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'MaterialIcons'
  | 'Feather'
  | 'AntDesign'
  | 'Entypo'
  | 'Ionicons'
  | 'EvilIcons'
  | 'Octicons'
  | 'Fontisto';

interface VectorIconProps {
  name: string;
  size?: number;
  color?: string;
  type?: IconType;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const VectorIcon: React.FC<VectorIconProps> = ({
  name,
  size = 24,
  color = '#000000',
  type = 'MaterialIcons',
  onPress,
  style,
}) => {
  const iconProps = {
    name,
    size,
    color,
    onPress,
  };

  return (
    <View style={style}>
      {type === 'MaterialCommunityIcons' ? (
        <MaterialCommunityIcons {...iconProps} />
      ) : type === 'FontAwesome' ? (
        <FontAwesome {...iconProps} />
      ) : type === 'FontAwesome5' ? (
        <FontAwesome5 {...iconProps} />
      ) : type === 'Feather' ? (
        <Feather {...iconProps} />
      ) : type === 'AntDesign' ? (
        <AntDesign {...iconProps} />
      ) : type === 'Entypo' ? (
        <Entypo {...iconProps} />
      ) : type === 'Ionicons' ? (
        <Ionicons {...iconProps} />
      ) : type === 'EvilIcons' ? (
        <EvilIcons {...iconProps} />
      ) : type === 'Octicons' ? (
        <Octicons {...iconProps} />
      ) : type === 'Fontisto' ? (
        <Fontisto {...iconProps} />
      ) : (
        <MaterialIcons {...iconProps} />
      )}
    </View>
  );
};

export default VectorIcon;