import Blob "mo:base/Blob";
import Principal "mo:base/Principal";
import Int "mo:base/Int";
module {

  public type BobInfo = {
        totalMiners : Nat64;
        blocksMined : Nat64;
        currentBlockMinerCount : Nat64;
        nextHalvingIn : Nat64;
    };
    
    public type saleOffer = {
        bidder : Principal;
        price : Nat64;
        time : Int;
    
    };


  public type PortalSale = {
        portal_id : Text;
        price : Nat64;
        owner : Principal;
        offers : [saleOffer];
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