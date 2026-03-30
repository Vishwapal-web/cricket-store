import db from "../config/db.js";

// Place Order
export const placeOrder = (req, res) => {
  const userId = req.user.id;
  const { fullName, phone, address, city, pincode, totalAmount, cartItems } = req.body;

  if (!fullName || !phone || !address || !city || !pincode || !cartItems || cartItems.length === 0) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const orderSql = `
    INSERT INTO orders (user_id, full_name, phone, address, city, pincode, total_amount, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    orderSql,
    [userId, fullName, phone, address, city, pincode, totalAmount, "Pending"],
    (err, orderResult) => {
      if (err) {
        console.log("ORDER INSERT ERROR:", err);
        return res.status(500).json({
          message: "Order creation failed",
          error: err.sqlMessage || err.message
        });
      }

      const orderId = orderResult.insertId;

      const orderItemsSql = `
        INSERT INTO order_items (order_id, product_id, product_name, price, quantity, image)
        VALUES ?
      `;

      const orderItemsValues = cartItems.map((item) => [
        orderId,
        Number(item.id),
        item.name,
        Number(item.price),
        Number(item.quantity),
        item.image || ""
      ]);

      db.query(orderItemsSql, [orderItemsValues], (err) => {
        if (err) {
          console.log("ORDER ITEMS INSERT ERROR:", err);
          return res.status(500).json({
            message: "Order items failed",
            error: err.sqlMessage || err.message
          });
        }

        res.status(201).json({
          message: "Order placed successfully",
          orderId
        });
      });
    }
  );
};

// Logged in user's orders
export const getUserOrders = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT * FROM orders
    WHERE user_id = ?
    ORDER BY id DESC
  `;

  db.query(sql, [userId], (err, orders) => {
    if (err) return res.status(500).json(err);

    if (orders.length === 0) {
      return res.status(200).json([]);
    }

    const orderIds = orders.map(order => order.id);

    const itemsSql = `
      SELECT * FROM order_items
      WHERE order_id IN (?)
    `;

    db.query(itemsSql, [orderIds], (err, items) => {
      if (err) return res.status(500).json(err);

      const formattedOrders = orders.map(order => ({
        ...order,
        items: items.filter(item => item.order_id === order.id)
      }));

      res.status(200).json(formattedOrders);
    });
  });
};

// Admin - All Orders
export const getAllOrders = (req, res) => {
  const sql = `
    SELECT o.*, u.name AS user_name, u.email
    FROM orders o
    JOIN users u ON o.user_id = u.id
    ORDER BY o.id DESC
  `;

  db.query(sql, (err, orders) => {
    if (err) return res.status(500).json(err);

    if (orders.length === 0) {
      return res.status(200).json([]);
    }

    const orderIds = orders.map(order => order.id);

    const itemsSql = `
      SELECT * FROM order_items
      WHERE order_id IN (?)
    `;

    db.query(itemsSql, [orderIds], (err, items) => {
      if (err) return res.status(500).json(err);

      const formattedOrders = orders.map(order => ({
        ...order,
        items: items.filter(item => item.order_id === order.id)
      }));

      res.status(200).json(formattedOrders);
    });
  });
};

// Update Order Status
export const updateOrderStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  db.query("UPDATE orders SET status = ? WHERE id = ?", [status, id], (err) => {
    if (err) return res.status(500).json(err);

    res.status(200).json({ message: "Order status updated successfully" });
  });
};