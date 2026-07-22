#In this practice i created all the class for the 5 question above here and i created the objects and everything else needed after writing all the classes for the 5 questions.
# equation 1: Book class
class book:
  def __init__(self,title,author,pages):
    self.title = title
    self.author = author
    self.pages = pages

    
  def describe(self, summary):
    return print (summary)
  


#question 2: product class

class product:
  def __init__(self, name, price, quantity):
    self.name = name
    self.price = price
    self.quantity = quantity
  def restock(self,n):
    self.quantity += n 
    return self.quantity
  def sell (self,n):
    self.quantity -=n
    return self.quantity
  
#Question 3: private 

class product2:
  def __init__(self, name, price, quantity):
    self.name = name
    self.price = price
    self.__quantity = quantity
  @property
  def quantity(self):
    return self.__quantity
  def restock(self,n):
    self.quantity += n 
    return self.quantity
  def sell (self,n):
    self.quantity -=n
    return self.quantity
#question 4: validate

class product3:
  def __init__(self, name, price, quantity):
    self.name = name
    self.price = price
    self.__quantity = quantity
  @property
  def quantity(self):
    return self.__quantity
  @quantity.setter
  def quantity(self,value):
     if value < 0:
      raise ValueError("quantity can't be less than 0")
     self.__quantity = value
  def restock(self,n):
    self.quantity += n 
    return self.quantity
  def sell (self,n):
    self.quantity -=n
    return self.quantity

 
  
# question 5 objects
iphone = product3("iphone",6000,420)
laptop = product3("laptop",4000,420)
microwave = product3("microwave",5000,420)



microwave.sell(200)
print(iphone.quantity)
print(laptop.quantity)
print(microwave.quantity)

#question 4 objects

# flat_tv = product3("flat_tv",1000,40)
# flat_tv.sell(49)
# print(flat_tv.quantity)

#question 3 objects


# flat_tv = product2("flat_tv",1000,40)
# print(flat_tv.quantity)

#question 2 objects

# flat_tv = product("flat_tv",1000,40)
# print(flat_tv.quantity)
# flat_tv.restock(4)
# print(flat_tv.quantity)
# flat_tv.restock(10)
# print(flat_tv.quantity)
