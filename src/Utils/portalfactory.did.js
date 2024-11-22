export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({
    'ok' : IDL.Record({ 'portalID' : IDL.Text }),
    'err' : IDL.Text,
  });
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
    'create_user_portal' : IDL.Func([], [Result], []),
    'get_all_portals' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Text))],
        [],
      ),
    'get_bob_info' : IDL.Func([], [BobInfo], []),
    'get_user_miners' : IDL.Func([IDL.Principal], [IDL.Vec(Miner)], []),
    'get_user_portal' : IDL.Func([IDL.Principal], [IDL.Text], []),
    'save_user_portal' : IDL.Func([IDL.Principal, IDL.Text], [], []),
    'uploadWasm' : IDL.Func([IDL.Vec(IDL.Nat8)], [IDL.Text], []),
  });
  return PortalFactory;
};
export const init = ({ IDL }) => { return []; };
