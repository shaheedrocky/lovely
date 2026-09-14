import React from 'react';
import VectorIcon from '../common/VectorIcons';

interface GoogleIconProps {
  size?: number;
}

export const GoogleIcon: React.FC<GoogleIconProps> = ({ size = 20 }) => {
  return (
    <VectorIcon
      type="FontAwesome"
      name="google"
      size={size}
      color="#EA4335"
    />
  );
};

export default GoogleIcon;
