export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({
    'ok' : IDL.Record({ 'portalID' : IDL.Text }),
    'err' : IDL.Text,
  });
  const saleOffer = IDL.Record({
    'time' : IDL.Int,
    'price' : IDL.Nat64,
    'bidder' : IDL.Principal,
  });
  const PortalSale = IDL.Record({
    'portal_id' : IDL.Text,
    'owner' : IDL.Principal,
    'offers' : IDL.Vec(saleOffer),
    'price' : IDL.Nat64,
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
  return IDL.Service({
    'create_user_portal' : IDL.Func([], [Result], []),
    'get_all_portals' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Text))],
        [],
      ),
    'get_all_portals_for_sale' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, PortalSale))],
        [],
      ),
    'get_bob_info' : IDL.Func([], [BobInfo], []),
    'get_bob_miner_pool_hours_left' : IDL.Func(
        [IDL.Principal],
        [IDL.Nat64],
        [],
      ),
    'get_portal_for_sale' : IDL.Func([IDL.Text], [PortalSale], []),
    'get_user_miners' : IDL.Func([IDL.Principal], [IDL.Vec(Miner)], []),
    'get_user_portal' : IDL.Func([IDL.Principal], [IDL.Text], []),
    'remove_portal_from_sale' : IDL.Func([IDL.Text], [IDL.Text], []),
    'save_user_portal' : IDL.Func([IDL.Principal, IDL.Text], [], []),
    'upgrade_portal' : IDL.Func([IDL.Text], [IDL.Text], []),
    'uploadWasm' : IDL.Func([IDL.Vec(IDL.Nat8)], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };