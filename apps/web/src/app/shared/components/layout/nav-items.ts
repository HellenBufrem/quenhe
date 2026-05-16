export interface NavItem {
  label: string;
  path: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Início', path: '/' },
  { label: 'Grupos', path: '/grupos' },
  { label: 'Sorteio', path: '/sorteio' },
];
