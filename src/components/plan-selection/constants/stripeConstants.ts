export const BASE_STYLE = {
  base: {
    fontSize: "16px",
    color: "#545859", // --text-primary
    fontFamily: '"SK Modernist", sans-serif',
    "::placeholder": {
      color: "#c5c6c9", // --muted
    },
    padding: "12px",
  },
  invalid: {
    color: "#cc0e11", // --destructive
  },
};

export const CARD_NUMBER_OPTIONS = {
  showIcon: true,
  style: BASE_STYLE,
};

export const CARD_EXPIRY_OPTIONS = {
  style: BASE_STYLE,
};

export const CARD_CVC_OPTIONS = {
  style: BASE_STYLE,
};

export const CARD_ELEMENT_OPTIONS = {
  hidePostalCode: true,
  style: BASE_STYLE,
};
