interface UserI {
    name: string
}

class User implements UserI {
    public name

    constructor(name: string) {
        this.name = name
    }
}

export default User
