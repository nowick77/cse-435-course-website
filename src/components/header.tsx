export default function Header() {
    return (
        <header className="bg-white shadow-sm border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center text-white font-bold">
                        CSE
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">CSE 435 Project</h1>
                        <p className="text-sm text-slate-500">Software Engineering</p>
                    </div>
                </div>
            </div>
        </header>
    )
}