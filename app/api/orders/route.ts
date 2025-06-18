import { NextResponse } from "next/server"
import mysql, { RowDataPacket, ResultSetHeader } from "mysql2/promise"

// Type guard for MySQL errors
interface MySQLError extends Error {
  code?: string
  sqlMessage?: string
}

const isMySQLError = (error: unknown): error is MySQLError => {
  return (
    error instanceof Error &&
    typeof (error as MySQLError).code === "string"
  )
}

// Define the shape of the order row
interface OrderRow extends RowDataPacket {
  id: number
  email: string
  createdAt: string
  user_name: string
}

export async function GET() {
  let connection
  try {
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: "tuniform",
      port: parseInt(process.env.MYSQL_PORT || "3306"),
    })

    const [rows] = await connection.execute<OrderRow[]>(
      `
      SELECT orders.id, orders.email, orders.createdAt, users.name AS user_name
      FROM orders
      JOIN users ON orders.user_id = users.id
    `
    )
    return NextResponse.json(rows)
  } catch (error: unknown) {
    const message = isMySQLError(error)
      ? `Error fetching orders: ${error.message}, ${error.code}`
      : "Error fetching orders: Unknown error"
    console.error(message)
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    )
  } finally {
    if (connection) await connection.end()
  }
}

export async function POST(request: Request) {
  let connection
  try {
    const { customerName, email } = await request.json()

    if (
      !customerName ||
      typeof customerName !== "string" ||
      customerName.length > 255
    ) {
      return NextResponse.json(
        { error: "Invalid customer name" },
        { status: 400 }
      )
    }
    if (
      !email ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: "tuniform",
      port: parseInt(process.env.MYSQL_PORT || "3306"),
    })

    await connection.beginTransaction()

    let userId: number
    const [userResult] = await connection.execute<{ id: number }[]>(
      "SELECT id FROM users WHERE email = ?",
      [email]
    )

    if (
      Array.isArray(userResult) &&
      userResult.length > 0 &&
      userResult[0].id
    ) {
      userId = userResult[0].id
    } else {
      try {
        const [insertUserResult] = await connection.execute<ResultSetHeader>(
          "INSERT INTO users (name, email) VALUES (?, ?)",
          [customerName, email]
        )
        if (
          !insertUserResult ||
          typeof insertUserResult.insertId !== "number" ||
          insertUserResult.insertId <= 0
        ) {
          throw new Error("Failed to retrieve valid insertId for new user")
        }
        userId = insertUserResult.insertId
        console.log("Insert user result:", insertUserResult)
      } catch (insertError: unknown) {
        if (isMySQLError(insertError) && insertError.code === "ER_DUP_ENTRY") {
          return NextResponse.json(
            { error: "Email already exists" },
            { status: 400 }
          )
        }
        throw insertError
      }
    }

    try {
      const [result] = await connection.execute<ResultSetHeader>(
        "INSERT INTO orders (user_id, email) VALUES (?, ?)",
        [userId, email]
      )
      if (
        !result ||
        typeof result.insertId !== "number" ||
        result.insertId <= 0
      ) {
        throw new Error("Failed to retrieve valid insertId for new order")
      }
      console.log("Insert order result:", result)

      await connection.commit()

      return NextResponse.json(
        { id: result.insertId, user_id: userId, email, createdAt: new Date() },
        { status: 201 }
      )
    } catch (insertError: unknown) {
      if (
        isMySQLError(insertError) &&
        insertError.code === "ER_NO_REFERENCED_ROW_2"
      ) {
        return NextResponse.json({ error: "Invalid user ID" }, { status: 400 })
      }
      throw insertError
    }
  } catch (error: unknown) {
    if (connection) await connection.rollback()
    const message = isMySQLError(error)
      ? `Error creating order: ${error.message}, ${error.code}, ${error.sqlMessage}`
      : "Error creating order: Unknown error"
    console.error(message)
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    )
  } finally {
    if (connection) await connection.end()
  }
}