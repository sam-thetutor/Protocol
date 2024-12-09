import Nat "mo:base/Nat";

module {

    public type BobAnalytics = {
        minersCreated : Nat;
        minersUpgrades : Nat;
        icpSpent : Nat;
        totalHrsInPool : Nat;
    };

    public type BoneAnalytics = {
        minersCreated : Nat;
        minersUpgrades : Nat;
        icpSpent : Nat;
        totalPoolsJoined : Nat;
    }

};
