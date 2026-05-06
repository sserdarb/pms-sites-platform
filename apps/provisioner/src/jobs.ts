import { randomUUID } from 'node:crypto';

export type JobStatus = 'queued' | 'running' | 'succeeded' | 'failed';

export interface JobStep {
  name: string;
  status: 'pending' | 'running' | 'succeeded' | 'failed';
  startedAt?: number;
  finishedAt?: number;
  detail?: string;
  error?: string;
}

export interface Job {
  id: string;
  status: JobStatus;
  tenantSlug: string;
  createdAt: number;
  steps: JobStep[];
  output: Record<string, unknown>;
  error?: string;
}

const jobs = new Map<string, Job>();

export function createJob(tenantSlug: string, stepNames: string[]): Job {
  const job: Job = {
    id: randomUUID(),
    status: 'queued',
    tenantSlug,
    createdAt: Date.now(),
    steps: stepNames.map((name) => ({ name, status: 'pending' })),
    output: {},
  };
  jobs.set(job.id, job);
  return job;
}

export function getJob(id: string): Job | undefined {
  return jobs.get(id);
}

export function listJobs(): Job[] {
  return Array.from(jobs.values()).sort((a, b) => b.createdAt - a.createdAt);
}

export function startJob(id: string): void {
  const j = jobs.get(id);
  if (j) j.status = 'running';
}

export function setStep(
  id: string,
  name: string,
  patch: Partial<JobStep>,
): void {
  const j = jobs.get(id);
  if (!j) return;
  const s = j.steps.find((x) => x.name === name);
  if (s) Object.assign(s, patch);
}

export function failJob(id: string, error: string): void {
  const j = jobs.get(id);
  if (!j) return;
  j.status = 'failed';
  j.error = error;
}

export function finishJob(id: string, output: Record<string, unknown> = {}): void {
  const j = jobs.get(id);
  if (!j) return;
  j.status = 'succeeded';
  j.output = { ...j.output, ...output };
}
