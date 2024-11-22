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
import BobTypes "Types/BOB/Bob.types";
import MgtTypes "Types/ICP/mgt.types";


actor class DEARNPORTAL() = this {

    type RecurringWtrNeuronStake = MainTypes.RecurringWtrNeuronStake;
   
    let WATER_NEURON_CANISTER_ID : Text = "tsbvt-pyaaa-aaaar-qafva-cai";
    let WATER_NEURON_NICP_CANISTER_ID : Text = "buwm7-7yaaa-aaaar-qagva-cai";
    let ICP_CANISTER_ID : Text = "ryjl3-tyaaa-aaaaa-aaaba-cai";
    let BOB_CANISTER_ID : Text = "6lnhz-oaaaa-aaaas-aabkq-cai";
    
    let ic = actor ("aaaaa-aa") : MgtTypes.IC;

    let bobActor = actor (BOB_CANISTER_ID) : BobTypes.Self;


    private var recurringStaking = TrieMap.TrieMap<Text, MainTypes.RecurringWtrNeuronStake>(Text.equal, Text.hash);
    let WaterNeuron = actor (WATER_NEURON_CANISTER_ID) : WaterneuronTypes.Self;
    let IcpActor = actor (ICP_CANISTER_ID) : IcpTypes.Self;
    let NicpActor = actor (WATER_NEURON_NICP_CANISTER_ID) : NicpTypes.Self;








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

    //------------------------Automate staking in the water neuron according to the scheduled time---------------------






//initialize settings
//fetch the controllers and save them in the hashMap

// public func initialize():async (){
//     let results = await 
// }










};
