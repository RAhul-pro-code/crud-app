import { type NextRequest, NextResponse } from "next/server"

// In-memory database simulation (like H2)
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 199.99,
    category: "electronics",
    inStock: true,
  },
  {
    id: 2,
    name: "Cotton T-Shirt",
    description: "Comfortable 100% cotton t-shirt in various colors",
    price: 29.99,
    category: "clothing",
    inStock: true,
  },
  {
    id: 3,
    name: "JavaScript Guide",
    description: "Complete guide to modern JavaScript development",
    price: 49.99,
    category: "books",
    inStock: false,
  },
]

let nextId = 4

// GET - Read all products
export async function GET() {
  try {
    return NextResponse.json(products, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

// POST - Create new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validation
    if (!body.name || !body.description || !body.price || !body.category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (body.price <= 0) {
      return NextResponse.json({ error: "Price must be greater than 0" }, { status: 400 })
    }

    const newProduct = {
      id: nextId++,
      name: body.name,
      description: body.description,
      price: Number.parseFloat(body.price),
      category: body.category,
      inStock: body.inStock ?? true,
    }

    products.push(newProduct)

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
