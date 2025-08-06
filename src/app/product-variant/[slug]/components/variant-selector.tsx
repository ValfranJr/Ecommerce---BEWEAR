import { productVariantTable } from "@/db/schema";
import Link from "next/link";
import Image from "next/image";

interface VariantSelectorProps {
  selectedVariantSlug: string;
  variants: (typeof productVariantTable.$inferSelect)[];
}

const VariantSelector = ({
  variants,
  selectedVariantSlug,
}: VariantSelectorProps) => {
  return (
    <div className="flex items-center gap-4">
      {variants.map((variant) => (
        <Link
          className={
            selectedVariantSlug === variant.slug
              ? "border-primary rounded-xl border-2"
              : ""
          }
          key={variant.id}
          href={`/product-variant/${variant.slug}`}
        >
          <Image
            src={variant.imageUrl}
            alt={variant.name}
            width={68}
            height={68}
            className="h-auto w-full rounded-xl object-cover"
          />
        </Link>
      ))}
    </div>
  );
};

export default VariantSelector;
