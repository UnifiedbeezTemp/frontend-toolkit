"use client";

import { useEffect } from "react";
import { useAppDispatch } from "../../../store/hooks/useRedux";
import { setAutomations } from "../../../store/slices/automationSlice";
import { Automation } from "../../../store/slices/automationSlice";

import { useSupabaseImages } from "../../../lib/supabase/useSupabase";
import { generateAutomationsData } from "../utils/generateAutomationsData";

export const useAutomations = (automationType: string) => {
  const dispatch = useAppDispatch();
  const icons = useSupabaseImages();

  useEffect(() => {
    const data = generateAutomationsData(icons);
    dispatch(setAutomations(data));
  }, [dispatch, automationType, icons]);
};
