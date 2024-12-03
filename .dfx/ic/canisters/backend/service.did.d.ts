import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface BidOffer {
  'time' : bigint,
  'price' : bigint,
  'bid_id' : bigint,
  'bidder' : Principal,
}
export interface BobInfo {
  'blocksMined' : bigint,
  'totalMiners' : bigint,
  'currentBlockMinerCount' : bigint,
  'nextHalvingIn' : bigint,
}
export interface Miner { 'id' : Principal, 'mined_blocks' : bigint }
export interface MinerSale {
  'owner' : Principal,
  'offers' : Array<BidOffer>,
  'price' : bigint,
  'miner_id' : string,
  'miner_type' : MinerType,
}
export type MinerType = { 'BOB' : null } |
  { 'BONE' : null };
export interface PortalFactory {
  'add_miner_for_sale' : ActorMethod<[Principal], Array<Principal>>,
  'create_user_portal' : ActorMethod<[], Result>,
  'get_all_miners_for_sale' : ActorMethod<[], Array<[string, MinerSale]>>,
  'get_all_portals' : ActorMethod<[], Array<[Principal, string]>>,
  'get_bob_info' : ActorMethod<[], BobInfo>,
  'get_bob_miner_pool_hours_left' : ActorMethod<[Principal], bigint>,
  'get_miners_for_sale' : ActorMethod<[string], [] | [MinerSale]>,
  'get_user_miners' : ActorMethod<[Principal], Array<Miner>>,
  'get_user_portal' : ActorMethod<[Principal], string>,
  'remove_miner_from_sale' : ActorMethod<[string], string>,
  'save_user_portal' : ActorMethod<[Principal, string], undefined>,
  'upgrade_portal' : ActorMethod<[string], string>,
  'uploadWasm' : ActorMethod<[Uint8Array | number[]], string>,
}
export type Result = { 'ok' : { 'portalID' : string } } |
  { 'err' : string };
export interface _SERVICE extends PortalFactory {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
