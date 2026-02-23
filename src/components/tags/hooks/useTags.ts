import { useEffect } from "react";
import { useAppDispatch } from "../../../store/hooks/useRedux";
import { setTags } from "../../../store/slices/tagSlice";
import { generateTagsData } from "../utils/generateTagsData";

export const useTags = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initialTags = generateTagsData(100);
    dispatch(setTags(initialTags));
  }, [dispatch]);
};
