# Question 1
class AccountRegistry:
    def __init__(self):
        self.by_number = {}

    def top_by_balance(self, n=5):
        accts = sorted(
            self.by_number.values(),
            key=lambda a: a.balance,
            reverse=True
        )
        return accts[:n]

    def find_by_number(self, number):
        nums = sorted(self.by_number)
        i = binary_search(nums, number)
        return self.by_number[nums[i]] if i >= 0 else None

    def total_transactions(self, number):
        acct = self.find_by_number(number)
        if not acct:
            return 0
        return self._sum_tx(acct.transactions)

    def _sum_tx(self, txs):
        if not txs:
            return 0
        return txs[0] + self._sum_tx(txs[1:])

# Question 2
def binary_search(items, target):
    lo = 0
    hi = len(items) - 1

    while lo <= hi:
        mid = (lo + hi) // 2
        if items[mid] == target:
            return mid
        elif items[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1

    return -1