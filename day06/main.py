from factory import AccountFactory
from observer import SMSAlert

sms = SMSAlert()

acc1 = AccountFactory.create("savings", "S001", "Berhan", 1000)
acc2 = AccountFactory.create("checking", "C001", "John", 500)

acc1.deposit(300)
sms.notify(acc1, "Deposit successful.")

acc2.withdraw(200)
sms.notify(acc2, "Withdrawal successful.")

acc1.statement()
acc2.statement()