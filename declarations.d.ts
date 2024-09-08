declare module '*.svg' {
  import { type SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '@env' {
  export const API_URL: string;
}

declare module '*.png';
