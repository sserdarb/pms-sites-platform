import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { env } from './env.js';
import { getJob, listJobs } from './jobs.js';
import { logEnvSummary, provisionAsync } from './pipeline.js';

const app = new Hono();

app.use('*', cors());

app.use('*', async (c, next) => {
  if (c.req.path === '/health') return next();
  const auth = c.req.header('authorization') ?? '';
  if (auth !== `Bearer ${env.apiToken}`) {
    return c.json({ error: 'unauthorized' }, 401);
  }
  return next();
});

app.get('/health', (c) => c.json({ ok: true, ts: Date.now() }));

app.post('/provision', async (c) => {
  const body = await c.req.json().catch(() => null);
  if (!body || typeof body !== 'object') {
    return c.json({ error: 'invalid body' }, 400);
  }
  const { slug, config, content } = body as {
    slug?: unknown;
    config?: unknown;
    content?: unknown;
  };
  if (typeof slug !== 'string' || !/^[a-z0-9-]{3,40}$/.test(slug)) {
    return c.json({ error: 'slug must be lowercase 3-40 chars (a-z0-9-)' }, 400);
  }
  if (!config || typeof config !== 'object') {
    return c.json({ error: 'config required' }, 400);
  }
  const job = provisionAsync({ slug, config: config as never, content: content ?? {} });
  return c.json({ jobId: job.id, status: job.status, statusUrl: `/jobs/${job.id}` }, 202);
});

app.get('/jobs/:id', (c) => {
  const job = getJob(c.req.param('id'));
  if (!job) return c.json({ error: 'not found' }, 404);
  return c.json(job);
});

app.get('/jobs', (c) => c.json({ jobs: listJobs() }));

logEnvSummary();
serve({ fetch: app.fetch, port: env.port }, (info) => {
  console.log(`[provisioner] listening on :${info.port}`);
});
