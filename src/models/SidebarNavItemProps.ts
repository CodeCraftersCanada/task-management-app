export interface SidebarNavItemProps {
    name: string;
    path?: string;
    icon: React.ComponentType;
    component?: React.ComponentType;
    children?: SidebarNavItemProps[]
}
