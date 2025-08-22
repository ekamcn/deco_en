import type { LoaderFunction } from '@shopify/remix-oxygen';

export const loader: LoaderFunction = async ({ request, context }: any) => {
  const url = new URL(request.url);
  const queryParams = url.searchParams;
  const someParam: any = queryParams.get('imagename');
  if (!someParam) {
    return new Response('Image name not found', { status: 404 });
  }
  let base64 = context.env[someParam];

  if (!base64) {
    return new Response('Image not found', { status: 404 });
  }

  let mimeType = 'image/png';

  // Handle full data URI
  if (base64.startsWith('data:')) {
    const parts = base64.split(',');
    base64 = parts[1];
    const match = parts[0].match(/data:(.*);base64/);
    if (match) mimeType = match[1];
  }

  // Clean the base64 string
  base64 = base64.replace(/[^A-Za-z0-9+/=]/g, ''); // Remove anything not valid base64

  try {
    const binaryStr = atob(base64);
    const byteArray = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
      byteArray[i] = binaryStr.charCodeAt(i);
    }

    return new Response(byteArray, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Length': byteArray.length.toString(),
        'Cache-Control': 'public, max-age=0',
      },
    });
  } catch (e) {
    return new Response('Invalid base64 string', { status: 400 });
  }
};