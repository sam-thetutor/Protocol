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
import IcpTypes "Types/ICP/icp.types";
import NicpTypes "Types/WATERNEURON/nicp.types";
import { recurringTimer } "mo:base/Timer";
import TrieMap "mo:base/TrieMap";
import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Error "mo:base/Error";
import BobTypes "Types/BOB/Bob.types";
import MainTypes "Types/MainTypes";
import IC "mo:ic";
import Cycles "mo:base/ExperimentalCycles";
import Array "mo:base/Array";
import Result "mo:base/Result";
import MgtTypes "Types/ICP/mgt.types";

//create and manage new D-earn portals for the users
actor class PortalFactory() = this {

    type BobInfo = MainTypes.BobInfo;
    type MinerSale = MainTypes.MinerSale;

    //store the portal wasm
    stable var portalWasm : [Nat8] = [];
    //mangement canister
    let ic = actor ("aaaaa-aa") : MgtTypes.IC;

    let WATER_NEURON_CANISTER_ID : Text = "tsbvt-pyaaa-aaaar-qafva-cai";
    let WATER_NEURON_NICP_CANISTER_ID : Text = "buwm7-7yaaa-aaaar-qagva-cai";
    let ICP_CANISTER_ID : Text = "ryjl3-tyaaa-aaaaa-aaaba-cai";
    let BOB_CANISTER_ID : Text = "6lnhz-oaaaa-aaaas-aabkq-cai";
    let bobActor = actor (BOB_CANISTER_ID) : BobTypes.Self;

    //create and store user Portals
    private stable var UserPortalArray : [(Principal, Text)] = [];
    private var UserPortalHashMap = HashMap.fromIter<Principal, Text>(
        Iter.fromArray(UserPortalArray),
        Iter.size(Iter.fromArray(UserPortalArray)),
        Principal.equal,
        Principal.hash,
    );

    //store the miners for sale
    private stable var MinerSaleArray : [(Text, MinerSale)] = [];
    private var MinerSaleHashMap = HashMap.fromIter<Text, MinerSale>(
        Iter.fromArray(MinerSaleArray),
        Iter.size(Iter.fromArray(MinerSaleArray)),
        Text.equal,
        Text.hash,
    );

    //get all the portals available for sale
    public func get_all_miners_for_sale() : async [(Text, MinerSale)] {
        return Iter.toArray(MinerSaleHashMap.entries());
    };

    //get the portal for sale
    public func get_miners_for_sale(_portalID : Text) : async ?MinerSale {
      return MinerSaleHashMap.get(_portalID)
    };

    //add miner for sale
    public shared({caller}) func add_miner_for_sale(_minerID :Principal ) : async [Principal] {
        try{
            let res = await ic.canister_status({canister_id = _minerID});
        return res.settings.controllers;
        }catch(error){
            return []
        }


        
        
        // let _miner : MinerSale={
        //     miner_id = _minerID;
        //     miner_type = _minerType;
        //     price = _price;
        //     owner = caller;
        //     offers = [];
        // };
        // MinerSaleHashMap.put(_minerID, _miner);
        // "success";
    };












    //add portal for sale
    //check if the caller is the controller of the portal before adding it for sale

    //remove miner from sale
    //check if caller is the one that listed it for sale
    public shared ({ caller }) func remove_miner_from_sale(_portalID : Text) : async Text {
        switch (MinerSaleHashMap.get(_portalID)) {
            case (?data) {
                if (data.owner == caller) {
                    ignore MinerSaleHashMap.remove(_portalID);
                    return "success";
                } else {
                    return "you are not the owner of the miner";
                };
            };
            case (null) { return "miner not found" };
        };
    };



    //manually save user portal
    public func save_user_portal(_usr : Principal, _portal : Text) : async () {
        UserPortalHashMap.put(_usr, _portal);
    };

    //create new user Portal
    public shared ({ caller }) func create_user_portal() : async Result.Result<{ portalID : Text }, Text> {

        switch (UserPortalHashMap.get(caller)) {
            case (?data) { return #err("user already has portal") };
            case (null) {

                let _usr = caller;

                if (Array.size(portalWasm) == 0) {
                    return #err("no portal wasm uploaded");
                };

                let settings : MgtTypes.canister_settings = {
                    freezing_threshold = null;
                    controllers = ?[_usr, Principal.fromActor(this)];
                    memory_allocation = null;
                    compute_allocation = null;
                    reserved_cycles_limit = null;
                    wasm_memory_limit = null;
                    log_visibility = null;
                };

                //add cycles for the canister creation
                Cycles.add(500_000_000_000); //5 billion cycles is required to create a new empty canister

                let _portal = await ic.create_canister({
                    settings = ?settings;
                    wasm_module = portalWasm;
                    sender_canister_version = null;
                });

                //install the portal wasm into the created canister

                let installSettings = {
                    arg = [];
                    wasm_module = portalWasm;
                    mode = #install;
                    canister_id = _portal.canister_id;
                    sender_canister_version = null

                };

                //deposit some cycles inside the canister to begin with
                Cycles.add(400_000_000_000);

                let depC = await ic.deposit_cycles({
                    canister_id = _portal.canister_id;
                });

                //install the wasm code inside the wallet canister
                let insRes = await ic.install_code(installSettings);

                //change the controllers of the portal to itself and the user
                let new_settings : MgtTypes.canister_settings = {
                    freezing_threshold = null;
                    controllers = ?[_usr, _portal.canister_id, Principal.fromActor(this)];
                    memory_allocation = null;
                    compute_allocation = null;
                    reserved_cycles_limit = null;
                    wasm_memory_limit = null;
                    log_visibility = null;
                };

                //update the settings to add the canister as a controller to itself

                let res = ic.update_settings({
                    canister_id = _portal.canister_id;
                    settings = new_settings;
                });

                UserPortalHashMap.put(_usr, Principal.toText(_portal.canister_id));
                UserPortalArray := Iter.toArray(UserPortalHashMap.entries());
                #ok({ portalID = Principal.toText(_portal.canister_id) });

            };
        };

    };

    //list the portal for sale

    //upgrade portal to the newest wasm
    public shared func upgrade_portal(canID : Text) : async Text {

        let _portal = Principal.fromText(canID);
        let installSettings = {
            arg = [];
            wasm_module = portalWasm;
            mode = #upgrade;
            canister_id = _portal;
            sender_canister_version = null;
        };
        let insRes = await ic.install_code(installSettings);
        "success";
    };

    //get user portal
    public func get_user_portal(_usr : Principal) : async Text {
        switch (UserPortalHashMap.get(_usr)) {
            case (?data) { return data };
            case (null) { return "" };
        };
    };

    //get all portals from the factory
    public func get_all_portals() : async [(Principal, Text)] {
        return Iter.toArray(UserPortalHashMap.entries());
    };

    //get bob details
    public func get_bob_info() : async BobInfo {
        let res1 = await bobActor.get_current_block_status();
        let res2 = await bobActor.get_statistics();
        return {
            totalMiners = res2.miner_count;
            blocksMined = res2.block_count;
            currentBlockMinerCount = res1.active_miners;
            nextHalvingIn = res2.block_count;
        };
    };

     //get hours left in bob mining pool
    public func get_bob_miner_pool_hours_left(user:Principal) : async Nat64 {
        return await bobActor.hours_left_in_pool(?user);
    };

    // get user miners for bob
    public func get_user_miners(_usr : Principal) : async [BobTypes.Miner] {
        return await bobActor.get_miners(_usr);
    };

    //upload the portal wasm to the canister
    public func uploadWasm(wasmBlob : [Nat8]) : async Text {
        try {
            portalWasm := wasmBlob;
            "success";

        } catch (error) {
            Error.message(error);
        };
    };
    //add persisted storage.
    system func preupgrade() {
        UserPortalArray := Iter.toArray(UserPortalHashMap.entries());
    };

    system func postupgrade() {
        UserPortalArray := [];
    };

};
