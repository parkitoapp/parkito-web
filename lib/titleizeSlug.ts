export default function titleizeSlug(slug?: string) {
    if (!slug) return "";
    return slug
        .split('-')
        .map(w => w ? w[0].toUpperCase() + w.slice(1) : "")
        .join(' ');
}