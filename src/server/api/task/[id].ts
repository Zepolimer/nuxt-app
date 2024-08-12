import { defineEventHandler, readBody } from 'h3'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    let eventMethod = event.node.req.method
    let { id } = event.context.params

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'ID is required'
        })
    }

    if (eventMethod === 'GET') {
        let task = await prisma.task.findUnique({
            where: {
                id: parseInt(id)
            }
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

        let task = await prisma.task.update({
            where: {
                id: parseInt(id)
            },
            data: {
                title: body.title,
                description: body.description || null,
                status: body.status || false,
            }
        })

        return task
    }

    if (eventMethod === 'DELETE') {
        let task = await prisma.task.delete({
            where: {
                id: parseInt(id)
            }
        })

        return task
    }

    throw createError({
        statusCode: 405,
        statusMessage: 'Method not allowed'
    })
})