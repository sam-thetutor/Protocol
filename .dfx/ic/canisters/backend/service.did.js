export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({
    'ok' : IDL.Record({ 'portalID' : IDL.Text }),
    'err' : IDL.Text,
  });
  const BidOffer = IDL.Record({
    'time' : IDL.Int,
    'price' : IDL.Nat64,
    'bid_id' : IDL.Nat,
    'bidder' : IDL.Principal,
  });
  const MinerType = IDL.Variant({ 'BOB' : IDL.Null, 'BONE' : IDL.Null });
  const MinerSale = IDL.Record({
    'owner' : IDL.Principal,
    'offers' : IDL.Vec(BidOffer),
    'price' : IDL.Nat64,
    'miner_id' : IDL.Text,
    'miner_type' : MinerType,
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
    'add_miner_for_sale' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(IDL.Principal)],
        [],
      ),
    'create_user_portal' : IDL.Func([], [Result], []),
    'get_all_miners_for_sale' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, MinerSale))],
        [],
      ),
    'get_all_portals' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Text))],
        [],
      ),
    'get_bob_info' : IDL.Func([], [BobInfo], []),
    'get_bob_miner_pool_hours_left' : IDL.Func(
        [IDL.Principal],
        [IDL.Nat64],
        [],
      ),
    'get_miners_for_sale' : IDL.Func([IDL.Text], [IDL.Opt(MinerSale)], []),
    'get_user_miners' : IDL.Func([IDL.Principal], [IDL.Vec(Miner)], []),
    'get_user_portal' : IDL.Func([IDL.Principal], [IDL.Text], []),
    'remove_miner_from_sale' : IDL.Func([IDL.Text], [IDL.Text], []),
    'save_user_portal' : IDL.Func([IDL.Principal, IDL.Text], [], []),
    'upgrade_portal' : IDL.Func([IDL.Text], [IDL.Text], []),
    'uploadWasm' : IDL.Func([IDL.Vec(IDL.Nat8)], [IDL.Text], []),
  });
  return PortalFactory;
};
export const init = ({ IDL }) => { return []; };
