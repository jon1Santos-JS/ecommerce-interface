export default function Currency(value: number) {
    const enCurrency = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'USD',
    }).format(value);

    return [enCurrency];
}
