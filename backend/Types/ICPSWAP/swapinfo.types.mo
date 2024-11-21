// This is a generated Motoko binding.
// Please use `import service "ic:canister_id"` instead to call canisters on the IC if possible.

module {
  public type Address = Text;
  public type CallbackStrategy = {
    token : Token;
    callback : shared query Token -> async StreamingCallbackHttpResponse;
  };
  public type HeaderField = (Text, Text);
  public type HttpRequest = {
    url : Text;
    method : Text;
    body : Blob;
    headers : [HeaderField];
  };
  public type HttpResponse = {
    body : Blob;
    headers : [HeaderField];
    upgrade : ?Bool;
    streaming_strategy : ?StreamingStrategy;
    status_code : Nat16;
  };
  public type NatResult = { #ok : Nat; #err : Text };
  public type PublicPoolOverView = {
    id : Nat;
    token0TotalVolume : Float;
    volumeUSD1d : Float;
    volumeUSD7d : Float;
    token0Id : Text;
    token1Id : Text;
    token1Volume24H : Float;
    totalVolumeUSD : Float;
    sqrtPrice : Float;
    pool : Text;
    tick : Int;
    liquidity : Nat;
    token1Price : Float;
    feeTier : Nat;
    token1TotalVolume : Float;
    volumeUSD : Float;
    feesUSD : Float;
    token0Volume24H : Float;
    token1Standard : Text;
    txCount : Nat;
    token1Decimals : Float;
    token0Standard : Text;
    token0Symbol : Text;
    token0Decimals : Float;
    token0Price : Float;
    token1Symbol : Text;
  };
  public type PublicTokenOverview = {
    id : Nat;
    volumeUSD1d : Float;
    volumeUSD7d : Float;
    totalVolumeUSD : Float;
    name : Text;
    volumeUSD : Float;
    feesUSD : Float;
    priceUSDChange : Float;
    address : Text;
    txCount : Int;
    priceUSD : Float;
    standard : Text;
    symbol : Text;
  };
  public type StreamingCallbackHttpResponse = { token : ?Token; body : Blob };
  public type StreamingStrategy = { #Callback : CallbackStrategy };
  public type Token = { arbitrary_data : Text };
  public type Transaction = {
    to : Text;
    action : TransactionType;
    token0Id : Text;
    token1Id : Text;
    liquidityTotal : Nat;
    from : Text;
    hash : Text;
    tick : Int;
    token1Price : Float;
    recipient : Text;
    token0ChangeAmount : Float;
    sender : Text;
    liquidityChange : Nat;
    token1Standard : Text;
    token0Fee : Float;
    token1Fee : Float;
    timestamp : Int;
    token1ChangeAmount : Float;
    token1Decimals : Float;
    token0Standard : Text;
    amountUSD : Float;
    amountToken0 : Float;
    amountToken1 : Float;
    poolFee : Nat;
    token0Symbol : Text;
    token0Decimals : Float;
    token0Price : Float;
    token1Symbol : Text;
    poolId : Text;
  };
  public type TransactionType = {
    #decreaseLiquidity;
    #claim;
    #swap;
    #addLiquidity;
    #increaseLiquidity;
  };
  public type Self = actor {
    addOwner : shared Principal -> async ();
    addQuoteToken : shared (Text, Bool) -> async ();
    allPoolStorage : shared query () -> async [Text];
    allTokenStorage : shared query () -> async [Text];
    allUserStorage : shared query () -> async [Text];
    batchInsert : shared [Transaction] -> async ();
    cycleAvailable : shared () -> async NatResult;
    cycleBalance : shared query () -> async NatResult;
    getAllPools : shared query () -> async [PublicPoolOverView];
    getAllTokens : shared query () -> async [PublicTokenOverview];
    getControllers : shared query () -> async [Principal];
    getDataQueueSize : shared query () -> async Nat;
    getLastDataTime : shared query () -> async Int;
    getOwners : shared query () -> async [Principal];
    getPoolQueueSize : shared query () -> async [(Text, Nat)];
    getPoolsForToken : shared query Text -> async [PublicPoolOverView];
    getQuoteTokens : shared query () -> async [Text];
    getSyncLock : shared query () -> async Bool;
    getSyncStatus : shared query () -> async [(Text, Bool, Text)];
    getTokenQueueSize : shared query () -> async [(Text, Nat)];
    getTotalVolumeAndUser : shared query () -> async (Float, Nat);
    getUserQueueSize : shared query () -> async [(Text, Nat)];
    http_request : shared query HttpRequest -> async HttpResponse;
    insert : shared Transaction -> async ();
    poolMapping : shared query () -> async [(Text, Text)];
    poolStorage : shared query Text -> async ?Text;
    setPoolSyncStatus : shared Bool -> async Bool;
    setQuoteTokens : shared ([Text], Bool) -> async ();
    setTokenSyncStatus : shared Bool -> async Bool;
    setUserSyncStatus : shared Bool -> async Bool;
    syncOverview : shared () -> async ();
    tokenMapping : shared query () -> async [(Text, Text)];
    tokenStorage : shared query Text -> async ?Text;
    updateTokenMetadata : shared (Text, Text) -> async ();
    userMapping : shared query () -> async [(Text, Text)];
    userStorage : shared query Address -> async ?Text;
  }
}