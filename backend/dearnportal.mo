import WaterneuronTypes "Types/WATERNEURON/waterneuron.types";
import SwapinfoTypes "Types/ICPSWAP/swapinfo.types";
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
import Error "mo:base/Error";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Int "mo:base/Int";
import BobTypes "Types/BOB/Bob.types";
import MgtTypes "Types/ICP/mgt.types";
import BoneTypes "Types/BONE/Bone.types";

actor class DEARNPORTAL() = this {


    type RecurringWtrNeuronStake = MainTypes.RecurringWtrNeuronStake;


    let PORTALFACTORY_CANISTER_ID :Text = "";
    let WATER_NEURON_CANISTER_ID : Text = "tsbvt-pyaaa-aaaar-qafva-cai";
    let WATER_NEURON_NICP_CANISTER_ID : Text = "buwm7-7yaaa-aaaar-qagva-cai";
    let ICP_CANISTER_ID : Text = "ryjl3-tyaaa-aaaaa-aaaba-cai";
    let BOB_CANISTER_ID : Text = "6lnhz-oaaaa-aaaas-aabkq-cai";
    let BONE_CANISTER_ID : Text = "r74ot-lyaaa-aaaai-aqaya-cai";
    let BONE_TOKEN_ID = "ry5ih-gaaaa-aaaai-aqayq-cai";

    let ic = actor ("aaaaa-aa") : MgtTypes.IC;
    let bobActor = actor (BOB_CANISTER_ID) : BobTypes.Self;
    let boneActor = actor (BONE_CANISTER_ID) : BoneTypes.Self;
    let WaterNeuron = actor (WATER_NEURON_CANISTER_ID) : WaterneuronTypes.Self;
    let IcpActor = actor (ICP_CANISTER_ID) : IcpTypes.Self;
    let NicpActor = actor (WATER_NEURON_NICP_CANISTER_ID) : NicpTypes.Self;

  
  
  
  
  
  
    private var recurringStaking = TrieMap.TrieMap<Text, MainTypes.RecurringWtrNeuronStake>(Text.equal, Text.hash);







    //create new Miner
    public func create_new_bob_miner() : async Text {
        //approve the bo bob actor to spend the icp
        let approvalResults = await IcpActor.icrc2_approve({
            fee = null;
            memo = null;
            from_subaccount = null;
            created_at_time = null;
            amount = 100000000;
            expected_allowance = null;
            expires_at = null;
            spender = {
                owner = Principal.fromText(BOB_CANISTER_ID);
                subaccount = null;
            };
        });

        //create the miner
        switch (approvalResults) {
            case (#Ok(val)) {

                let results = await bobActor.spawn_miner(100000000);
                switch (results) {
                    case (#Ok(prin)) {
                        return "miner created successfully";
                    };
                    case (#Err(err)) {
                        return "failed to create miner";
                    };
                };
            };
            case (#Err(err)) {
                return "failed to approve the bob actor to spend the icp";
            };
        };
    };


    //list the bob  miner for sale

    // public shared({caller}) func list_miner_for_sale():async Text{
    //     //call the backend to list the miner for sale
    // };








    //upgrade bob miner
    public func upgrade_bob_miner(_miner : Principal) : async Text {
        //approve the bo bob actor to spend the icp
        let approvalResults = await IcpActor.icrc2_approve({
            fee = null;
            memo = null;
            from_subaccount = null;
            created_at_time = null;
            amount = 100000000;
            expected_allowance = null;
            expires_at = null;
            spender = {
                owner = Principal.fromText(BOB_CANISTER_ID);
                subaccount = null;
            };
        });

        //create the miner
        switch (approvalResults) {
            case (#Ok(val)) {

                let results = await bobActor.upgrade_miner(_miner);
                switch (results) {
                    case (#Ok) {
                        return "miner upgraded successfully";
                    };
                    case (#Err(err)) {
                        return "failed to upgrade miner";
                    };
                };
            };
            case (#Err(err)) {
                return "failed to approve the bob actor to spend the icp"
            };
        };
    };

    //join the miner pool
    public func join_bob_miner_pool(amount : Nat) : async Text {

        let approvalResults = await IcpActor.icrc2_approve({
            fee = null;
            memo = null;
            from_subaccount = null;
            created_at_time = null;
            amount = amount;
            expected_allowance = null;
            expires_at = null;
            spender = {
                owner = Principal.fromText(BOB_CANISTER_ID);
                subaccount = null;
            };
        });
        switch (approvalResults) {
            case (#Ok(val)) {
                let results = await bobActor.join_pool(Nat64.fromNat(amount));
                switch (results) {
                    case (#Ok) {
                        return "joined the miner pool";
                    };
                    case (#Err(err)) {
                        return "failed to join the miner pool";
                    };
                };
            };
            case (#Err(err)) {
                return "failed to approve the bob actor to spend the icp";
            };
        };

    };

    //BONE MINER

    //create a new bone miner
    public func create_new_bone_miner(_name : Text) : async Text {
        //approve the bo bob actor to spend the icp
        let approvalResults = await IcpActor.icrc2_approve({
            fee = null;
            memo = null;
            from_subaccount = null;
            created_at_time = null;
            amount = 100000000;
            expected_allowance = null;
            expires_at = null;
            spender = {
                owner = Principal.fromText(BONE_CANISTER_ID);
                subaccount = null;
            };
        });

        //create the miner
        switch (approvalResults) {
            case (#Ok(val)) {

                let results = await boneActor.create_dog(_name);
                switch (results) {
                    case (#Ok(prin)) {
                        return "miner created successfully";
                    };
                    case (#Err(err)) {
                        return "failed to create miner";
                    };
                };
            };
            case (#Err(err)) {
                return "failed to approve the bob actor to spend the icp";
            };
        };
    };

    //join a dog alliance group
    public func join_bone_alliance_group(alliance_id : Nat64) : async Text {

        let approvalResults = await IcpActor.icrc2_approve({
            fee = null;
            memo = null;
            from_subaccount = null;
            created_at_time = null;
            amount = 100000000;
            expected_allowance = null;
            expires_at = null;
            spender = {
                owner = Principal.fromText(BONE_CANISTER_ID);
                subaccount = null;
            };
        });

        switch (approvalResults) {
            case (#Ok(val)) {
                let results = await boneActor.join_alliance(Principal.fromActor(this), alliance_id);
                switch (results) {
                    case (#Ok) {
                        return "joined the alliance group";
                    };
                    case (#Err(err)) {
                        return "failed to join the alliance group";
                    };
                };
            };
            case (#Err(err)) {
                return "failed to approve the bob actor to spend the icp";
            };
        };

    };

    //get water neuron info
    public func get_water_neuron_info() : async WaterneuronTypes.CanisterInfo {
        return await WaterNeuron.get_info();

    };

    //stake the icp to nicp on the water neuron
    public shared ({ caller }) func stake_in_water_neuron(amount : Nat) : async Text {

        if (amount < 1) { return "minimim is 1 ICP" };
        let formattedAmount = amount * 100000000;
        let approvalResults = await IcpActor.icrc2_approve({
            fee = null;
            memo = null;
            from_subaccount = null;
            created_at_time = null;
            amount = formattedAmount + 10000;
            expected_allowance = null;
            expires_at = null;
            spender = {
                owner = Principal.fromText(WATER_NEURON_CANISTER_ID);
                subaccount = null;
            };
        });

        switch (approvalResults) {
            case (#Ok(val)) {

                let stakeResults = await WaterNeuron.icp_to_nicp({
                    maybe_subaccount = null;
                    amount_e8s = Nat64.fromNat(formattedAmount);
                });

                switch (stakeResults) {
                    case (#Ok(depSuccess)) {

                        return "staking success";
                    };
                    case (_) { return "staking failed" };
                };

                return "success";
            };
            case (_) { return "failed to approval icp transfer" };
        };

    };
    //unstake nicp from the water neuron
    public shared ({ caller }) func unstake_from_water_neuron(amount : Nat) : async Text {
        if (amount < 1) { return "minimim is 1 ICP" };
        let formattedAmount = amount * 100000000;
        let approvalResults = await NicpActor.icrc2_approve({
            fee = null;
            memo = null;
            from_subaccount = null;
            created_at_time = null;
            amount = formattedAmount + 10000;
            expected_allowance = null;
            expires_at = null;
            spender = {
                owner = Principal.fromText(WATER_NEURON_CANISTER_ID);
                subaccount = null;
            };
        });

        switch (approvalResults) {
            case (#Ok(val)) {

                let stakeResults = await WaterNeuron.nicp_to_icp({
                    maybe_subaccount = null;
                    amount_e8s = Nat64.fromNat(formattedAmount);
                });

                switch (stakeResults) {
                    case (#Ok(depSuccess)) {

                        return "staking success";
                    };
                    case (_) { return "staking failed" };
                };

                return "success";
            };
            case (_) { return "failed to approval icp transfer" };
        };

    };

    //get my water neuron stakes
    //get all the balances for the owner of this portal for nicp, wtn and icp staked in the water neuron
    public func get_my_water_neuron_stakes() : async { nicp : Nat } {
        //get the balance
        let res = await NicpActor.icrc1_balance_of({
            owner = Principal.fromActor(this);
            subaccount = null;
        });

        return {
            nicp = res;
        };
    };




};
