export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-400 py-8 mt-16">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <p className="text-sm">
                    CSE 435 - Software Engineering | Michigan State University
                </p>
                <p className="text-xs mt-2 text-slate-500">
                    Updated {new Date().getFullYear()}
                </p>
            </div>
        </footer>
    )
}