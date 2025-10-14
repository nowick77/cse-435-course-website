import Header from "@/components/header";
import Hero from "@/components/hero";
import Background from "@/components/background-cards";
import TeamSection from "@/components/team-section";

export default function Resources() {
    const publicLinks = [
        { name: 'Project Description', icon: '📄', url: '/docs/project-description.pdf' },
        { name: 'SRS Document', icon: '📋', url: '/docs/srs.pdf' },
        { name: 'Prototype', icon: '🎨', url: '/prototype' },
        { name: 'Bibliography', icon: '📚', url: '/docs/bibliography.pdf' },
    ];
    return (
        <section className="mb-16">
            <h3 className="text-3xl font-bold text-slate-900 mb-8">Public Resources</h3>
            <div className="grid md:grid-cols-2 gap-6">
                {publicLinks.map((link, idx) => (
                    <a
                        key={idx}
                        href={link.url}
                        className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-green-300 transition-all flex items-center gap-4 group"
                    >
                        <div className="w-14 h-14 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                            {link.icon}
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-slate-900 mb-1">{link.name}</h4>
                            <p className="text-sm text-slate-500">View document →</p>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    )
}