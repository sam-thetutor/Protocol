export const PORTAL_FACTORY = "65xre-uiaaa-aaaap-qpkia-cai";
export const ICP_LEDGER_ID = "ryjl3-tyaaa-aaaaa-aaaba-cai";
export const BONE_FUN_FACTORY_ID = "r74ot-lyaaa-aaaai-aqaya-cai";
export const BONE_TOKEN_CANISTER_ID = "ry5ih-gaaaa-aaaai-aqayq-cai";

export const shortenPrincipal = (principal) => {
  const principalStr = principal.toText();
  return `${principalStr.slice(0, 10)}...${principalStr.slice(-5)}`;
};

export const shortenText = (text) => {
  if (text?.length <= 15) return text;
  return `${text?.slice(0, 10)}...${text?.slice(-5)}`;
};

export const copyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Text copied to clipboard");
    })
    .catch((err) => {
      console.error("Could not copy text: ", err);
    });
};

export const tokenLedgers = [
  {
    name: "ICP",
    canister_id: "ryjl3-tyaaa-aaaaa-aaaba-cai",
    decimals: 8,
  },
  {
    name: "BONE",
    canister_id: "ry5ih-gaaaa-aaaai-aqayq-cai",
    decimals: 8,
  },
  {
    name: "ckUSDT",
    canister_id: "cngnf-vqaaa-aaaar-qag4q-cai",
    decimals: 8,
  },
  {
    name: "BOB",
    canister_id: "7pail-xaaaa-aaaas-aabmq-cai",
    decimals: 8,
  },
  {
    name: "ckBTC",
    canister_id: "mxzaz-hqaaa-aaaar-qaada-cai",
    decimals: 8,
  },
  {
    name: "ckETH",
    canister_id: "ss2fx-dyaaa-aaaar-qacoq-cai",
    decimals: 8,
  },
];
