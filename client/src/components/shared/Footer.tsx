import Link from "next/link";
import Container from "./Container";

export default function Footer() {
    return (
        <footer className="w-full pt-16 pb-8 bg-primary dark:bg-black border-t border-slate-800 text-muted dark:text-slate-500 font-headline text-xs leading-relaxed hover:opacity-100 transition-opacity duration-300">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8">
                    {/* Contact Info */}
                    <div>
                        <h4 className="text-amber-500 font-bold tracking-widest text-lg mb-4">Contact Info</h4>
                        <p className="mb-2">Phone: <a href="tel:+8801730437306" className="hover:text-amber-400">+88-01730-437306</a></p>
                        <p className="mb-2">E-mail: <a href="mailto:rmatiur777@yahoo.com" className="hover:text-amber-400">rmatiur777@yahoo.com</a></p>
                        <p className="mb-2">Address: 50, Purana Paltan Lane (3rd Floor), Dhaka</p>
                        <p className="mb-2">Website: <a href="https://www.fib-bd.com" target="_blank" rel="noreferrer" className="hover:text-amber-400">www.fib-bd.com</a></p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                        <div className="flex flex-col gap-3">
                            <Link className="text-muted hover:text-amber-400 transition-colors" href={`/import`}>Shop</Link>
                            <Link className="text-muted hover:text-amber-400 transition-colors" href={`/about`}>About Us</Link>
                            <Link className="text-muted hover:text-amber-400 transition-colors" href={`/contact`}>Contact Us</Link>
                        </div>
                    </div>

                    {/* Information */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Information</h4>
                        <div className="flex flex-col gap-3">
                            <Link className="text-muted hover:text-amber-400 transition-colors" href={`/footer/privacy-policy`}>Privacy Policy</Link>
                            <Link className="text-muted hover:text-amber-400 transition-colors" href={`/footer/term-service`}>Return Policy</Link>
                            <Link className="text-muted hover:text-amber-400 transition-colors" href={`/footer/compilence`}>Terms & Condition</Link>
                        </div>
                    </div>

                    {/* Map & Office Locations (replaces Social Media) */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Office Locations</h4>
                        <div className="mb-3 h-28 w-full overflow-hidden rounded">
                            <iframe
                                title="Dhaka Office Map"
                                src="https://www.google.com/maps?q=50%20Purana%20Paltan%20Lane%2C%20Dhaka&output=embed"
                                className="w-full h-full border-0"
                                loading="lazy"
                            ></iframe>
                        </div>
                        <p className="mb-1"><strong>Dhaka Office:</strong> 50, Purana Paltan Lane (2nd Floor), Paltan, Dhaka-1000, Bangladesh</p>
                        <p className="mb-1"><strong>USA Office:</strong> 7661 Stage Rd, Buena Park, CA 90621 — +1-562-274-5662</p>
                        <p className="mb-1"><strong>Warehouse:</strong> 464/2 West Shewrapara, Mirpur, Dhaka-1216 — +880-1868355555</p>
                    </div>
                </div>
            </Container>

            <div className="mt-8 border-t border-slate-800 bg-slate-900 text-muted">
                <Container>
                    <div className="flex items-center justify-between py-4 text-sm">
                        <div></div>
                        <div>Copyright © {new Date().getFullYear()} Family JV International Business Ltd. All Rights Reserved.</div>
                        <div>Developed by <a className="underline hover:text-amber-400" href="https://okobiz.com" target="_blank" rel="noreferrer">okobiz</a></div>
                    </div>
                </Container>
            </div>

        </footer>
    );
}