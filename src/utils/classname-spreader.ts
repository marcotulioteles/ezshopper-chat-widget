export function classNamesSpreader(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}