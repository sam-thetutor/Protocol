import Principal "mo:base/Principal";
import Blob "mo:base/Blob";
import Buffer "mo:base/Buffer";
import Nat8 "mo:base/Nat8";
import Nat "mo:base/Nat";
import Bool "mo:base/Bool";
import Nat64 "mo:base/Nat64";
import Text "mo:base/Text";
import Option "mo:base/Option";
import { toAccount } "./Utils";
import MainTypes "Types/MainTypes";
import IcpTypes "Types/ICP/icp.types";
import NicpTypes "Types/WATERNEURON/nicp.types";
import { recurringTimer } "mo:base/Timer";
import TrieMap "mo:base/TrieMap";
import Time "mo:base/Time";
import BobTypes "Types/BOB/Bob.types";

//create and manage new D-earn portals for the users
actor class PortalFactory() = this {

    let WATER_NEURON_CANISTER_ID : Text = "tsbvt-pyaaa-aaaar-qafva-cai";
    let WATER_NEURON_NICP_CANISTER_ID : Text = "buwm7-7yaaa-aaaar-qagva-cai";
    let ICP_CANISTER_ID : Text = "ryjl3-tyaaa-aaaaa-aaaba-cai";
    let BOB_CANISTER_ID : Text = "6lnhz-oaaaa-aaaas-aabkq-cai";
    let bobActor = actor (BOB_CANISTER_ID) : BobTypes.Self;

    type BobInfo = {
        totalMiners : Nat64;
        blocksMined : Nat64;
        currentBlockMinerCount : Nat64;
        nextHalvingIn : Nat64;
    };


    //get bob details
    public func get_bob_info() : async BobInfo {
        let res1 = await bobActor.get_current_block_status();
        let res2 = await bobActor.get_statistics();
        return {
            totalMiners = res2.miner_count;
            blocksMined = res2.block_count;
            currentBlockMinerCount = res1.active_miners;
            nextHalvingIn = 17500 -res2.block_count;
        };
    };

    // get user miners
    public func get_user_miners(_usr:Principal) : async [BobTypes.Miner] {
        return await bobActor.get_miners(_usr);
    };


};

