class Account:
  def __init__(self,owner,acc_number,balance=0):
    self.owner = owner
    self.acc_number = acc_number
    self.__balance = balance
  @property
  def balance(self):
    return self.__balance
  @balance.setter
  def balance(self, ammount):
    if ammount <= 0:
      raise ValueError("Negative number is not allowed")
    self.__balance = ammount
  
  def deposit(self,ammount):
    self.balance +=ammount
    return self.balance
  def withdraw(self,ammount):
     self.balance -=ammount
     return self.balance
  def statement(self):
    return (f"owner:-{self.owner} \n account number:-{self.acc_number}")
  

class SavingAcount(Account):
  def __init__(self, owner, acc_number, balance=0, rate=0.05):
    super().__init__(owner, acc_number, balance)
    self.rate = rate
  def add_interest(self):
    self.deposit(self.balance * self.rate)
  def statement(self):
    return (f"Type:- saving Account \n owner:-{self.owner} \n account number:-{self.acc_number}")

class CurrentAccount(Account):
  def __init__(self, owner, acc_number, balance=0, overdraft=1000000):
    super().__init__(owner, acc_number, balance)
    self.overdraft = overdraft
  def statement(self):
    return (f"Type: Current Account \n owner:-{self.owner} \naccount number:-{self.acc_number}")
  def withdraw(self,ammount):
     if ammount > self.overdraft:
       raise ValueError ("The overdraft limit is 1000000")
     self.balance -=ammount
     return self.balance
  
  
Berhan = CurrentAccount("Berhan Mola",1000226231408,10000000)
Haymi = SavingAcount("Haymi Amare",100023467891,8000000)

Berhan.withdraw(900000)
print(Berhan.balance)

print(Berhan.statement())
print(Haymi.statement())
