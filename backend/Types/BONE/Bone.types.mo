// This is a generated Motoko binding.
// Please use `import service "ic:canister_id"` instead to call canisters on the IC if possible.

module {
  public type DogContext = {
    ore : Text;
    ore_cnt : Nat64;
    ore_amount : Nat;
    owner : Principal;
    name : Text;
    ores : [DogHash];
    mining_alliance : ?Nat64;
    dog_level : DogLevel;
    ore_difficulty : Nat64;
    create_time : Nat64;
    main_pid : Principal;
    mining_state : MiningState;
    mining_type : MiningType;
  };
  public type DogContextOut = {
    ore_cnt : Nat64;
    ore_amount : Nat;
    dog_id : Principal;
    owner : Principal;
    name : Text;
    mining_alliance : ?Nat64;
    dog_level : DogLevel;
    mining_state : MiningState;
    mining_type : MiningType;
  };
  public type DogHash = {
    owner : Principal;
    ores : [Text];
    mining_alliance : ?Nat64;
    timestamp : Nat64;
  };
  public type DogLevel = { #SilverDog; #GoldDog; #CopperDog; #DiamondDog };
  public type HashRecord = {
    new_ore : Text;
    old_ore : Text;
    process_ore : OreHashOut;
    ore_difficulty : Text;
    process_result_ore : Text;
  };
  public type HomepageCalcInfo = {
    total_number_of_minder : Nat64;
    block_reward : Nat;
    current_avtive_minders : Nat64;
  };
  public type MRecord = {
    ore : Text;
    utc : Nat64;
    owner : Principal;
    high : Nat64;
    reward_amount : Nat;
    dog_level : DogLevel;
    alliance_id : ?Nat64;
    hash_record : ?HashRecord;
    timestamp : Nat64;
    dog_canister : Principal;
  };
  public type MiningState = { #STOP; #ACTIVITY };
  public type MiningType = { #POOL; #ALONE };
  public type OreHashOut = {
    cycle_num : Nat64;
    time : Nat64;
    old_ore_rev : Text;
    dog_ore_rev : Text;
  };
  public type OutPoolInfo = {
    id : Nat64;
    dogs_cnt : [Text];
    owner : Principal;
    dogs : [Principal];
    name : Text;
    mining_weight : Nat;
  };
  public type RecordIndex = { start_idx : Nat64; end_idx : Nat64 };
  public type Result = { #Ok; #Err : Text };
  public type Result_1 = { #Ok : Nat64; #Err : Text };
  public type Result_2 = { #Ok : Principal; #Err : Text };
  public type Result_3 = { #Ok : (Text, Nat, Nat64); #Err : Text };
  public type VerifyDogHash = { dog_hash : DogHash; create_time : Nat64 };
  public type Self = actor {
    add_cycles : shared (Nat, Principal) -> async Result;
    create_alliance : shared Text -> async Result_1;
    create_dog : shared Text -> async Result_2;
    cycles : shared query () -> async Nat64;
    dog_info : shared query Principal -> async DogContext;
    dog_level_upgrade : shared Principal -> async Result;
    get_all_dogs_info : shared query () -> async [DogContextOut];
    get_block_24h_cnt : shared query () -> async Nat32;
    get_create_time : shared query () -> async Nat64;
    get_current_block_reward : shared query () -> async Nat;
    get_dog_level_str : shared query Principal -> async Text;
    get_dogs : shared query () -> async [Principal];
    get_dogs_info : shared query Principal -> async [DogContextOut];
    get_homepage_calc : shared query () -> async HomepageCalcInfo;
    get_miners : shared query () -> async [Principal];
    get_mining_alliance : shared Nat64 -> async OutPoolInfo;
    get_mining_alliances : shared query () -> async [Nat64];
    get_ore : shared query () -> async (Text, Nat64);
    get_record_idx : shared query () -> async RecordIndex;
    get_record_index : shared query (Nat64, Nat64) -> async [(Nat64, MRecord)];
    get_record_rev : shared query (Nat64, Nat64) -> async [(Nat64, MRecord)];
    join_alliance : shared (Principal, Nat64) -> async Result;
    leave_alliance : shared (Principal, Nat64) -> async Result;
    time_until_next_having_days : shared query () -> async Nat64;
    top_alliance : shared query () -> async [
        (Text, Nat64, Nat64, Nat64, Nat64, Nat64, Nat)
      ];
    top_user : shared query () -> async [
        (Principal, Nat64, Nat64, Nat64, Nat64, Nat)
      ];
    update_dog_state : shared MiningState -> async ();
    verify_ore : shared VerifyDogHash -> async Result_3;
  }
}