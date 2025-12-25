import { Phone, MapPin } from 'lucide-react';
import { SiInstagram, SiLinkedin, SiWhatsapp } from 'react-icons/si';

// Ultra-lightweight static footer
// No Framer Motion, no heavy effects, just pure HTML/CSS layout
export function Footer() {
    return (
        <footer className="bg-black border-t border-blue-900/20" data-testid="section-footer">
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
                <div className="grid md:grid-cols-4 gap-10 md:gap-12 mb-12">

                    {/* Brand Column */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="text-2xl font-bold text-white font-display tracking-tight">
                            <span className="text-blue-500">Clip</span>Code
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            Estrategia digital y desarrollo web de alto rendimiento.
                            Creamos soluciones ultrarrápidas diseñadas para posicionar
                            tu negocio como líder del sector.
                        </p>

                        <div className="flex gap-3 pt-2">
                            <SocialLink href="https://www.instagram.com/clip.code.studio/" label="Instagram" icon={SiInstagram} />
                            <SocialLink href="https://www.linkedin.com/in/clipcode/" label="LinkedIn" icon={SiLinkedin} />
                            <SocialLink href="https://wa.me/34607328443" label="WhatsApp" icon={SiWhatsapp} />
                        </div>
                    </div>

                    {/* Links Column */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider text-blue-500/80">Navegación</h4>
                        <ul className="space-y-2.5">
                            <FooterLink href="#section-about-us">Nosotros</FooterLink>
                            <FooterLink href="#section-services">Servicios</FooterLink>
                            <FooterLink href="#planes">Planes</FooterLink>
                            <FooterLink href="#section-gallery">Portfolio</FooterLink>
                            <FooterLink href="#contact">Contacto</FooterLink>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider text-blue-500/80">Contacto</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-gray-400 text-sm hover:text-white transition-colors">
                                <Phone className="w-4 h-4 text-blue-500" />
                                <span>+34 607 328 443</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm hover:text-white transition-colors">
                                <MapPin className="w-4 h-4 text-blue-500" />
                                <span>España</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-blue-900/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
                    <p>
                        © {new Date().getFullYear()} ClipCode. Todos los derechos reservados.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-gray-400 transition-colors">Privacidad</a>
                        <a href="#" className="hover:text-gray-400 transition-colors">Términos</a>
                        <a href="#" className="hover:text-gray-400 transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

// Helper components for consistency and cleaner code
function SocialLink({ href, label, icon: Icon }: { href: string, label: string, icon: any }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-lg bg-blue-950/20 border border-blue-500/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-900/40 hover:border-blue-500/30 transition-all duration-200"
            aria-label={label}
        >
            <Icon className="w-4 h-4" />
        </a>
    );
}

function FooterLink({ href, children }: { href: string, children: React.ReactNode }) {
    return (
        <li>
            <a href={href} className="text-gray-400 text-sm hover:text-blue-400 transition-colors block py-0.5">
                {children}
            </a>
        </li>
    );
}
