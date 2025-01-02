export function isNameValid(name: string): boolean {
    const regex = /^[\p{L}\p{N}](?: [\p{L}\p{N}]|[\p{L}\p{N}]){3,19}$/u

    return regex.test(name)
}
