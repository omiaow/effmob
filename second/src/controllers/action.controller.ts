import { Request, Response } from 'express';
import db from '../db'

interface ActionQueryParams {
    shopId?: string;
    plu?: string;
    dateFrom?: string;
    dateTo?: string;
    action?: string;
    page?: string;
    limit?: string;
}

const actionController = {
    createAction: async (req: Request, res: Response): Promise<void> => {
        try {
            const { productId, shopId, action, details } = req.body

            if (!productId || !action || !details) {
                res.status(400).json({ message: "Требуется параметры productId, shopId, action, и details!" })
                return
            }

            const newAction = await db.query(
                "INSERT INTO actions (product_id, shop_id, action, details) values ($1, $2, $3, $4) RETURNING *",
                [productId, shopId ?? null, action, details]
            )

            res.json(newAction.rows[0])
        } catch (e: any) {
            res.status(500).json({ message: "Что-то пошло не так, попробуйте еще раз!", error: e.message })
        }
    },

    getAction: async (req: Request<{}, {}, {}, ActionQueryParams>, res: Response): Promise<void> => {
        try {
            const { shopId, plu, dateFrom, dateTo, action, page = "1", limit = "10" } = req.query

            let query = `
                SELECT actions.* 
                FROM actions
                JOIN products ON actions.product_id = products.id
            `
            const conditions: string[] = []
            const values: (string | number)[] = []

            if (shopId) {
                conditions.push(`actions.shop_id = $${conditions.length + 1}`)
                values.push(shopId)
            }

            if (plu) {
                conditions.push(`products.plu = $${conditions.length + 1}`)
                values.push(plu)
            }

            if (dateFrom) {
                conditions.push(`actions.created_at >= $${conditions.length + 1}`)
                values.push(dateFrom)
            }

            if (dateTo) {
                conditions.push(`actions.created_at <= $${conditions.length + 1}`)
                values.push(dateTo)
            }

            if (action) {
                conditions.push(`actions.action = $${conditions.length + 1}`)
                values.push(action)
            }

            if (conditions.length > 0) {
                query += ` WHERE ${conditions.join(" AND ")}`
            }

            const offset = (Number(page) - 1) * Number(limit)
            query += ` ORDER BY actions.created_at DESC LIMIT $${conditions.length + 1} OFFSET $${conditions.length + 2}`
            values.push(Number(limit), offset)

            const result = await db.query(query, values)
            res.json({ data: result.rows, page: Number(page), limit: Number(limit) })
        } catch (e: any) {
            res.status(500).json({ message: "Что-то пошло не так, попробуйте еще раз!", error: e.message })
        }
    }
}

export default actionController