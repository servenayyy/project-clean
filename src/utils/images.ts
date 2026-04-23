export function withCategoryPlaceholder(imageUrl: string | null, slug: string): string {
  return imageUrl ?? `https://picsum.photos/seed/${slug}/400/300`
}
