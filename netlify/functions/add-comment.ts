import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env['SANITY_PROJECT_ID'] || 'k62barq9',
  dataset: process.env['SANITY_DATASET'] || 'production',
  token: process.env['SANITY_WRITE_TOKEN'],
  apiVersion: '2024-01-01',
  useCdn: false,
});

export const handler = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { articleSlug, name, content } = JSON.parse(event.body || '{}');

    if (!articleSlug || !name || !content) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing fields' }) };
    }

    if (typeof name !== 'string' || name.length < 2 || name.length > 100) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid name' }) };
    }

    if (typeof content !== 'string' || content.length < 5 || content.length > 1000) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid content' }) };
    }

    await client.create({
      _type: 'comment',
      articleSlug,
      name: name.trim(),
      content: content.trim(),
      approved: false,
    });

    return {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error('[add-comment]', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal error' }) };
  }
};
