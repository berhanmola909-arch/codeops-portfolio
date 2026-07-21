#question 1: Vehicle hierarchy
# class Vehicle:
#   def __init__(self,make,model):
#     self.make = make
#     self.model = model
#   def describe(self):
#     return (f"the make is : {self.make}\nAnd the model is:{self.model}")
# class Car(Vehicle):
#   def __init__(self, make, model):
#     super().__init__(make, model)

# class Truck(Vehicle):
#   def __init__(self, make, model):
#     super().__init__(make, model)


#Question 1 objects:-

# byd = Car("byd","byd-23")
# print(byd.make)
# print(byd.model)
# print(byd.describe())




#question 2: use super()
# class Vehicle:
#   def __init__(self,make,model):
#     self.make = make
#     self.model = model
#   def describe(self):
#     return (f"the make is : {self.make}\nAnd the model is:{self.model}")
# class Car(Vehicle):
#   def __init__(self, make, model):
#     super().__init__(make, model)

# class Truck(Vehicle):
#   def __init__(self, make, model,capacity):
#     super().__init__(make, model)
#     self.capacity = capacity


# question 2 objects:-

# ford = Truck("ford","f-150",13500)
# print(ford.capacity)

 

#Question 3: Overide
# class Vehicle:
#   def __init__(self,make,model):
#     self.make = make
#     self.model = model
#   def describe(self):
#     return (f"the make is : {self.make}\nAnd the model is:{self.model}")
# class Car(Vehicle):
#   def __init__(self, make, model):
#     super().__init__(make, model)

# class Truck(Vehicle):
#   def __init__(self, make, model,capacity):
#     super().__init__(make, model)
#     self.capacity = capacity
#   def describe(self):
#         return (f"the make is : {self.make}\nAnd the model is:{self.model} \nAnd the capacity is {self.capacity}")
  

# question 3 objects:-
# ford = Truck("ford","f-150",13500)
# print(ford.describe())



#question 4: Polymorphism
# byd = Car("byd","byd-23")
# ford = Truck("ford","ford-150",13500)
# Ford_Mustang = Truck("ford","mustang",13400)
# Chevrolet_Silverado = Car("chevrolet","chevrolet Silverado 1500")

# car_list = [byd,ford,Ford_Mustang,Chevrolet_Silverado]


# for car in car_list:
# print(f"{car.describe()}\n")



#Question 5: abstraction

from abc import ABC, abstractmethod
class Vehicle(ABC):
  def __init__(self,make,model):
    self.make = make
    self.model = model
  def describe(self):
    return (f"the make is : {self.make}\nAnd the model is:{self.model}")
  
  @abstractmethod
  def wheels(self):
    pass

class Car(Vehicle):
  def __init__(self, make, model,wheels):
    super().__init__(make, model)
    self.wheels = wheels
  def wheels(self):
    return self.wheels

class Truck(Vehicle):
  def __init__(self, make, model,capacity, wheels):
    super().__init__(make, model)
    self.capacity = capacity
    self.wheels = wheels

  def describe(self):
        return (f"the make is : {self.make}\nAnd the model is:{self.model} \nAnd the capacity is {self.capacity}")
  def wheels(self):
    return self.wheels
  

byd = Car("byd","byd-23",4)
ford = Truck("ford","ford-150",13500,8)

print(byd.wheels)
print(ford.wheels)













