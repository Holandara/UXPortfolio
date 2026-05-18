import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env['SANITY_PROJECT_ID'] || 'k62barq9',
  dataset: process.env['SANITY_DATASET'] || 'production',
  token: process.env['SANITY_WRITE_TOKEN'],
  apiVersion: '2024-01-01',
  useCdn: false,
});

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { articleId } = await req.json();
    if (!articleId || typeof articleId !== 'string') {
      return new Response(JSON.stringify({ error: 'Missing articleId' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await client.patch(articleId).setIfMissing({ likes: 0 }).inc({ likes: 1 }).commit();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[like-article]', err);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const config = { path: '/api/like-article' };
