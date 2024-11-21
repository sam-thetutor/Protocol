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
  'get_bob_info' : ActorMethod<[], BobInfo>,
  'get_user_miners' : ActorMethod<[Principal], Array<Miner>>,
}
export interface _SERVICE extends PortalFactory {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
