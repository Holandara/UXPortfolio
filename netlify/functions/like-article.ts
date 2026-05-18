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
    const { articleId } = JSON.parse(event.body || '{}');

    if (!articleId || typeof articleId !== 'string') {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing articleId' }) };
    }

    await client.patch(articleId).setIfMissing({ likes: 0 }).inc({ likes: 1 }).commit();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error('[like-article]', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal error' }) };
  }
};
