import db from '../db.js'

const productController = {
    createProduct: async (req, res) => {
        try {
            const { plu, name } = req.body

            if (!plu || !name) {
                return res.status(400).json({ message: "Требуется параметры plu и name!" })
            }

            const newProduct = await db.query("INSERT INTO products (plu, name) values ($1, $2) RETURNING *", [plu, name])

            const data = {
                productId: newProduct.rows[0].id,
                action: "create_product",
                details: req.body
            }

            console.log(data)

            await fetch("http://localhost:8081/actions", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            res.json(newProduct.rows[0])
        } catch (e) {
            res.status(500).json({ message: "Что-то пошло не так, попробуйте еще раз!", error: e.message })
        }
    },

    getProducts: async (req, res) => {
        try {
            const { plu, name } = req.query

            if (plu && name) {
                const products = await db.query("SELECT * FROM products WHERE plu = $1 AND name = $2", [plu, name])
                res.json(products.rows)
            } else if (plu) {
                const products = await db.query("SELECT * FROM products WHERE plu = $1", [plu])
                res.json(products.rows)
            } else if (name) {
                const products = await db.query("SELECT * FROM products WHERE name = $1", [name])
                res.json(products.rows)
            } else {
                const products = await db.query("SELECT * FROM products")
                res.json(products.rows)
            }
        } catch (e) {
            res.status(500).json({ message: "Что-то пошло не так, попробуйте еще раз!", error: e.message })
        }
    }
}

export default productController