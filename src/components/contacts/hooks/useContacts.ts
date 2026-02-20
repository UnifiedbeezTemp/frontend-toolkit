"use client";

import { useEffect } from "react";
import { useAppDispatch } from "../../../store/hooks/useRedux";
import { setContacts } from "../../../store/slices/contactSlice";
import { generateContactsData } from "../utils/generateContactsData";

export const useContacts = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const data = generateContactsData();
    dispatch(setContacts(data));
  }, [dispatch]);
};
