import type { ThemePackage } from '@pms/theme-kit';
import { meta } from './meta.js';
import { schema } from './schema.js';
import { ThemeApp } from './ThemeApp.js';

const pkg: ThemePackage = { meta, schema, ThemeApp };

export default pkg;
export { meta, schema, ThemeApp };
