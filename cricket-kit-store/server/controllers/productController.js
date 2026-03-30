import db from "../config/db.js";

// Add Product
export const addProduct = (req, res) => {
  const { name, description, price, category, image, stock } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  const sql = `
    INSERT INTO products (name, description, price, category, image, stock)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, description, price, category, image, stock],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: "Product added successfully" });
    }
  );
};

// Get All Products
export const getProducts = (req, res) => {
  db.query("SELECT * FROM products ORDER BY id DESC", (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(result);
  });
};

// Get Single Product
export const getSingleProduct = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM products WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(result[0]);
  });
};

// Update Product
export const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, image, stock } = req.body;

  const sql = `
    UPDATE products
    SET name=?, description=?, price=?, category=?, image=?, stock=?
    WHERE id=?
  `;

  db.query(
    sql,
    [name, description, price, category, image, stock, id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Product updated successfully" });
    }
  );
};

// Delete Product
export const deleteProduct = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM products WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: "Product deleted successfully" });
  });
};