import { type NextRequest, NextResponse } from "next/server"

// In-memory database simulation
let products = [
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

// GET - Read single product
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const product = products.find((p) => p.id === id)

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

// PUT - Update product
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()

    const productIndex = products.findIndex((p) => p.id === id)

    if (productIndex === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Validation
    if (!body.name || !body.description || !body.price || !body.category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (body.price <= 0) {
      return NextResponse.json({ error: "Price must be greater than 0" }, { status: 400 })
    }

    const updatedProduct = {
      id,
      name: body.name,
      description: body.description,
      price: Number.parseFloat(body.price),
      category: body.category,
      inStock: body.inStock ?? true,
    }

    products[productIndex] = updatedProduct

    return NextResponse.json(updatedProduct, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

// DELETE - Delete product
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const productIndex = products.findIndex((p) => p.id === id)

    if (productIndex === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const deletedProduct = products[productIndex]
    products = products.filter((p) => p.id !== id)

    return NextResponse.json({ message: "Product deleted successfully", product: deletedProduct }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
