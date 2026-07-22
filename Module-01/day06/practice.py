class Report:
    def __init__(self, title, content):
        self.title = title
        self.content = content

    def generate(self):
        return f"--- {self.title} ---\n{self.content}"


class ReportSaver:
    def save_to_file(self, report, filename):
        print(f"Report saved to file: {filename}")


class ReportEmailer:
    def send_email(self, report, recipient):
        print(f"Report emailed to: {recipient}")


# Question 1 Objects and Execution

# report = Report("Monthly Performance", "Sales increased by 15% this month.")
# saver = ReportSaver()
# emailer = ReportEmailer()

# print(report.generate())
# saver.save_to_file(report, "report.txt")
# emailer.send_email(report, "user@example.com")


# Question 2: Refactor to OCP

from abc import ABC, abstractmethod
import math

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass


class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height


class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return math.pi * (self.radius ** 2)


# Question 2 Objects and Execution

# shapes = [Rectangle(10, 5), Circle(7)]
# for shape in shapes:
#     print(f"Area: {shape.area():.2f}")


# Question 3: Write Singleton 

class AppSettings:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.currency = "ETB"
        return cls._instance


# Question 3 Objects and Execution

# app_config1 = AppSettings()
# app_config2 = AppSettings()

# print(f"Config 1 Currency: {app_config1.currency}")
# print(f"Config 2 Currency: {app_config2.currency}")
# print("Are both instances the same object?", app_config1 is app_config2)


# Question 4: Write a Factory

class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side ** 2


class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height

    def area(self):
        return 0.5 * self.base * self.height


class ShapeFactory:
    @staticmethod
    def create(kind, *args):
        kind = kind.lower()
        if kind == "circle":
            return Circle(*args)
        elif kind == "square":
            return Square(*args)
        elif kind == "triangle":
            return Triangle(*args)
        else:
            raise ValueError(f"Unknown shape kind: {kind}")


# Question 4 Objects and Execution

# my_circle = ShapeFactory.create("circle", 5)
# my_square = ShapeFactory.create("square", 4)
# my_triangle = ShapeFactory.create("triangle", 6, 8)

# print("Circle Area:", my_circle.area())
# print("Square Area:", my_square.area())
# print("Triangle Area:", my_triangle.area())


# Question 5: Write Observer Pair

class NewsAgency:
    def __init__(self):
        self._subscribers = []
        self._latest_news = None

    def subscribe(self, subscriber):
        self._subscribers.append(subscriber)

    def unsubscribe(self, subscriber):
        self._subscribers.remove(subscriber)

    def notify(self):
        for subscriber in self._subscribers:
            subscriber.update(self._latest_news)

    def add_news(self, news):
        self._latest_news = news
        print(f"\n[NewsAgency] Published news: {news}")
        self.notify()


class TVChannel:
    def __init__(self, name):
        self.name = name

    def update(self, news):
        print(f"[{self.name} TV] Broadcasting news: {news}")


class MobileApp:
    def __init__(self, app_name):
        self.app_name = app_name

    def update(self, news):
        print(f"[{self.app_name} Notification] {news}")


# Question 5 Objects and Execution

agency = NewsAgency()

ebc = TVChannel("EBC")
tele_app = MobileApp("TeleBirr News")

agency.subscribe(ebc)
agency.subscribe(tele_app)

agency.add_news("New light rail extension inaugurated in Addis Ababa.")