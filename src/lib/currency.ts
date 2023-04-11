export default function currency(value: number, format: string) {
    const formatedString = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: format,
    })
        .format(value)
        .replace(/\s/g, '');

    return formatedString;
}
