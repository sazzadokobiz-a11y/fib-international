import Image from 'next/image'
import Container from '../shared/Container'
import Link from 'next/link'
import { getHeroImage } from '@/services/heroImage'
export const Banner = async() => {
    const heroImage = await getHeroImage();

    const backupImage = {
        image: "/assets/hero.jpg",
        title: "Curating the World's Finest Jute and Leather.",
        subtitle: "ARTISANAL COMMERCE",
        content: "We transcend traditional traditional commerce, sourcing and delivering the world's finest jute and leather products with a commitment to quality, sustainability, and ethical practices."
    }

    return (
        <div className="relative min-h-243 flex items-center pt-20 overflow-hidden bg-primary">
            <div className="absolute inset-0 z-0">
                <Image
                    src={heroImage?.data?.image || backupImage.image}
                    width={500}
                    height={500}
                    alt="heroimg"
                    priority
                    className="w-full h-full object-cover opacity-60"
                    data-alt="Massive container ship navigating through misty ocean waters at dawn with dramatic golden light hitting the steel cargo boxes"
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/90 to-transparent"></div>
            </div>

            <div className="relative z-10 w-full max-w-360 mx-auto px-8 md:px-16 lg:px-24">
                <Container>
                    <span className="text-secondary font-bold">{heroImage?.data?.subtitle || backupImage.subtitle}</span>
                    <h1 className="text-[#fcf9f4] font-headline text-4xl md:text-5xl lg:text-6xl leading-tight mt-4 mb-6 font-bold">
                        {heroImage?.data?.title || backupImage.title}
                    </h1>
                    <p className="text-secondary font-bold text-xl leading-[1.6] mb-12 max-w-lg">
                        {heroImage?.data?.content || backupImage?.content}
                    </p>
                    <Link href={`/export`} className="text-[#fcf9f4] p-3 bg-primary rounded-md hover:scale- hover:bg-primary/50 transition transform duration-300">View Collection</Link>
                </Container>

            </div>
        </div>
    )
}
