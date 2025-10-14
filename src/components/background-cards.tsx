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
                    The automotive industry is rapidly evolving toward autonomous vehicles, but the gap between current
                    technology and fully hands-free driving remains significant. Clear requirements definition is
                    critical for developing safe, reliable systems that meet regulatory standards and user expectations.
                    This project addresses that need by establishing a detailed problem space analysis and
                    specification framework.
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
                    This project focuses on requirements engineering for a hands-free driving system. Our deliverables
                    include a complete Software Requirements Specification (SRS) document detailing functional and
                    non-functional requirements, safety constraints, and system architecture.
                    The accompanying prototype demonstrates key capabilities and validates our requirements through
                    real-world scenarios, providing stakeholders with a concrete vision of the final product.
                </p>
            </div>
        </section>
    )
}