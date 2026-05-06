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
    private: true,
    include_all_branches: false,
  });
  return { url: res.data.html_url, cloneUrl: res.data.clone_url };
}

export async function commitTenantConfig(
  slug: string,
  files: Record<string, string>,
  commitMessage: string,
): Promise<void> {
  const gh = client();
  const owner = env.github.org;
  const repo = slug;

  const refRes = await gh.git.getRef({ owner, repo, ref: 'heads/main' });
  const baseSha = refRes.data.object.sha;

  const treeItems = await Promise.all(
    Object.entries(files).map(async ([path, content]) => {
      const blob = await gh.git.createBlob({
        owner,
        repo,
        content: Buffer.from(content).toString('base64'),
        encoding: 'base64',
      });
      return {
        path,
        mode: '100644' as const,
        type: 'blob' as const,
        sha: blob.data.sha,
      };
    }),
  );

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
