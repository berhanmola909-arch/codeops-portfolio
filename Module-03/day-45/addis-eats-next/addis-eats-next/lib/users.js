export const USERS = [
  {
    id: "user_1",
    name: "Addis Tesfaye",
    email: "addis@example.com",
    password: "password123",
    role: "customer",
  },
  {
    id: "user_2",
    name: "Almaz Kebede",
    email: "almaz@example.com",
    password: "password123",
    role: "staff",
  },
];

export function findUserByEmail(email) {
  return USERS.find((u) => u.email === email) || null;
}

export function findUserById(id) {
  return USERS.find((u) => u.id === id) || null;
}