"use client";

import React from "react";
import Heading from "../../../ui/Heading";
import Text from "../../../ui/Text";
import Input from "../../../ui/Input";
import FontPickerItem from "./fonts/FontPickerItem";
import { useBrandKit } from "../../context/BrandKitContext";
import {
  getInvalidTypographyScaleFields,
  isValidTypographyScaleValue,
  type TypographyScaleField,
} from "../../utils/typographyScaleValidation";

const TYPOGRAPHY_SCALE_FIELDS: {
  field: TypographyScaleField;
  label: string;
}[] = [
  { field: "h1", label: "H1" },
  { field: "h2", label: "H2" },
  { field: "h3", label: "H3" },
  { field: "body", label: "Body" },
];

const SCALE_ERROR_TIMEOUT_MS = 4000;
const SCALE_ERROR_MESSAGE =
  "Use a valid CSS size like 16px, 1rem, or clamp(...).";

export default function BrandFont() {
  const { fonts, fontHandlers } = useBrandKit();
  const [visibleErrors, setVisibleErrors] = React.useState<
    Partial<Record<TypographyScaleField, string>>
  >({});
  const errorTimeoutsRef = React.useRef<
    Partial<Record<TypographyScaleField, number>>
  >({});
  const invalidScaleFields = React.useMemo(
    () => new Set(getInvalidTypographyScaleFields(fonts.scale)),
    [fonts.scale],
  );

  const clearFieldError = React.useCallback((field: TypographyScaleField) => {
    const timeoutId = errorTimeoutsRef.current[field];

    if (timeoutId) {
      window.clearTimeout(timeoutId);
      delete errorTimeoutsRef.current[field];
    }

    setVisibleErrors((prev) => {
      if (!prev[field]) return prev;

      const nextErrors = { ...prev };
      delete nextErrors[field];
      return nextErrors;
    });
  }, []);

  const showFieldError = React.useCallback(
    (field: TypographyScaleField) => {
      clearFieldError(field);

      setVisibleErrors((prev) => ({
        ...prev,
        [field]: SCALE_ERROR_MESSAGE,
      }));

      errorTimeoutsRef.current[field] = window.setTimeout(() => {
        setVisibleErrors((prev) => {
          if (!prev[field]) return prev;

          const nextErrors = { ...prev };
          delete nextErrors[field];
          return nextErrors;
        });

        delete errorTimeoutsRef.current[field];
      }, SCALE_ERROR_TIMEOUT_MS);
    },
    [clearFieldError],
  );

  const handleScaleChange = React.useCallback(
    (field: TypographyScaleField, value: string) => {
      clearFieldError(field);
      fontHandlers.scale.onScaleChange(field, value);
    },
    [clearFieldError, fontHandlers.scale],
  );

  const handleScaleBlur = React.useCallback(
    (field: TypographyScaleField) => {
      if (isValidTypographyScaleValue(fonts.scale[field])) {
        clearFieldError(field);
        return;
      }

      showFieldError(field);
    },
    [clearFieldError, fonts.scale, showFieldError],
  );

  React.useEffect(() => {
    const activeTimeouts = errorTimeoutsRef.current;

    return () => {
      Object.values(activeTimeouts).forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
    };
  }, []);

  return (
    <div className="border-b border-input-stroke pb-[4rem] flex flex-col gap-[2.4rem]">
      <div className="flex flex-col gap-[0.8rem]">
        <Heading size="sm">Brand Font</Heading>
        <Text size="sm">
          We&apos;ll use an email-safe font if your font isn&apos;t supported.
        </Text>
      </div>

      <div className="flex flex-col gap-[2.4rem]">
        <FontPickerItem {...fontHandlers.header} />
        <FontPickerItem {...fontHandlers.body} />
      </div>

      <div className="bg-input-filled rounded px-[1.6rem] py-[2.4rem] border border-input-stroke rounded-[0.8rem]">
        <Heading
          size="xs"
          className="text-text-secondary uppercase tracking-wider mb-[1.6rem]"
        >
          Typography Scale
        </Heading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.6rem]">
          {TYPOGRAPHY_SCALE_FIELDS.map(({ field, label }) => (
            <div key={field} className="flex flex-col gap-[0.8rem]">
              <Text size="xs" className="text-text-secondary">
                {label}
              </Text>
              <Input
                value={fonts.scale[field]}
                disabled={fontHandlers.scale.disabled}
                error={
                  invalidScaleFields.has(field) ? visibleErrors[field] : undefined
                }
                onChange={(e) => handleScaleChange(field, e.target.value)}
                onBlur={() => handleScaleBlur(field)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
