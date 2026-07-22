#Mini project:- TeleBirr customer Report

customer = [
  ("Biruk",1500),("Abdela",700),("Hana", 200),("Meron",1200),("Kirubel",450)
]

def tier(balance):
  if balance >= 1000:
    return "Premium"
  elif balance >= 500:
    return "Standard"
  else:
    return "Basic"

premium = 0
standard = 0
basic = 0

for name, balance in customer:
  print(name,tier(balance),balance)

  if(tier(balance)=="Premium"):
    premium +=1
  elif(tier(balance)=="Standard"):
    standard +=1
  elif(tier(balance)=="Basic"):
     basic +=1

print (f"number of customers on premium tier:{premium}")
print (f"number of customers on standard tier:{standard}")
print (f"number of customers on basic tier:{basic}")



 

