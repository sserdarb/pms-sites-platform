export interface ThemeOption {
  id: string;
  package: string;
  name: string;
  category: 'boutique' | 'resort';
  description: string;
  preview: string;
}

export const themes: ThemeOption[] = [
  {
    id: 'boutique',
    package: '@pms/theme-boutique',
    name: 'Boutique',
    category: 'boutique',
    description: 'Şehir veya butik kıyı otelleri için sade, beyaz/krem zemin tema.',
    preview: 'https://placehold.co/400x250/1a3a5c/fff?text=Boutique',
  },
  {
    id: 'resort',
    package: '@pms/theme-resort',
    name: 'Resort',
    category: 'resort',
    description: 'All-inclusive ve büyük tatil tesisleri için koyu zemin, altın vurgulu tema.',
    preview: 'https://placehold.co/400x250/0e8a9c/f4c542?text=Resort',
  },
];
