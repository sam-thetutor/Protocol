// This is a generated Motoko binding.
// Please use `import service "ic:canister_id"` instead to call canisters on the IC if possible.

module {
  public type Block = {
    to : Principal;
    miner : ?Principal;
    miner_cycles_burned : ?Nat64;
    total_cycles_burned : ?Nat64;
    timestamp : Nat64;
    rewards : Nat64;
  };
  public type CurrentBlockStatus = {
    burned_cyles : Nat64;
    active_miners : Nat64;
  };
  public type LeaderBoardEntry = {
    owner : Principal;
    block_count : Nat64;
    miner_count : Nat64;
  };
  public type Miner = { id : Principal; mined_blocks : Nat64 };
  public type PoolStats = {
    pool_mined_blocks : Nat64;
    users_count_in_pool : Nat64;
  };
  public type Result = { #Ok; #Err : Text };
  public type Result_1 = { #Ok : Principal; #Err : Text };
  public type State = {
    principal_guards : [Principal];
    last_solved_challenge_ts : Nat64;
    active_tasks : [TaskType];
    bob_ledger_id : Principal;
    miner_to_burned_cycles : [(Principal, Nat64)];
    miner_to_owner : [(Principal, Principal)];
    miner_block_index : [Nat64];
    principal_to_miner : [(Principal, [Principal])];
    miner_to_mined_block : [(Principal, Nat64)];
  };
  public type Stats = {
    halving_count : Nat64;
    average_block_speed : Nat64;
    cycle_balance : Nat64;
    block_count : Nat64;
    miner_count : Nat64;
    time_since_last_block : Nat64;
    pending_blocks : [Block];
  };
  public type TaskType = { #MineBob; #ProcessLogic };
  public type Self = actor {
    filter_out_known_index : shared query [Nat64] -> async [Nat64];
    get_blocks : shared query () -> async [Block];
    get_current_block_status : shared query () -> async CurrentBlockStatus;
    get_latest_blocks : shared query () -> async [Block];
    get_leader_board : shared query () -> async [LeaderBoardEntry];
    get_miners : shared query Principal -> async [Miner];
    get_pool_statistic : shared query () -> async PoolStats;
    get_state : shared query () -> async State;
    get_statistics : shared query () -> async Stats;
    get_wasm_len : shared query () -> async Nat64;
    hours_left_in_pool : shared query ?Principal -> async Nat64;
    join_pool : shared Nat64 -> async Result;
    spawn_miner : shared Nat64 -> async Result_1;
    submit_burned_cycles : shared Nat64 -> async Result;
    upgrade_miner : shared Principal -> async Result;
  }
}