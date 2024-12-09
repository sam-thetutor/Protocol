export const idlFactory = ({ IDL }) => {
  const Loan = IDL.Record({
    'apy' : IDL.Float64,
    'status' : IDL.Text,
    'borrower' : IDL.Principal,
    'amount' : IDL.Nat,
  });
  const Claim = IDL.Record({
    'status' : IDL.Text,
    'claimant' : IDL.Principal,
    'description' : IDL.Text,
    'medicalReports' : IDL.Vec(IDL.Nat8),
    'receipts' : IDL.Vec(IDL.Nat8),
    'policyNumber' : IDL.Text,
  });
  const Policy = IDL.Record({
    'owner' : IDL.Principal,
    'plan' : IDL.Text,
    'term' : IDL.Nat,
    'conditions' : IDL.Text,
    'monthlyFee' : IDL.Nat,
  });
  return IDL.Service({
    'addFunds' : IDL.Func([IDL.Nat], [IDL.Text], []),
    'borrowFunds' : IDL.Func([IDL.Nat, IDL.Float64], [IDL.Text], []),
    'buyPolicy' : IDL.Func(
        [IDL.Text, IDL.Nat, IDL.Nat, IDL.Text],
        [IDL.Text],
        [],
      ),
    'fileClaim' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Vec(IDL.Nat8), IDL.Vec(IDL.Nat8)],
        [IDL.Text],
        [],
      ),
    'repayLoan' : IDL.Func([IDL.Nat], [IDL.Text], []),
    'viewActiveLoans' : IDL.Func([], [IDL.Vec(Loan)], ['query']),
    'viewClaims' : IDL.Func([], [IDL.Vec(Claim)], ['query']),
    'viewPolicies' : IDL.Func([], [IDL.Vec(Policy)], ['query']),
    'viewPooledFunds' : IDL.Func([], [IDL.Nat], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
