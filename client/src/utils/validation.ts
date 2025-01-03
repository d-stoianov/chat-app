export function validateUserName(name: string): boolean {
    const regex = /^[\p{L}\p{N}](?: [\p{L}\p{N}]|[\p{L}\p{N}]){3,19}$/u

    return regex.test(name)
}

export function validateRoomName(name: string): boolean {
    if (name.length > 0) {
        return true
    }
    return false
}
