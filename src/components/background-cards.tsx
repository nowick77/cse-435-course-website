export default function Background() {
    return (
        <section className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
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
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
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