export function isNameValid(name: string) {
    const regex = /^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/

    return regex.test(name)
}
