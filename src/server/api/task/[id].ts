import { defineEventHandler, readBody } from 'h3'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    let eventMethod = event.node.req.method
    let id = event.context.params!.id

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'ID is required'
        })
    }

    if (eventMethod === 'GET') {
        return prisma.task.findUnique({
            where: {
                id: parseInt(id)
            }
        }).then((task) => {
            return task
        }).catch(() => {
            throw createError({
                statusCode: 404,
                statusMessage: 'Task not found'
            })
        })
    }

    if (eventMethod === 'PUT') {
        const body = await readBody(event)

        return prisma.task.update({
            where: {
                id: parseInt(id)
            },
            data: {
                title: body.title,
                description: body.description || null,
                status: body.status || false,
            }
        }).then((task) => {
            return task
        }).catch((e) => {
            throw createError({
                statusCode: 500,
                statusMessage: `An error has occurred : ${e}`
            })
        })
    }

    if (eventMethod === 'DELETE') {
        return prisma.task.delete({
            where: {
                id: parseInt(id)
            }
        }).then(() => {
            return {
                success: true
            }
        }).catch(() => {
            throw createError({
                statusCode: 404,
                statusMessage: 'Task not found'
            })
        })
    }

    throw createError({
        statusCode: 405,
        statusMessage: 'Method not allowed'
    })
})