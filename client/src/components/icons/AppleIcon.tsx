import React from 'react';
import VectorIcon from '../common/VectorIcons';

interface AppleIconProps {
  size?: number;
  color?: string;
}

export const AppleIcon: React.FC<AppleIconProps> = ({
  size = 20,
  color = '#000000',
}) => {
  return (
    <VectorIcon
      type="FontAwesome"
      name="apple"
      size={size}
      color={color}
    />
  );
};

export default AppleIcon;
