from abc import ABC, abstractmethod


class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000
        return cls._instance


class Observer(ABC):
    @abstractmethod
    def update(self, event):
        pass


class SMSAlert(Observer):
    def update(self, event):
        print(f"[TeleBirr SMS] {event}")


class AuditLog(Observer):
    def update(self, event):
        print(f"[Log] {event}")


class Account(ABC):
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.number = number
        self.balance = balance
        self._observers = []
        self.history_stack = []

    def subscribe(self, observer):
        self._observers.append(observer)

    def unsubscribe(self, observer):
        self._observers.remove(observer)

    def _notify(self, event):
        for observer in self._observers:
            observer.update(event)

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit amount must be positive.")
        self.balance += amount
        self.history_stack.append(("deposit", amount))
        self._notify(f"Account {self.number}: Deposited {amount} ETB. New Balance: {self.balance} ETB")

    @abstractmethod
    def withdraw(self, amount):
        pass

    def undo_last(self):
        if not self.history_stack:
            raise IndexError("No transactions to undo.")
        action, amount = self.history_stack.pop()
        if action == "deposit":
            self.balance -= amount
            self._notify(f"Account {self.number}: Undid deposit of {amount} ETB. New Balance: {self.balance} ETB")
        elif action == "withdraw":
            self.balance += amount
            self._notify(f"Account {self.number}: Undid withdrawal of {amount} ETB. New Balance: {self.balance} ETB")


class SavingsAccount(Account):
    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError("Insufficient funds for savings withdrawal.")
        self.balance -= amount
        self.history_stack.append(("withdraw", amount))
        self._notify(f"Account {self.number}: Withdrew {amount} ETB. New Balance: {self.balance} ETB")

    def apply_interest(self):
        config = BankConfig()
        interest = self.balance * config.interest_rate
        self.balance += interest
        self.history_stack.append(("deposit", interest))
        self._notify(f"Account {self.number}: Applied interest of {interest} ETB. New Balance: {self.balance} ETB")


class CurrentAccount(Account):
    def withdraw(self, amount):
        config = BankConfig()
        if amount > self.balance + config.overdraft_limit:
            raise ValueError("Withdrawal exceeds overdraft limit.")
        self.balance -= amount
        self.history_stack.append(("withdraw", amount))
        self._notify(f"Account {self.number}: Withdrew {amount} ETB. New Balance: {self.balance} ETB")


class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance=0):
        kind = kind.lower()
        if kind == "savings":
            return SavingsAccount(owner, number, balance)
        elif kind == "current":
            return CurrentAccount(owner, number, balance)
        else:
            raise ValueError(f"Unknown account type: {kind}")


class AccountRegistry:
    def __init__(self):
        self.by_number = {}
        self.order = []

    def add(self, acc):
        self.by_number[acc.number] = acc
        self.order.append(acc.number)

    def find(self, number):
        return self.by_number.get(number)

    def list_all(self):
        return [self.by_number[num] for num in self.order]


registry = AccountRegistry()

savings_acc = AccountFactory.create("savings", "Almaz", "CBE-101", 5000)
current_acc = AccountFactory.create("current", "Bekele", "CBE-102", 2000)

sms_notifier = SMSAlert()
savings_acc.subscribe(sms_notifier)
current_acc.subscribe(sms_notifier)

registry.add(savings_acc)
registry.add(current_acc)

found_acc = registry.find("CBE-101")
found_acc.deposit(1000)
found_acc.withdraw(500)
found_acc.undo_last()

all_accounts = registry.list_all()
for acc in all_accounts:
    print(f"Owner: {acc.owner}, Number: {acc.number}, Balance: {acc.balance}")