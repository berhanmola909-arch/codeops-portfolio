# Question 1
num_q1 = [0, 1, 2, 3, 4]

def getOnlyEvens(num):
   even_num = []
   for i in range(len(num)):
     if num[i] % 2 == 0 and i%2==0:
       even_num.append(num[i])
   print(even_num)

print("question 1")
getOnlyEvens(num_q1)

# Question 2

def reverseCompare(num):
   original_num = num
   reversed_num = 0
   while num > 0:
    digit = num % 10             
    reversed_num = (reversed_num * 10) + digit  
    num = num // 10  
   if original_num > reversed_num:
        print("ok")
   else:
        print("not ok")
print("question 2")              
reverseCompare(23)

# Question 3

def returnFactorial(num):
   if num == 0:
      return 1
   else:
      return num * returnFactorial(num-1)

print("question 3")              

print(returnFactorial(0))

# Question 4
num_q2 = [1, -6, 4, -3]
def checkMeera(num):
   for i in num:
      for j in num:
         if i*2 == j:
            return "I'm not meera"
   return "I'm meera"

print("question 4")              
         
print(checkMeera(num_q2))

# Question 5
num_q3 = [1, 2, 1, 3, 2]
def isDual(arr):
    counts = {}
  
    for num in arr:
        counts[num] = counts.get(num, 0) + 1
        
    for count in counts.values():
        if count != 2:
            return 0  
            
    return 1  

print("question 5")              

print (isDual(num_q3))     
          
# Question 6

def digitalClock(seconds):
    seconds = seconds % 86400
    
    hours = seconds // 3600
    minutes = (seconds % 3600) // 60
    secs = seconds % 60
    
    return f"{hours}:{minutes}:{secs}"
print("question 6")              

print(digitalClock(61201))

