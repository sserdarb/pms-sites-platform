import { PreviewFrame } from '@/components/PreviewFrame';
import { sampleConfig, sampleContent } from '@/lib/sample-data';
import { decodePayload } from '@/lib/decode-config';

interface SearchParams {
  theme?: string;
  payload?: string;
}

export default async function PreviewPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const decoded = decodePayload(sp.payload);
  const config = decoded?.config ?? sampleConfig;
  const content = decoded?.content ?? sampleContent;

  if (sp.theme) {
    config.theme = { ...config.theme, package: sp.theme };
  }

  return <PreviewFrame initialConfig={config} initialContent={content} />;
}
