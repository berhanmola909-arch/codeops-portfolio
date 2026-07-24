# Question 1
class Branch:
    def __init__(self, name):
        self.name = name
        self.children = []
        self.accounts = []

    def total_balance(self):
        total = sum(a.balance for a in self.accounts)
        for child in self.children:
            total += child.total_balance()
        return total


# Question 2
def bfs(transfers, start):
    seen = {start}
    queue = [start]
    while queue:
        node = queue.pop(0)
        for neighbor in transfers.get(node, []):
            if neighbor not in seen:
                seen.add(neighbor)
                queue.append(neighbor)
    return seen