import getBrowser from "@/lib/puppeteer";

export const runtime = "nodejs"; // IMPORTANT: not edge

export async function POST(req) {
    const { url } = await req.json();
    if (!url) return new Response("Missing url", { status: 400 });

    const proto = req.headers.get("x-forwarded-proto") || "http";
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
    const base = process.env.NEXT_PUBLIC_BASE_URL || `${proto}://${host}`;
    const target = url.startsWith("http") ? url : `${base}${url}`;

    const browser = await getBrowser();

    try {
        const page = await browser.newPage();

        await page.goto(target, { waitUntil: "networkidle0" });
        await page.waitForSelector("#cv-preview", { timeout: 20_000 });

        await page.addStyleTag({
            content: `
            @page { size: A4; margin: 0; }
            body * { visibility: hidden; }
            #cv-preview, #cv-preview * { visibility: visible; }
            #cv-preview { margin: 0 auto; position: absolute; top: 0; left: 0; }
            `,
        });
        
        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
        });

        return new Response(pdfBuffer, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": 'attachment; filename="cv.pdf"',
            },
        });
    } catch (e) {
        console.log(e.message)
        return new Response(`PDF error: ${e.message}`, { status: 500 });
    }
}