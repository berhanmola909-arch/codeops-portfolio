import time
from collections import deque

# Question 1: Name the Big-O

# Snippet A: Direct list index access
# Big-O: O(1) - Constant Time
# Reason: Array elements are stored sequentially in memory, so retrieving an element by index takes instant direct calculation.
def get_first_element(lst):
    return lst[0]


# Snippet B: Single loop over a list
# Big-O: O(n) - Linear Time
# Reason: The loop iterates once over each item in the list of length n.
def print_all_elements(lst):
    for item in lst:
        print(item)


# Snippet C: Nested loops over the same list
# Big-O: O(n^2) - Quadratic Time
# Reason: For every item in the outer loop, the inner loop iterates through all n items, resulting in n * n operations.
def find_duplicates(lst):
    for i in range(len(lst)):
        for j in range(len(lst)):
            if i != j and lst[i] == lst[j]:
                return True
    return False


# Snippet D: Dictionary lookup by key
# Big-O: O(1) - Constant Time
# Reason: Hashmaps use a hash function to jump directly to the memory location of the key.
def get_account_balance(accounts_dict, acc_num):
    return accounts_dict.get(acc_num)


# Snippet E: Binary Search on a sorted list
# Big-O: O(log n) - Logarithmic Time
# Reason: Each step halves the remaining search area.
def binary_search(sorted_lst, target):
    low = 0
    high = len(sorted_lst) - 1
    while low <= high:
        mid = (low + high) // 2
        if sorted_lst[mid] == target:
            return mid
        elif sorted_lst[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1


# Question 1 Objects and Execution

# print("Snippet A:", get_first_element([10, 20, 30]))
# print("Snippet D:", get_account_balance({"CBE-101": 5000}, "CBE-101"))


# Question 2: List vs Dict Lookup Speed Comparison

size = 100000
target_key = f"ACC_{size - 1}"

accounts_list = [f"ACC_{i}" for i in range(size)]
accounts_dict = {f"ACC_{i}": i for i in range(size)}

start_list = time.perf_counter()
found_in_list = target_key in accounts_list
end_list = time.perf_counter()
list_time = end_list - start_list

start_dict = time.perf_counter()
found_in_dict = target_key in accounts_dict
end_dict = time.perf_counter()
dict_time = end_dict - start_dict

# print(f"List search time: {list_time:.6f} seconds")
# print(f"Dict search time: {dict_time:.6f} seconds")


# Question 3: Stack Implementation to Reverse a List

class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("Pop from empty stack.")
        return self.items.pop()

    def peek(self):
        if self.is_empty():
            return None
        return self.items[-1]

    def is_empty(self):
        return len(self.items) == 0


def reverse_names(names):
    stack = Stack()
    for name in names:
        stack.push(name)

    reversed_names = []
    while not stack.is_empty():
        reversed_names.append(stack.pop())

    return reversed_names


# Question 3 Objects and Execution

# original_names = ["Abebe", "Kebede", "Almaz", "Chala"]
# print("Original:", original_names)
# print("Reversed:", reverse_names(original_names))


# Question 4: Queue Implementation for Bank Line

class BankQueue:
    def __init__(self):
        self.line = deque()

    def enqueue(self, customer):
        self.line.append(customer)

    def dequeue(self):
        if self.is_empty():
            raise IndexError("Queue is empty.")
        return self.line.popleft()

    def is_empty(self):
        return len(self.line) == 0


# Question 4 Objects and Execution

# bank_line = BankQueue()
# customers = ["Customer 1", "Customer 2", "Customer 3", "Customer 4", "Customer 5"]

# for c in customers:
#     bank_line.enqueue(c)

# while not bank_line.is_empty():
#     served = bank_line.dequeue()
#     print(f"Serving: {served}")


# Question 5: Singly Linked List Implementation

class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None

    def push_front(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node

    def print_all(self):
        current = self.head
        elements = []
        while current:
            elements.append(str(current.data))
            current = current.next
        print(" -> ".join(elements) + " -> None")


# Question 5 Objects and Execution

ll = LinkedList()
ll.push_front("Node 3")
ll.push_front("Node 2")
ll.push_front("Node 1")

ll.print_all()