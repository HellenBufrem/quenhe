export interface NavItem {
  label: string;
  path: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Início', path: '/home' },
  { label: 'Grupos', path: '/dashboard/XRT-998' },
  { label: 'Revelação', path: '/revelacao' },
];
