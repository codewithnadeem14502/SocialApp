export interface Post {
  id: number;
  title: string;
  image: string;
}

export type OnPressFunction = (postId: number) => void;

export type RootStackParamList = {
  MainScreen: undefined;
  CameraScreen: undefined;
};
