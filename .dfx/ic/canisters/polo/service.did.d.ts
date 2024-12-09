import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Claim {
  'status' : string,
  'claimant' : Principal,
  'description' : string,
  'medicalReports' : Uint8Array | number[],
  'receipts' : Uint8Array | number[],
  'policyNumber' : string,
}
export interface Loan {
  'apy' : number,
  'status' : string,
  'borrower' : Principal,
  'amount' : bigint,
}
export interface Policy {
  'owner' : Principal,
  'plan' : string,
  'term' : bigint,
  'conditions' : string,
  'monthlyFee' : bigint,
}
export interface _SERVICE {
  'addFunds' : ActorMethod<[bigint], string>,
  'borrowFunds' : ActorMethod<[bigint, number], string>,
  'buyPolicy' : ActorMethod<[string, bigint, bigint, string], string>,
  'fileClaim' : ActorMethod<
    [string, string, Uint8Array | number[], Uint8Array | number[]],
    string
  >,
  'repayLoan' : ActorMethod<[bigint], string>,
  'viewActiveLoans' : ActorMethod<[], Array<Loan>>,
  'viewClaims' : ActorMethod<[], Array<Claim>>,
  'viewPolicies' : ActorMethod<[], Array<Policy>>,
  'viewPooledFunds' : ActorMethod<[], bigint>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
