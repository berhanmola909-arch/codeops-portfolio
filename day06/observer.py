class SMSAlert:

    def notify(self, account, message):
        print(f"SMS to {account.owner}: {message}")