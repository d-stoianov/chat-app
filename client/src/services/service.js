class Service {
    url = "mockdata.json"

    async getMessages() {
        const response = await fetch(this.url)
        const data = await response.json()
        return data
    }
}

export default Service