import db from '../db.js'

const stockController = {
    createStock: async (req, res) => {
        try {
            const { productId, shopId, stockOnShelf, stockInOrder } = req.body
            
            if (!productId || !shopId || !stockOnShelf || !stockInOrder) {
                return res.status(400).json({ message: "Требуется данные productId, shopId, stockOnShelf, и stockInOrder!" })
            }

            const newStock = await db.query("INSERT INTO stocks (product_id, shop_id, stock_on_shelf, stock_in_order) values ($1, $2, $3, $4) RETURNING *", [productId, shopId, stockOnShelf, stockInOrder])
            
            const data = {
                productId: productId,
                shopId: shopId,
                action: "create_stock",
                details: req.body
            }

            await fetch("http://localhost:8081/actions", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            res.json(newStock.rows[0])
        } catch (e) {
            res.status(500).json({ message: "Что-то пошло не так, попробуйте еще раз!", error: e.message })
        }
    },

    increaseStock: async (req, res) => {
        try {
            const id = req.params.id
            const { amount } = req.body

            if (!id) {
                return res.status(400).json({ message: "Требуется параметр id в /stocks/:id/increase" })
            }

            if (!amount) {
                return res.status(400).json({ message: "Требуется данные amount!" })
            }

            const stock = await db.query("UPDATE stocks set stock_on_shelf = stock_on_shelf + $1 WHERE id = $2 RETURNING *", [amount, id])
            
            const data = {
                productId: stock.rows[0].product_id,
                shopId: stock.rows[0].shop_id,
                action: "increase_stock",
                details: req.body
            }

            await fetch("http://localhost:8081/actions", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            
            res.json(stock.rows[0])
        } catch (e) {
            res.status(500).json({ message: "Что-то пошло не так, попробуйте еще раз!", error: e.message })
        }
    },

    decreaseStock: async (req, res) => {
        try {
            const id = req.params.id
            const { amount } = req.body

            if (!id) {
                return res.status(400).json({ message: "Требуется параметр id в /stocks/:id/increase" })
            }

            if (!amount) {
                return res.status(400).json({ message: "Требуется данные amount!" })
            }

            const stock = await db.query("UPDATE stocks SET stock_on_shelf = CASE WHEN stock_on_shelf < $1 THEN 0 ELSE stock_on_shelf - $1 END WHERE id = $2 RETURNING *", [amount, id])
            
            const data = {
                productId: stock.rows[0].product_id,
                shopId: stock.rows[0].shop_id,
                action: "decrease_stock",
                details: req.body
            }

            await fetch("http://localhost:8081/actions", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            
            res.json(stock.rows[0])
        } catch (e) {
            res.status(500).json({ message: "Что-то пошло не так, попробуйте еще раз!", error: e.message })
        }
    },

    getStocks: async (req, res) => {
        try {
            const {
                plu,
                shopId,
                stockOnShelfFrom,
                stockOnShelfTo,
                stockInOrderFrom,
                stockInOrderTo,
            } = req.query
    
            let query = `
                SELECT stocks.* 
                FROM stocks
                JOIN products ON stocks.product_id = products.id
            `
            let conditions = []
            let values = []
    
            if (plu) {
                conditions.push(`products.plu = $${conditions.length + 1}`)
                values.push(plu)
            }
    
            if (shopId) {
                conditions.push(`stocks.shop_id = $${conditions.length + 1}`)
                values.push(shopId)
            }
    
            if (stockOnShelfFrom) {
                conditions.push(`stocks.stock_on_shelf >= $${conditions.length + 1}`)
                values.push(stockOnShelfFrom)
            }
    
            if (stockOnShelfTo) {
                conditions.push(`stocks.stock_on_shelf <= $${conditions.length + 1}`)
                values.push(stockOnShelfTo)
            }
    
            if (stockInOrderFrom) {
                conditions.push(`stocks.stock_in_order >= $${conditions.length + 1}`)
                values.push(stockInOrderFrom)
            }
    
            if (stockInOrderTo) {
                conditions.push(`stocks.stock_in_order <= $${conditions.length + 1}`)
                values.push(stockInOrderTo)
            }
    
            if (conditions.length > 0) {
                query += ` WHERE ${conditions.join(' AND ')}`
            }
    
            const stocks = await db.query(query, values)
            res.json(stocks.rows)
        } catch (e) {
            res.status(500).json({ message: "Что-то пошло не так, попробуйте еще раз!", error: e.message })
        }
    }
}

export default stockController