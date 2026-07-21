from accounts , import SavingsAccount, CheckingAccount


class AccountFactory:

    @staticmethod
    def create(kind, account_number, owner, balance):

        if kind == "savings":
            return SavingsAccount(account_number, owner, balance)

        elif kind == "checking":
            return CheckingAccount(account_number, owner, balance)

        else:
            raise ValueError("Invalid account type")