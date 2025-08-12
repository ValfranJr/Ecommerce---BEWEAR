import { getCategories } from "@/actions/get-categories";
import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { getNewlyCreatedProducts, getProducts } from "@/data/products/get";
import Image from "next/image";

const Home = async () => {
  const [products, newlyCreatedProducts, categories] = await Promise.all([
    getProducts(),
    getNewlyCreatedProducts(),
    getCategories(),
  ]);
  return (
    <>
      <Header />
      <div className="space-y-6">
        <div className="px-5">
          <Image
            src="/banner01.png"
            alt="leve uma vida com estilo"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
        <ProductList title="Mais Vendidos" products={products} />
        <div className="px-5">
          <CategorySelector categories={categories} />
        </div>

        <div className="px-5">
          <Image
            src="/banner02.png"
            alt="seja autêntico"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
        <ProductList products={newlyCreatedProducts} title="Novos Produtos" />
        <Footer />
      </div>
    </>
  );
};

export default Home;
