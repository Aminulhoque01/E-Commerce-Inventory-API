import mongoose from "mongoose";
import { CartModel } from "../app/modules/cart/cart.model";
import { CatalogModel } from "../app/modules/catalog/catalog.model";
import { OrderModel } from "../app/modules/order/order.model";
import { PromoModel } from "../app/modules/promo/promo.model";
import { v4 as uuidv4 } from 'uuid';


// Sample Promo Data (10 entries)
const promoData = [
  { code: "VISTA SYS", percent: 15 },
  { code: "SUMMER SALE", percent: 10 },
  { code: "WINTER DISCOUNT", percent: 20 },
  { code: "HOLIDAY SPECIAL", percent: 25 },
  { code: "BACKTOSCHOOL", percent: 30 },
  { code: "SPRINGFLING", percent: 10 },
  { code: "EASTERBONUS", percent: 5 },
  { code: "VIPDISCOUNT", percent: 40 },
  { code: "BOGOFFER", percent: 50 },
  { code: "NEWYEAR2025", percent: 15 },
];
// Catalog Data with predefined IDs
const catalogData = [
  {
    _id: "68ab7470b7bb1ab998bc2f04", 
    name: "T-Shirt", description: "Comfortable T-shirt.", category: "Apparel", 
    variants: [
      { size: "S", color: "Blue", price: 19.99, _id: "68ab7470b7bb1ab998bc2f05" },
      { size: "M", color: "Blue", price: 21.99, _id: "68ab7470b7bb1ab998bc2f06" },
      { size: "L", color: "Blue", price: 23.99, _id: "68ab7470b7bb1ab998bc2f07" }
    ]
  },
  {
    _id: "68ab7470b7bb1ab998bc2f08",
    name: "Jeans", description: "Stylish denim jeans.", category: "Apparel", 
    variants: [
      { size: "S", color: "Black", price: 29.99, _id: "68ab7470b7bb1ab998bc2f09" },
      { size: "M", color: "Black", price: 31.99, _id: "68ab7470b7bb1ab998bc2f0a" },
      { size: "L", color: "Black", price: 33.99, _id: "68ab7470b7bb1ab998bc2f0b" }
    ]
  },
  {
    _id: "68ab7470b7bb1ab998bc2f0c", 
    name: "Jacket", description: "Warm winter jacket.", category: "Apparel", 
    variants: [
      { size: "S", color: "Gray", price: 49.99, _id: "68ab7470b7bb1ab998bc2f0d" },
      { size: "M", color: "Gray", price: 51.99, _id: "68ab7470b7bb1ab998bc2f0e" },
      { size: "L", color: "Gray", price: 53.99, _id: "68ab7470b7bb1ab998bc2f0f" }
    ]
  },
  {
    _id: "68ab7470b7bb1ab998bc2f10", 
    name: "Sneakers", description: "Comfortable running shoes.", category: "Footwear", 
    variants: [
      { size: "8", color: "White", price: 59.99, _id: "68ab7470b7bb1ab998bc2f11" },
      { size: "9", color: "White", price: 61.99, _id: "68ab7470b7bb1ab998bc2f12" },
      { size: "10", color: "White", price: 63.99, _id: "68ab7470b7bb1ab998bc2f13" }
    ]
  },
  {
    _id: "68ab7470b7bb1ab998bc2f14", 
    name: "Sweater", description: "Cozy wool sweater.", category: "Apparel", 
    variants: [
      { size: "S", color: "Red", price: 39.99, _id: "68ab7470b7bb1ab998bc2f15" },
      { size: "M", color: "Red", price: 41.99, _id: "68ab7470b7bb1ab998bc2f16" },
      { size: "L", color: "Red", price: 43.99, _id: "68ab7470b7bb1ab998bc2f17" }
    ]
  },
  {
    _id: "68ab7470b7bb1ab998bc2f18", 
    name: "Hat", description: "Stylish baseball hat.", category: "Accessories", 
    variants: [{ size: "One Size", color: "Black", price: 19.99, _id: "68ab7470b7bb1ab998bc2f19" }]
  },
  {
    _id: "68ab7470b7bb1ab998bc2f1a", 
    name: "Socks", description: "Comfortable cotton socks.", category: "Accessories", 
    variants: [{ size: "One Size", color: "White", price: 5.99, _id: "68ab7470b7bb1ab998bc2f1b" }]
  },
  {
    _id: "68ab7470b7bb1ab998bc2f1c", 
    name: "Watch", description: "Luxury wristwatch.", category: "Accessories", 
    variants: [{ size: "One Size", color: "Gold", price: 199.99, _id: "68ab7470b7bb1ab998bc2f1d" }]
  },
  {
    _id: "68ab7470b7bb1ab998bc2f1e", 
    name: "Belt", description: "Leather belt.", category: "Accessories", 
    variants: [{ size: "M", color: "Brown", price: 29.99, _id: "68ab7470b7bb1ab998bc2f1f" }]
  },
  {
    _id: "68ab7470b7bb1ab998bc2f20", 
    name: "Shorts", description: "Summer shorts.", category: "Apparel", 
    variants: [
      { size: "S", color: "Green", price: 14.99, _id: "68ab7470b7bb1ab998bc2f21" },
      { size: "M", color: "Green", price: 16.99, _id: "68ab7470b7bb1ab998bc2f22" },
      { size: "L", color: "Green", price: 18.99, _id: "68ab7470b7bb1ab998bc2f23" }
    ]
  }
];

// Sample Cart Data (10 entries)
const cartData = [
  { items: [{ productId: "68ab7470b7bb1ab998bc2f04", quantity: 1, variant: "M", price: 21.99 }], promoCode: "SUMMER SALE", subTotal: 21.99, promoDiscountTotal: 2.20, total: 19.79, token: uuidv4() },
  { items: [{ productId: "68ab7470b7bb1ab998bc2f08", quantity: 2, variant: "S", price: 19.99 }], promoCode: "WINTER DISCOUNT", subTotal: 39.98, promoDiscountTotal: 8.00, total: 31.98, token: uuidv4() },
  { items: [{ productId: "68ab7470b7bb1ab998bc2f0c", quantity: 1, variant: "L", price: 23.99 }], promoCode: "HOLIDAY SPECIAL", subTotal: 23.99, promoDiscountTotal: 6.00, total: 17.99, token: uuidv4() },
  { items: [{ productId: "68ab7470b7bb1ab998bc2f10", quantity: 3, variant: "M", price: 21.99 }], promoCode: "BACKTOSCHOOL", subTotal: 65.97, promoDiscountTotal: 15.00, total: 50.97, token: uuidv4() },
  { items: [{ productId: "68ab7470b7bb1ab998bc2f14", quantity: 2, variant: "S", price: 19.99 }], promoCode: "SPRINGFLING", subTotal: 39.98, promoDiscountTotal: 3.99, total: 35.99, token: uuidv4() },
  { items: [{ productId: "68ab7470b7bb1ab998bc2f18", quantity: 5, variant: "L", price: 23.99 }], promoCode: "EASTERBONUS", subTotal: 119.95, promoDiscountTotal: 10.00, total: 109.95, token: uuidv4() },
  { items: [{ productId: "68ab7470b7bb1ab998bc2f1a", quantity: 1, variant: "S", price: 19.99 }], promoCode: "VIPDISCOUNT", subTotal: 19.99, promoDiscountTotal: 10.00, total: 9.99, token: uuidv4() },
  { items: [{ productId: "68ab7470b7bb1ab998bc2f1c", quantity: 2, variant: "M", price: 21.99 }], promoCode: "BOGOFFER", subTotal: 43.98, promoDiscountTotal: 21.99, total: 21.99, token: uuidv4() },
  { items: [{ productId: "68ab7470b7bb1ab998bc2f20", quantity: 3, variant: "S", price: 19.99 }], promoCode: "NEWYEAR2025", subTotal: 59.97, promoDiscountTotal: 9.00, total: 50.97, token: uuidv4() },
  { items: [{ productId: "68ab7470b7bb1ab998bc2f14", quantity: 1, variant: "M", price: 21.99 }], promoCode: "SUMMER SALE", subTotal: 21.99, promoDiscountTotal: 2.20, total: 19.79, token: uuidv4() }
];

// Sample Order Data (10 entries)
const orderData = [
  {
    items: [{ productId: "68ab7470b7bb1ab998bc2f04", quantity: 1, variant: "M", price: 21.99 }], promoCode: "SUMMER SALE", subTotal: 21.99, promoDiscountTotal: 2.20, total: 19.79, token: uuidv4(), name: "John Doe", address: "123 Main St, City, Country", phoneNumber: "1234567890", status: "Pending"
  },
  {
    items: [{ productId: "68ab7470b7bb1ab998bc2f08", quantity: 2, variant: "S", price: 19.99 }], promoCode: "WINTER DISCOUNT", subTotal: 39.98, promoDiscountTotal: 8.00, total: 31.98, token: uuidv4(), name: "Jane Smith", address: "456 Maple Ave, City, Country", phoneNumber: "9876543210", status: "Shipped"
  },
  {
    items: [{ productId: "68ab7470b7bb1ab998bc2f0c", quantity: 1, variant: "L", price: 23.99 }], promoCode: "HOLIDAY SPECIAL", subTotal: 23.99, promoDiscountTotal: 6.00, total: 17.99, token: uuidv4(), name: "Alice Johnson", address: "789 Oak Rd, City, Country", phoneNumber: "1231231234", status: "Delivered"
  },
  {
    items: [{ productId: "68ab7470b7bb1ab998bc2f10", quantity: 3, variant: "M", price: 21.99 }], promoCode: "BACKTOSCHOOL", subTotal: 65.97, promoDiscountTotal: 15.00, total: 50.97, token: uuidv4(), name: "Michael Brown", address: "101 Pine St, City, Country", phoneNumber: "4564564567", status: "Pending"
  },
  {
    items: [{ productId: "68ab7470b7bb1ab998bc2f14", quantity: 2, variant: "S", price: 19.99 }], promoCode: "SPRINGFLING", subTotal: 39.98, promoDiscountTotal: 3.99, total: 35.99, token: uuidv4(), name: "Emily White", address: "202 Elm St, City, Country", phoneNumber: "9879879876", status: "Shipped"
  },
  {
    items: [{ productId: "68ab7470b7bb1ab998bc2f18", quantity: 5, variant: "L", price: 23.99 }], promoCode: "EASTERBONUS", subTotal: 119.95, promoDiscountTotal: 10.00, total: 109.95, token: uuidv4(), name: "David Green", address: "303 Birch Ave, City, Country", phoneNumber: "6546546543", status: "Delivered"
  },
  {
    items: [{ productId: "68ab7470b7bb1ab998bc2f1a", quantity: 1, variant: "S", price: 19.99 }], promoCode: "VIPDISCOUNT", subTotal: 19.99, promoDiscountTotal: 10.00, total: 9.99, token: uuidv4(), name: "Olivia Lee", address: "404 Cedar St, City, Country", phoneNumber: "3213213210", status: "Pending"
  },
  {
    items: [{ productId: "68ab7470b7bb1ab998bc2f1c", quantity: 2, variant: "M", price: 21.99 }], promoCode: "BOGOFFER", subTotal: 43.98, promoDiscountTotal: 21.99, total: 21.99, token: uuidv4(), name: "Daniel Scott", address: "505 Maple Ln, City, Country", phoneNumber: "4324324321", status: "Shipped"
  },
  {
    items: [{ productId: "68ab7470b7bb1ab998bc2f20", quantity: 3, variant: "S", price: 19.99 }], promoCode: "NEWYEAR2025", subTotal: 59.97, promoDiscountTotal: 9.00, total: 50.97, token: uuidv4(), name: "Isabella Adams", address: "606 Pine Ave, City, Country", phoneNumber: "5435435432", status: "Delivered"
  },
  {
    items: [{ productId: "68ab7470b7bb1ab998bc2f14", quantity: 1, variant: "M", price: 21.99 }], promoCode: "SUMMER SALE", subTotal: 21.99, promoDiscountTotal: 2.20, total: 19.79, token: uuidv4(), name: "Jack Taylor", address: "707 Oak Dr, City, Country", phoneNumber: "7657657657", status: "Pending"
  },
];

const seedDatabase = async () => {
  try {
    // Connect to the database
    await mongoose.connect("mongodb://localhost:27017/Vista_systech_task_DB");

    console.log("Connected to MongoDB");

    // Clear existing collections
    await PromoModel.deleteMany({});
    await CatalogModel.deleteMany({});
    await CartModel.deleteMany({});
    await OrderModel.deleteMany({});

    console.log("Cleared existing data");

    // Insert new data
    await PromoModel.insertMany(promoData); // Make sure you have your promo data defined somewhere
    await CatalogModel.insertMany(catalogData);
    await CartModel.insertMany(cartData);
    await OrderModel.insertMany(orderData);

    console.log("Data inserted successfully");

    // Close the database connection
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.error("Error while seeding database:", err);
  }
};

// Run the seeder
seedDatabase();
