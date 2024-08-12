
export interface Response {
    statusCode: number
    data: any
    error: string | null
}

export class Api {
    static async call(url: string, params: any): Promise<Response> {
        let response = await fetch(url, params);
        let statusCode = response.status
        let data = {}
        let error = null

        try {
            data = await response.json();
        } catch (e: any) {
            error = e.toString()
        }

        return {
            statusCode,
            data,
            error,
        }
    }
}

