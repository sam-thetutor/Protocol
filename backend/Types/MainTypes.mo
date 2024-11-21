import Blob "mo:base/Blob";
import Principal "mo:base/Principal";
module {


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