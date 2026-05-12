import Container from '@/components/shared/Container'
import ImportProductCard from '@/components/cards/ImportProductCard'
import { getImportProducts } from '@/services/product'
import Link from 'next/link'

const ImportProductsSection = async () => {
  const { data: productsData } = await getImportProducts({ limit: 4 });
  const products = productsData.data;

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-32 bg-gradient-to-b from-[#f5f0e6] to-white">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="block text-secondary tracking-[0.05em] uppercase text-sm font-bold mb-4 font-label">
              Inbound Logistics
            </span>
            <h2 className="text-primary font-headline font-semibold text-4xl md:text-[2.5rem] leading-[1.2] tracking-tight">
              Premium Import Products
            </h2>
          </div>
          <Link
            href="/import"
            className="flex items-center gap-2 text-primary font-medium hover:text-secondary transition-colors duration-300 group"
          >
            View All Imports
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="transition-transform duration-500 hover:-translate-y-2"
            >
              <ImportProductCard product={product} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default ImportProductsSection
