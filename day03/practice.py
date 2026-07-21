#question 1:- unique cities
def uniqe_cities():

  cities = ["Addis Ababa","Diredewa","Jima","Adama","Bishoftu","Bahir Dar","Jima","Adama"]

  print(set(cities))
  print(len(set(cities)))

# question 2:- Price Report
def price_report():

  grocery = {
    "Tomato":"30",
    "Potato": "80",
    "Onion" : "90",
    "Karot" : "20",
    "Ginger": "120"

  }

  for name, price in grocery.items():
    print(f"{name}: price(ETB)-{price}")

# question 3:- Tax comprehension
prices = [100,250,400,80]

def tax_comprehension():


  tax_add = [p + (p*0.15) for p in prices]
  print(tax_add)

# question 4: cheap items
def cheap_items():

  cheap_item = [p for p in prices if p < 200]
  print (cheap_item)

# question 5: write and read
def write_read():

  with open("names.txt", "w") as file:
    file.write("Mahlet Belaye\n")
    file.write("Melat Gebeyeu\n")
    file.write("Natnael Kebede\n")

  with open("names.txt") as file:
    for line in file:
      print(line.strip())


#question 6:- safe itdevision

def safe_devision():

  num = input("Enter a number please: ")

  try:
    n = int(num)
    result = 1000/n
    return(f"the result is: {result}")
    
  except ValueError:
    return("please enter a number")
  except ZeroDivisionError:
    return("Numbers can't be devided by zero")

# uncomment the functions you want to check and excute the file

#uniqe_cities()
#price_report()
#tax_comprehension()
#cheap_items()
#write_read()

print(safe_devision())

    
