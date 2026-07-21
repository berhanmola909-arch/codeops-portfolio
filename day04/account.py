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
  
  
Berhan = Account("Berhan mola",1000226231408,10000000)
#Before deposit
print(Berhan.balance)  

Berhan.deposit(3000000)

#After deposit
print(Berhan.balance)  

Berhan.withdraw(1500000)
#After withdraw
print(Berhan.balance)  






