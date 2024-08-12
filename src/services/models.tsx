

export class Task {
    id: number = 0
    title: string = ''
    description: string | null = null
    status: boolean = false

    check() {
        this.status = !this.status
    }
}