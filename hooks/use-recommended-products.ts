import { useDropByHandle } from './use-drop-by-handle';

const RECOMMENDED_DROP_HANDLE = 'drop-29';

export const useRecommendedProducts = () => {
  return useDropByHandle(RECOMMENDED_DROP_HANDLE);
};
