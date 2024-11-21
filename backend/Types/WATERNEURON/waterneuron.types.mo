// This is a generated Motoko binding.
// Please use `import service "ic:canister_id"` instead to call canisters on the IC if possible.

module {
  public type Account = { owner : Principal; subaccount : ?Blob };
  public type BallotInfo = { vote : Int32; proposal_id : ?NeuronId };
  public type CancelWithdrawalError = {
    #GenericError : { code : Int32; message : Text };
    #TooLate;
    #BadCommand : { message : Text };
    #UnknownTimeLeft;
    #BadCaller : { message : Text };
    #MergeNeuronError : { message : Text };
    #StopDissolvementError : { message : Text };
    #RequestNotFound;
    #GovernanceError : GovernanceError;
    #GuardError : { guard_error : GuardError };
    #GetFullNeuronError : { message : Text };
  };
  public type CanisterInfo = {
    neuron_6m_account : Account;
    latest_distribution_icp_per_vp : ?Float;
    neuron_id_6m : ?NeuronId;
    neuron_id_8y : ?NeuronId;
    tracked_6m_stake : Nat64;
    minimum_withdraw_amount : Nat64;
    neuron_8y_stake_e8s : Nat64;
    governance_fee_share_percent : Nat64;
    neuron_8y_account : Account;
    minimum_deposit_amount : Nat64;
    neuron_6m_stake_e8s : Nat64;
    exchange_rate : Nat64;
    nicp_supply : Nat64;
    total_icp_deposited : Nat64;
    stakers_count : Nat64;
  };
  public type ConversionArg = { maybe_subaccount : ?Blob; amount_e8s : Nat64 };
  public type ConversionError = {
    #GenericError : { code : Int32; message : Text };
    #TransferError : TransferError;
    #AmountTooLow : { minimum_amount_e8s : Nat64 };
    #TransferFromError : TransferFromError;
    #GuardError : { guard_error : GuardError };
  };
  public type DepositSuccess = {
    nicp_amount : ?Nat64;
    block_index : Nat;
    transfer_id : Nat64;
  };
  public type DissolveState = {
    #DissolveDelaySeconds : Nat64;
    #WhenDissolvedTimestampSeconds : Nat64;
  };
  public type Event = { timestamp : Nat64; payload : EventType };
  public type EventType = {
    #ClaimedAirdrop : { block_index : Nat64; caller : Principal };
    #StartedToDissolve : { withdrawal_id : Nat64 };
    #MaturityNeuron : { from_neuron_type : NeuronOrigin; neuron_id : NeuronId };
    #NeuronSixMonths : NeuronId;
    #Upgrade : UpgradeArg;
    #Init : InitArg;
    #MirroredProposal : {
      nns_proposal_id : NeuronId;
      sns_proposal_id : NeuronId;
    };
    #NeuronEightYears : NeuronId;
    #DistributeICPtoSNS : { amount : Nat64; receiver : Principal };
    #NIcpWithdrawal : {
      nicp_burned : Nat64;
      nicp_burn_index : Nat64;
      receiver : Account;
    };
    #MergeNeuron : { neuron_id : NeuronId };
    #IcpDeposit : { block_index : Nat64; amount : Nat64; receiver : Account };
    #DisbursedUserNeuron : {
      withdrawal_id : Nat64;
      transfer_block_height : Nat64;
    };
    #TransferExecuted : { block_index : ?Nat64; transfer_id : Nat64 };
    #DisbursedMaturityNeuron : {
      transfer_block_height : Nat64;
      neuron_id : NeuronId;
    };
    #DispatchICPRewards : {
      nicp_amount : Nat64;
      sns_gov_amount : Nat64;
      from_neuron_type : NeuronOrigin;
    };
    #SplitNeuron : { withdrawal_id : Nat64; neuron_id : NeuronId };
  };
  public type ExecutedTransfer = {
    block_index : ?Nat64;
    timestamp : Nat64;
    transfer : PendingTransfer;
  };
  public type Followees = { followees : [NeuronId] };
  public type GetEventsArg = { start : Nat64; length : Nat64 };
  public type GetEventsResult = { total_event_count : Nat64; events : [Event] };
  public type GovernanceError = { error_message : Text; error_type : Int32 };
  public type GuardError = { #AlreadyProcessing; #TooManyConcurrentRequests };
  public type InitArg = {
    wtn_ledger_id : Principal;
    wtn_governance_id : Principal;
    nicp_ledger_id : Principal;
  };
  public type KnownNeuronData = { name : Text; description : ?Text };
  public type LiquidArg = { #Upgrade : ?UpgradeArg; #Init : InitArg };
  public type MergeResponse = {
    target_neuron : ?Neuron;
    source_neuron : ?Neuron;
    target_neuron_info : ?NeuronInfo;
    source_neuron_info : ?NeuronInfo;
  };
  public type Neuron = {
    id : ?NeuronId;
    staked_maturity_e8s_equivalent : ?Nat64;
    controller : ?Principal;
    recent_ballots : [BallotInfo];
    kyc_verified : Bool;
    neuron_type : ?Int32;
    not_for_profit : Bool;
    maturity_e8s_equivalent : Nat64;
    cached_neuron_stake_e8s : Nat64;
    created_timestamp_seconds : Nat64;
    auto_stake_maturity : ?Bool;
    aging_since_timestamp_seconds : Nat64;
    hot_keys : [Principal];
    account : Blob;
    joined_community_fund_timestamp_seconds : ?Nat64;
    dissolve_state : ?DissolveState;
    followees : [(Int32, Followees)];
    neuron_fees_e8s : Nat64;
    transfer : ?NeuronStakeTransfer;
    known_neuron_data : ?KnownNeuronData;
    spawn_at_timestamp_seconds : ?Nat64;
  };
  public type NeuronId = { id : Nat64 };
  public type NeuronInfo = {
    dissolve_delay_seconds : Nat64;
    recent_ballots : [BallotInfo];
    neuron_type : ?Int32;
    created_timestamp_seconds : Nat64;
    state : Int32;
    stake_e8s : Nat64;
    joined_community_fund_timestamp_seconds : ?Nat64;
    retrieved_at_timestamp_seconds : Nat64;
    known_neuron_data : ?KnownNeuronData;
    voting_power : Nat64;
    age_seconds : Nat64;
  };
  public type NeuronOrigin = { #NICPSixMonths; #SnsGovernanceEightYears };
  public type NeuronStakeTransfer = {
    to_subaccount : Blob;
    neuron_stake_e8s : Nat64;
    from : ?Principal;
    memo : Nat64;
    from_subaccount : Blob;
    transfer_timestamp : Nat64;
    block_height : Nat64;
  };
  public type PendingTransfer = {
    memo : ?Nat64;
    unit : Unit;
    from_subaccount : ?Blob;
    transfer_id : Nat64;
    amount : Nat64;
    receiver : Account;
  };
  public type Result = { #Ok : MergeResponse; #Err : CancelWithdrawalError };
  public type Result_1 = { #Ok : Nat64; #Err : ConversionError };
  public type Result_2 = { #Ok : NeuronId; #Err : NeuronId };
  public type Result_3 = { #Ok : DepositSuccess; #Err : ConversionError };
  public type Result_4 = { #Ok : WithdrawalSuccess; #Err : ConversionError };
  public type TransferError = {
    #GenericError : { message : Text; error_code : Nat };
    #TemporarilyUnavailable;
    #BadBurn : { min_burn_amount : Nat };
    #Duplicate : { duplicate_of : Nat };
    #BadFee : { expected_fee : Nat };
    #CreatedInFuture : { ledger_time : Nat64 };
    #TooOld;
    #InsufficientFunds : { balance : Nat };
  };
  public type TransferFromError = {
    #GenericError : { message : Text; error_code : Nat };
    #TemporarilyUnavailable;
    #InsufficientAllowance : { allowance : Nat };
    #BadBurn : { min_burn_amount : Nat };
    #Duplicate : { duplicate_of : Nat };
    #BadFee : { expected_fee : Nat };
    #CreatedInFuture : { ledger_time : Nat64 };
    #TooOld;
    #InsufficientFunds : { balance : Nat };
  };
  public type TransferStatus = {
    #Executed : ExecutedTransfer;
    #Unknown;
    #Pending : PendingTransfer;
  };
  public type Unit = { #ICP; #WTN; #NICP };
  public type UpgradeArg = { governance_fee_share_percent : ?Nat64 };
  public type WithdrawalDetails = {
    status : WithdrawalStatus;
    request : WithdrawalRequest;
  };
  public type WithdrawalRequest = {
    nicp_burned : Nat64;
    withdrawal_id : Nat64;
    icp_due : Nat64;
    nicp_burn_index : Nat64;
    timestamp : Nat64;
    receiver : Account;
    neuron_id : ?NeuronId;
  };
  public type WithdrawalStatus = {
    #ConversionDone : { transfer_block_height : Nat64 };
    #NotFound;
    #Cancelled;
    #WaitingToSplitNeuron;
    #WaitingDissolvement : { neuron_id : NeuronId };
    #WaitingToStartDissolving : { neuron_id : NeuronId };
  };
  public type WithdrawalSuccess = {
    block_index : Nat;
    withdrawal_id : Nat64;
    icp_amount : ?Nat64;
  };
  public type Self = actor {
    cancel_withdrawal : shared NeuronId -> async Result;
    claim_airdrop : shared () -> async Result_1;
    get_airdrop_allocation : shared query ?Principal -> async Nat64;
    get_events : shared query GetEventsArg -> async GetEventsResult;
    get_info : shared query () -> async CanisterInfo;
    get_transfer_statuses : shared query [Nat64] -> async [TransferStatus];
    get_withdrawal_requests : shared query ?Account -> async [
        WithdrawalDetails
      ];
    get_wtn_proposal_id : shared query Nat64 -> async Result_2;
    icp_to_nicp : shared ConversionArg -> async Result_3;
    nicp_to_icp : shared ConversionArg -> async Result_4;
  }
}