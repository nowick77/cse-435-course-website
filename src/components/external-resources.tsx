export default function ExternalResources() {
    return (
        <section className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Course Information</h3>
            <div className="flex flex-wrap gap-4">
                <a
                    href="https://www.cse.msu.edu/~cse435/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                    <span>🎓</span>
                    CSE 435 Course Page
                </a>
                <a
                    href="/instructor"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium"
                >
                    <span>👨‍🏫</span>
                    Instructor Information
                </a>
            </div>
        </section>
    )
}