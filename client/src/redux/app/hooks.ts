import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useSelectorUser = (state: RootState) => state.user.data;

export const isFollowUser = (
  state: RootState,
  author_id?: string,
  follow_id?: string,
  checkCondition?: boolean
) =>
  author_id &&
  follow_id &&
  checkCondition &&
  state.following.list?.some(
    (follow) => follow.follow === follow_id && follow.author_id === author_id
  );
