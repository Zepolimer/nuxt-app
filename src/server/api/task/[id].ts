import { defineEventHandler, readBody } from 'h3'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    let eventMethod = event.node.req.method
    let { id } = event.context.params

    if (eventMethod === 'GET') {
        if (!id || isNaN(id)) {
            throw createError({
                statusCode: 400,
                statusMessage: 'ID is required'
            })
        }

        let task = await prisma.task.findUnique({
            where: { id: parseInt(id) }
        })

        if (!task) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Task not found'
            })
        }

        return task
    }

    if (eventMethod === 'PUT') {
        const body = await readBody(event)

        // let task = await prisma.task.upsert({
        //     data: {
        //         title: body.title,
        //         description: body.description || null,
        //         status: body.status || false,
        //     }
        // })

        // return task
    }

    throw createError({
        statusCode: 405,
        statusMessage: 'Method not allowed'
    })
})