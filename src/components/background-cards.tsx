export default function Background() {
    return (
        <section className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Background</h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                    The automotive industry has been rapidly innovating autonomous vehicles, but the industry is far from
                    developing a fully hands-free driving system. Clearly defined, high quality requirements has become
                    critical for developing safe and reliable systems that function as expected. This project addresses
                    that need by defining a detailed problem space and specification framework.
                </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Description</h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                    Our project focuses on requirements engineering for a hands-free driving system. The deliverables for
                    the project include a Software Requirements Specification (SRS) detailing invariant, functional, and
                    non-functional requirements for the system; and a prototype demonstrating key features and functionality
                    of the desired system, providing stakeholders with a vision of the final product.
                </p>
            </div>
        </section>
    )
}