import { ADSENSE_CLIENT_ID } from "@/lib/adsConfig";

export async function GET() {
  const pubId = ADSENSE_CLIENT_ID.replace("ca-pub-", "pub-");
  const body = ADSENSE_CLIENT_ID
    ? `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`
    : "# ads.txt: configura NEXT_PUBLIC_ADSENSE_CLIENT_ID para generar la entrada de Google AdSense\n";

  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  });
}
