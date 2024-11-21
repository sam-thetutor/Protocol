export const idlFactory = ({ IDL }) => {
  const BobInfo = IDL.Record({
    'blocksMined' : IDL.Nat64,
    'totalMiners' : IDL.Nat64,
    'currentBlockMinerCount' : IDL.Nat64,
    'nextHalvingIn' : IDL.Nat64,
  });
  const Miner = IDL.Record({
    'id' : IDL.Principal,
    'mined_blocks' : IDL.Nat64,
  });
  const PortalFactory = IDL.Service({
    'get_bob_info' : IDL.Func([], [BobInfo], []),
    'get_user_miners' : IDL.Func([IDL.Principal], [IDL.Vec(Miner)], []),
  });
  return PortalFactory;
};
export const init = ({ IDL }) => { return []; };
