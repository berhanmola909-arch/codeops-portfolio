#question 1:- Temprature label
def temp_label():
  temp = int(input("Enter the temprature in degree celsius: "))
  if temp < 15:
    return("cold")
  elif  15 <= temp <= 28:
    return ("warm")
  else:
    return ("hot")

# question 2:- Receipt loop  
def Receipt_printer():
  for i in range(1,11):
     print (f"Receipt #{i}")

# question 3:- Even number
def even_num():
  for i in range(1,21):
    if i % 2 == 0:
      print(i) 

# question 4:-Discount Function
  #defalut price
def apply_discount_defalut(price=100, percent= 10):
  return price - (price*percent)/100
#without defalut price
def apply_discount_not_defalut(price, percent= 10):

  return price - (price*percent)/100

#question 5:- countdown
def countdown():
  count = 5
  while count >0:
    print (count)
    count -=1
  print("liftoff")


  
  # here is were i called the functions, to excute the functions just remove the hashtag sign infront of the function you want to excute and run the python file. as an example i left the first function active
  

print(temp_label())
#Receipt_printer()
#even_num()
#print(apply_discount_defalut())

#price = 100
#print(apply_discount_not_defalut(200))
#countdown()