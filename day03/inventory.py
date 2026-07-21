stock = {}


try:
  with open("stock.txt") as file:
    for line in file:
      items, qty = line.strip().split(",")
      stock[items] = int(qty)
except FileNotFoundError:
  print("file is not found")

def adjust(item,amount):
  stock[item] = stock.get(item,0)+amount
  with open("stock.txt", "w") as file:
    for items, qty in stock.items():
      file.write(f"{items},{qty}\n")


adjust( "Paracetamol" ,300)

low = [item for item, qty in stock.items() if qty  < 10 ]
print("low stock:", low)