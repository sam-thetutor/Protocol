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

  public type BidOffer = {
    bid_id : Nat;
    bidder : Principal;
    price : Nat64;
    time : Int;
  };
  public type MinerType = {
    #BOB;
    #BONE;
  };

  public type MinerSale = {
    miner_id : Text;
    miner_type : MinerType;
    price : Nat64;
    owner : Principal;
    offers : [BidOffer];
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


  //analytics

  public type MinerAnalytics={
    



  };






};
