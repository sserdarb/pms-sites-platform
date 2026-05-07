import { Octokit } from '@octokit/rest';
import { env } from '../env.js';

let octo: Octokit | null = null;

function client(): Octokit {
  if (!env.github.token) {
    throw new Error('GITHUB_TOKEN env required for provisioning');
  }
  if (!octo) octo = new Octokit({ auth: env.github.token });
  return octo;
}

export async function createTenantRepo(slug: string, description: string): Promise<{ url: string; cloneUrl: string }> {
  const gh = client();
  const res = await gh.repos.createUsingTemplate({
    template_owner: env.github.templateOwner,
    template_repo: env.github.templateRepo,
    owner: env.github.org,
    name: slug,
    description,
    // Public so Coolify can clone via /applications/public (no SSH key / GitHub App needed for MVP)
    private: false,
    include_all_branches: false,
  });
  return { url: res.data.html_url, cloneUrl: res.data.clone_url };
}

async function waitForRepoReady(slug: string, maxAttempts = 15, delayMs = 2000): Promise<string> {
  const gh = client();
  let lastErr: unknown;
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const ref = await gh.git.getRef({ owner: env.github.org, repo: slug, ref: 'heads/main' });
      return ref.data.object.sha;
    } catch (e: unknown) {
      lastErr = e;
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  throw lastErr ?? new Error(`Repo ${slug} not ready after ${maxAttempts} attempts`);
}

export async function commitTenantConfig(
  slug: string,
  files: Record<string, string>,
  commitMessage: string,
): Promise<void> {
  const gh = client();
  const owner = env.github.org;
  const repo = slug;

  const baseSha = await waitForRepoReady(slug);

  const entries = Object.entries(files);
  const treeItems: Array<{ path: string; mode: '100644'; type: 'blob'; sha: string }> = [];
  const CHUNK = 10;
  for (let i = 0; i < entries.length; i += CHUNK) {
    const chunk = entries.slice(i, i + CHUNK);
    const blobs = await Promise.all(
      chunk.map(async ([path, content]) => {
        const blob = await gh.git.createBlob({
          owner,
          repo,
          content: Buffer.from(content).toString('base64'),
          encoding: 'base64',
        });
        return { path, mode: '100644' as const, type: 'blob' as const, sha: blob.data.sha };
      }),
    );
    treeItems.push(...blobs);
  }

  const tree = await gh.git.createTree({
    owner,
    repo,
    base_tree: baseSha,
    tree: treeItems,
  });

  const commit = await gh.git.createCommit({
    owner,
    repo,
    message: commitMessage,
    tree: tree.data.sha,
    parents: [baseSha],
  });

  await gh.git.updateRef({
    owner,
    repo,
    ref: 'heads/main',
    sha: commit.data.sha,
  });
}
