import { getTenantConfig, getTenantContent } from '@/lib/load-tenant';
import { loadTheme } from '@/lib/load-theme';

export const dynamic = 'force-static';
export const revalidate = 3600;

export default async function HomePage() {
  const config = getTenantConfig();
  const content = getTenantContent();
  const theme = await loadTheme(config.theme.package);
  const ThemeApp = theme.ThemeApp;
  return <ThemeApp config={config} content={content} locale={config.i18n.default} />;
}
