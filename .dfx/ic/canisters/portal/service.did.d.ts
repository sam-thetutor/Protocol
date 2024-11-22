import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Account {
  'owner' : Principal,
  'subaccount' : [] | [Uint8Array | number[]],
}
export interface CanisterInfo {
  'neuron_6m_account' : Account,
  'latest_distribution_icp_per_vp' : [] | [number],
  'neuron_id_6m' : [] | [NeuronId],
  'neuron_id_8y' : [] | [NeuronId],
  'tracked_6m_stake' : bigint,
  'minimum_withdraw_amount' : bigint,
  'neuron_8y_stake_e8s' : bigint,
  'governance_fee_share_percent' : bigint,
  'neuron_8y_account' : Account,
  'minimum_deposit_amount' : bigint,
  'neuron_6m_stake_e8s' : bigint,
  'exchange_rate' : bigint,
  'nicp_supply' : bigint,
  'total_icp_deposited' : bigint,
  'stakers_count' : bigint,
}
export interface DEARNPORTAL {
  'get_my_water_neuron_stakes' : ActorMethod<[], { 'nicp' : bigint }>,
  'get_water_neuron_info' : ActorMethod<[], CanisterInfo>,
  'stake_in_water_neuron' : ActorMethod<[bigint], string>,
  'unstake_from_water_neuron' : ActorMethod<[bigint], string>,
}
export interface NeuronId { 'id' : bigint }
export interface _SERVICE extends DEARNPORTAL {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
