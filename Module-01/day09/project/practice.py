# Question 1
class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def insert(root, value):
    if root is None:
        return Node(value)
    if value < root.value:
        root.left = insert(root.left, value)
    else:
        root.right = insert(root.right, value)
    return root


def in_order(node):
    if node is None:
        return
    in_order(node.left)
    print(node.value)
    in_order(node.right)


# Question 2
def height(node):
    if node is None:
        return 0
    left_height = height(node.left)
    right_height = height(node.right)
    return 1 + max(left_height, right_height)


# Question 3
def bfs(graph, start):
    seen = {start}
    queue = [start]
    while queue:
        node = queue.pop(0)
        for neighbor in graph.get(node, []):
            if neighbor not in seen:
                seen.add(neighbor)
                queue.append(neighbor)
    return seen


# Question 4
def dfs(graph, start, seen=None):
    if seen is None:
        seen = set()
    seen.add(start)
    for neighbor in graph.get(start, []):
        if neighbor not in seen:
            dfs(graph, neighbor, seen)
    return seen


# Question 5
import heapq


def priority_queue_demo(tasks):
    heap = []
    for priority, task in tasks:
        heapq.heappush(heap, (priority, task))

    popped = []
    while heap:
        popped.append(heapq.heappop(heap))
    return popped