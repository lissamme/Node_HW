
// Task 1
function calculateTotal(price: number, quantity: number, discount: number = 0): number {
  return price * quantity * (1 - discount / 100);
}

console.log("Task 1:", calculateTotal(100, 3));      // 300
console.log("Task 1 with 10% discount:", calculateTotal(100, 3, 10)); // 270

// Task 2
let id: string | number = "abc123";

function displayId(value: string | number): void {
  if (typeof value === "string") {
    console.log("ID:", value.toUpperCase());
  } else {
    console.log("ID:", value * 10);
  }
}

displayId(id);
id = 25;
displayId(id);

// Task 3
type OrderStatus = "pending" | "shipped" | "delivered";

interface Order {
  orderId: string;
  amount: number;
  status: OrderStatus;
}

const orders: Order[] = [
  { orderId: "ORD-001", amount: 150, status: "pending" },
  { orderId: "ORD-002", amount: 300, status: "shipped" },
  { orderId: "ORD-003", amount: 200, status: "delivered" },
  { orderId: "ORD-004", amount: 100, status: "pending" }
];

function filterOrdersByStatus(orders: Order[], status: OrderStatus): Order[] {
  return orders.filter((order) => order.status === status);
}

console.log("Task 3:", filterOrdersByStatus(orders, "pending"));

// Task 4
type ProductInfo = [string, number, number];

const productInfo: ProductInfo = ["Laptop", 1200, 5];
const inventory: Record<string, number> = { Laptop: 10, Mouse: 20 };

function updateStock(
  inventory: Record<string, number>,
  productInfo: ProductInfo
): Record<string, number> {
  const [productName, _price, quantityChange] = productInfo;
  inventory[productName] = (inventory[productName] ?? 0) + quantityChange;
  return inventory;
}

console.log("Task 4:", updateStock(inventory, productInfo)); // Laptop: 15, Mouse: 20
console.log("New product:", updateStock(inventory, ["Keyboard", 50, 7]));
