export const idlFactory = ({ IDL }) => {
  const BobAnalytics = IDL.Record({
    'minersUpgrades' : IDL.Nat,
    'icpSpent' : IDL.Nat,
    'minersCreated' : IDL.Nat,
    'totalHrsInPool' : IDL.Nat,
  });
  const Account = IDL.Record({
    'owner' : IDL.Principal,
    'subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const NeuronId = IDL.Record({ 'id' : IDL.Nat64 });
  const CanisterInfo = IDL.Record({
    'neuron_6m_account' : Account,
    'latest_distribution_icp_per_vp' : IDL.Opt(IDL.Float64),
    'neuron_id_6m' : IDL.Opt(NeuronId),
    'neuron_id_8y' : IDL.Opt(NeuronId),
    'tracked_6m_stake' : IDL.Nat64,
    'minimum_withdraw_amount' : IDL.Nat64,
    'neuron_8y_stake_e8s' : IDL.Nat64,
    'governance_fee_share_percent' : IDL.Nat64,
    'neuron_8y_account' : Account,
    'minimum_deposit_amount' : IDL.Nat64,
    'neuron_6m_stake_e8s' : IDL.Nat64,
    'exchange_rate' : IDL.Nat64,
    'nicp_supply' : IDL.Nat64,
    'total_icp_deposited' : IDL.Nat64,
    'stakers_count' : IDL.Nat64,
  });
  return IDL.Service({
    'create_new_bob_miner' : IDL.Func([], [IDL.Text], []),
    'create_new_bone_miner' : IDL.Func([IDL.Text], [IDL.Text], []),
    'get_all_portal_investments' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat))],
        ['query'],
      ),
    'get_bob_analytics' : IDL.Func([], [BobAnalytics], []),
    'get_bone_analytics' : IDL.Func([], [BobAnalytics], []),
    'get_my_water_neuron_stakes' : IDL.Func(
        [],
        [IDL.Record({ 'nicp' : IDL.Nat })],
        [],
      ),
    'get_water_neuron_info' : IDL.Func([], [CanisterInfo], []),
    'join_bob_miner_pool' : IDL.Func([IDL.Nat], [IDL.Text], []),
    'join_bone_alliance_group' : IDL.Func([IDL.Nat64], [IDL.Text], []),
    'stake_in_water_neuron' : IDL.Func([IDL.Nat], [IDL.Text], []),
    'unstake_from_water_neuron' : IDL.Func([IDL.Nat], [IDL.Text], []),
    'upgrade_bob_miner' : IDL.Func([IDL.Principal], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };