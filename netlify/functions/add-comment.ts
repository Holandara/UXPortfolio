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
    const { articleSlug, name, content } = await req.json();

    if (!articleSlug || !name || !content) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (typeof name !== 'string' || name.length < 2 || name.length > 100) {
      return new Response(JSON.stringify({ error: 'Invalid name' }), { status: 400 });
    }

    if (typeof content !== 'string' || content.length < 5 || content.length > 1000) {
      return new Response(JSON.stringify({ error: 'Invalid content' }), { status: 400 });
    }

    await client.create({
      _type: 'comment',
      articleSlug,
      name: name.trim(),
      content: content.trim(),
      approved: false,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[add-comment]', err);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const config = { path: '/api/add-comment' };
