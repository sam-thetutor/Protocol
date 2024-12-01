import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface BobInfo {
  'blocksMined' : bigint,
  'totalMiners' : bigint,
  'currentBlockMinerCount' : bigint,
  'nextHalvingIn' : bigint,
}
export interface Miner { 'id' : Principal, 'mined_blocks' : bigint }
export interface PortalFactory {
  'create_user_portal' : ActorMethod<[], Result>,
  'get_all_portals' : ActorMethod<[], Array<[Principal, string]>>,
  'get_all_portals_for_sale' : ActorMethod<[], Array<[string, PortalSale]>>,
  'get_bob_info' : ActorMethod<[], BobInfo>,
  'get_bob_miner_pool_hours_left' : ActorMethod<[Principal], bigint>,
  'get_portal_for_sale' : ActorMethod<[string], PortalSale>,
  'get_user_miners' : ActorMethod<[Principal], Array<Miner>>,
  'get_user_portal' : ActorMethod<[Principal], string>,
  'remove_portal_from_sale' : ActorMethod<[string], string>,
  'save_user_portal' : ActorMethod<[Principal, string], undefined>,
  'upgrade_portal' : ActorMethod<[string], string>,
  'uploadWasm' : ActorMethod<[Uint8Array | number[]], string>,
}
export interface PortalSale {
  'portal_id' : string,
  'owner' : Principal,
  'offers' : Array<saleOffer>,
  'price' : bigint,
}
export type Result = { 'ok' : { 'portalID' : string } } |
  { 'err' : string };
export interface saleOffer {
  'time' : bigint,
  'price' : bigint,
  'bidder' : Principal,
}
export interface _SERVICE extends PortalFactory {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
