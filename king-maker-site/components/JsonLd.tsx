/* Server component — renders a JSON-LD @graph into a crawlable script tag. */
export function JsonLd({ graph }: { graph: string }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: graph }}
    />
  );
}
