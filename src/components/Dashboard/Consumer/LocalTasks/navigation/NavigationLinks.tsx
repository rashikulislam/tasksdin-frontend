import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons/lib";

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon | IconType;
  badge?: number;
  href: string;
}

interface NavigationLinksProps {
  item: NavItem;
}

export const NavigationLinks = ({ item }: NavigationLinksProps) => {
  const pathname = usePathname();

  const active = pathname === item?.href;
  return (
    <Link
      key={item?.id}
      href={item?.href || "/"}
      className={`relative flex items-center gap-4 px-4 py-2 rounded-lg transition-all duration-200 font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 ${
        active ? "bg-muted/70" : ""
      }`}
    >
      {item?.icon && <item.icon className="w-4 h-4" />}

      <span>{item?.label}</span>
      {item?.badge && item?.badge > 0 && (
        <Badge
          variant="destructive"
          className="ml-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
        >
          {item?.badge}
        </Badge>
      )}
    </Link>
  );
};
