import Blob "mo:base/Blob";
import Principal "mo:base/Principal";
module {

  public type BobInfo = {
        totalMiners : Nat64;
        blocksMined : Nat64;
        currentBlockMinerCount : Nat64;
        nextHalvingIn : Nat64;
    };


public type Subaccount = Blob;
  public type Account = {
    owner : Principal;
    subaccount : ?Subaccount;
  };

  public type RecurringWtrNeuronStake = {
        rec_id : Nat;
        amount : Nat64;
        recTime : Nat;
    };
};