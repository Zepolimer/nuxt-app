import { defineEventHandler, readBody } from 'h3'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    let eventMethod = event.node.req.method

    if (eventMethod === 'GET') {
        let tasks = await prisma.task.findMany()
        return tasks
    }

    if (eventMethod === 'POST') {
        const body = await readBody(event)

        let task = await prisma.task.create({
            data: {
                title: body.title,
                description: body.description || null,
                status: body.status || false,
            }
        })

        return task
    }

    throw createError({
        statusCode: 405,
        statusMessage: 'Method not allowed'
    })
})