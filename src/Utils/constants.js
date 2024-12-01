export const PORTAL_FACTORY = "65xre-uiaaa-aaaap-qpkia-cai"
export const ICP_LEDGER_ID = "ryjl3-tyaaa-aaaaa-aaaba-cai"
export const BONE_FUN_FACTORY_ID ="r74ot-lyaaa-aaaai-aqaya-cai"
export const BONE_TOKEN_CANISTER_ID="ry5ih-gaaaa-aaaai-aqayq-cai"


export const shortenPrincipal = (principal) => {
    const principalStr = principal.toText();
    return `${principalStr.slice(0, 10)}...${principalStr.slice(-5)}`;
  };