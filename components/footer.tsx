import { Github, Twitter, Linkedin, ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { Logo } from './logo';
import Link from 'next/link';

const productLinks = [
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#how-it-works', label: 'How it Works' },
  { href: '#integrations', label: 'Integrations' },
];

const companyLinks = [
  { href: '#', label: 'About Us' },
  { href: '#', label: 'Blog' },
  { href: '#', label: 'Careers' },
  { href: '#', label: 'Press Kit' },
];

const supportLinks = [
  { href: '#', label: 'Help Center' },
  { href: '#', label: 'Contact Support' },
  { href: '#', label: 'API Documentation' },
  { href: '#', label: 'System Status' },
];

const legalLinks = [
  { href: '#', label: 'Privacy Policy' },
  { href: '#', label: 'Terms of Service' },
  { href: '#', label: 'Cookie Policy' },
  { href: '#', label: 'GDPR' },
];

const socialLinks = [
  { Icon: Github, href: 'https://github.com/bhrigu-verma', label: 'GitHub' },
  { Icon: Twitter, href: 'https://twitter.com/shareesharee73', label: 'Twitter' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/bhrigu-verma-89090a273/', label: 'LinkedIn' },
];

const contactInfo = [
  { Icon: Mail, text: 'bhriguverma11@gmail.com' },
  { Icon: Phone, text: '+91 9478335331' },
  { Icon: MapPin, text: 'INDIA' },
];

const Footer = () => {
    return ( 
        <footer className="bg-[#0D0D0D] relative overflow-hidden">
            {/* Gradient overlays for premium look */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-blue-900/10"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            {/* Decorative elements */}
            <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-tr from-pink-500/10 to-purple-500/10 rounded-full blur-xl"></div>
            
            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                {/* Main footer content */}
                <div className="pt-16 pb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Brand section */}
                        <div className="lg:col-span-4">
                            <div className="mb-6">
                                <Logo />
                            </div>
                            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-md">
                                Transform your short-form videos with AI-powered transcription. Perfect for creators on TikTok, Instagram, and YouTube Shorts.
                            </p>
                            
                            {/* Contact info */}
                            <div className="space-y-4">
                                {contactInfo.map(({ Icon, text }, index) => (
                                    <div key={index} className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-200">
                                        <Icon className="h-4 w-4" />
                                        <span className="text-sm">{text}</span>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Newsletter signup */}
                            <div className="mt-8">
                                <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
                                <div className="flex">
                                    <input 
                                        type="email" 
                                        placeholder="Enter your email"
                                        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                    <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-r-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium">
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        {/* Links sections */}
                        <div className="lg:col-span-8">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                <FooterColumn title="Product" links={productLinks} />
                                <FooterColumn title="Company" links={companyLinks} />
                                <FooterColumn title="Support" links={supportLinks} />
                                <FooterColumn title="Legal" links={legalLinks} />
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Social links section */}
                <div className="border-t border-white/10 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                        <div className="flex items-center space-x-8">
                            <h4 className="text-white font-semibold">Follow Us</h4>
                            <div className="flex space-x-4">
                                {socialLinks.map(({ Icon, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        className="group relative p-3 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                                        aria-label={label}
                                    >
                                        <Icon className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-200" />
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                                    </a>
                                ))}
                            </div>
                        </div>
                        
                        {/* Trust badges */}
                        <div className="flex items-center space-x-6 text-gray-400 text-sm">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span>99.9% Uptime</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span>SOC 2 Compliant</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <span>GDPR Ready</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Bottom section */}
                <div className="border-t border-white/10 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} SYNCSCRIPT. All rights reserved. Made with ❤️ in INDIA.
                        </p>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-400">
                            <span>Powered by AI</span>
                            <span>•</span>
                            <span>Built for Creators</span>
                            <span>•</span>
                            <span>Trusted by 10K+ users</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

interface FooterLink {
    href: string;
    label: string;
}

interface FooterColumnProps {
    title: string;
    links: FooterLink[];
}

function FooterColumn({ title, links }: FooterColumnProps) {
    return (
        <div>
            <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">
                {title}
            </h3>
            <ul className="space-y-4">
                {links.map((link) => (
                    <li key={link.label}>
                        <Link 
                            href={link.href} 
                            className="group flex items-center text-gray-400 hover:text-white transition-all duration-200 text-sm"
                        >
                            <span className="group-hover:translate-x-1 transition-transform duration-200">
                                {link.label}
                            </span>
                            <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}