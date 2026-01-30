import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ChannelConnection, ChannelConnectionFormData } from "../../../../../types/channelConnectionTypes";

export interface GoogleFormData {
  email: string;
  readConfirmation: boolean;
}

export function useGoogleConfig(connection?: ChannelConnection | null) {
  const [readConfirmation, setReadConfirmation] = useState(false);

  const {
    control,
    handleSubmit: formHandleSubmit,
    setValue,
    watch,
    register,
    reset,
  } = useForm<GoogleFormData>({
    defaultValues: {
      email:
        typeof connection?.configuration?.email === "string"
          ? connection.configuration.email
          : "",
      readConfirmation:
        typeof connection?.configuration?.readConfirmation === "boolean"
          ? connection.configuration.readConfirmation
          : false,
    },
  });

  useEffect(() => {
    if (connection?.configuration) {
      reset({
        email:
          typeof connection.configuration.email === "string"
            ? connection.configuration.email
            : "",
        readConfirmation:
          typeof connection.configuration.readConfirmation === "boolean"
            ? connection.configuration.readConfirmation
            : false,
      });
      setReadConfirmation(
        typeof connection.configuration.readConfirmation === "boolean"
          ? connection.configuration.readConfirmation
          : (false as boolean)
      );
    } else {
      reset({
        email: "",
        readConfirmation: false,
      });
      setReadConfirmation(false);
    }
  }, [connection, reset]);

  const prepareFormData = (data: GoogleFormData): ChannelConnectionFormData => {
    return {
      name: data.email || "",
      email: data.email || "",
      readConfirmation,
    };
  };

  return {
    control,
    formHandleSubmit,
    setValue,
    watch,
    register,
    readConfirmation,
    setReadConfirmation,
    prepareFormData,
  };
}
