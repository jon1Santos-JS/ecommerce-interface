export default function toTrimString(content: string, amount: number) {
    if (!content) return '';
    const contentArray = content.split(' ');
    const trimmedContent = contentArray
        .filter((value, index) => {
            if (index >= amount) return '';
            return value;
        })
        .join(' ');

    return trimmedContent;
}
