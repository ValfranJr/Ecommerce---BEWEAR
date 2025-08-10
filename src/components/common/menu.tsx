"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { HomeIcon, PackageIcon, ShoppingBagIcon } from "lucide-react";
import { useCategories } from "@/hooks/queries/use-categories";

type MenuProps = {
  onNavigate?: () => void;
};

const Menu = ({ onNavigate }: MenuProps) => {
  const { data: categories } = useCategories();

  return (
    <div className="space-y-6 px-5 pb-8">
      <Separator className="my-2" />

      <nav className="space-y-3">
        <Link
          href="/"
          className="flex items-center gap-3 text-sm"
          onClick={onNavigate}
        >
          <HomeIcon className="size-4" />
          Início
        </Link>
        <Link
          href="/my-orders"
          className="flex items-center gap-3 text-sm"
          onClick={onNavigate}
        >
          <PackageIcon className="size-4" />
          Meus Pedidos
        </Link>
        <Link
          href="/cart/identification"
          className="flex items-center gap-3 text-sm"
          onClick={onNavigate}
        >
          <ShoppingBagIcon className="size-4" />
          Sacola
        </Link>
      </nav>

      <Separator className="my-2" />

      <div className="space-y-3">
        {categories?.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="block text-sm font-semibold"
            onClick={onNavigate}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Menu;
