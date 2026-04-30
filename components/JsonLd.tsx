// components/JsonLd.tsx
// Server Component — no client hooks needed

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
  return (
    <script
      type="application/ld+json"
      // safe: data is always internally constructed, never user input;
      // html special chars are escaped above via unicode sequences
      {...{ dangerouslySetInnerHTML: { __html: json } }}
    />
  )
}
