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
        self._notify(f"Account {self.number}: Deposited {amount} ETB. New Balance: {self.balance} ETB")

    @abstractmethod
    def withdraw(self, amount):
        pass


class SavingsAccount(Account):
    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError("Insufficient funds for savings withdrawal.")
        self.balance -= amount
        self._notify(f"Account {self.number}: Withdrew {amount} ETB. New Balance: {self.balance} ETB")

    def apply_interest(self):
        config = BankConfig()
        interest = self.balance * config.interest_rate
        self.balance += interest
        self._notify(f"Account {self.number}: Applied interest of {interest} ETB. New Balance: {self.balance} ETB")


class CurrentAccount(Account):
    def withdraw(self, amount):
        config = BankConfig()
        if amount > self.balance + config.overdraft_limit:
            raise ValueError("Withdrawal exceeds overdraft limit.")
        self.balance -= amount
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


config = BankConfig()

savings_acc = AccountFactory.create("savings", "Almaz", "CBE-101", 5000)
current_acc = AccountFactory.create("current", "Bekele", "CBE-102", 2000)

sms_notifier = SMSAlert()
audit_logger = AuditLog()

savings_acc.subscribe(sms_notifier)
savings_acc.subscribe(audit_logger)

current_acc.subscribe(sms_notifier)

savings_acc.deposit(1500)
savings_acc.withdraw(2000)
savings_acc.apply_interest()

current_acc.withdraw(2500)