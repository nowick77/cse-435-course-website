import Link from "next/link";

export default function Team() {
    const teamResources = [
        {
            name: 'Agendas & Minutes',
            description: 'Access all meeting agendas and minutes from team discussions',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            bgColor: 'from-blue-100 to-blue-200',
            iconColor: 'text-blue-600',
            url: '/team/agendas'
        },
        {
            name: 'Milestones',
            description: 'Track internal and required deadlines for project milestones',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
            ),
            bgColor: 'from-green-100 to-green-200',
            iconColor: 'text-green-600',
            url: '/team/milestones'
        },
        {
            name: 'Deliverables',
            description: 'Access intermediate drafts and final versions of all deliverables',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            bgColor: 'from-purple-100 to-purple-200',
            iconColor: 'text-purple-600',
            url: '/team/deliverables'
        },
        {
            name: 'Discussion Forum',
            description: 'Collaborate and communicate with team members',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
            ),
            bgColor: 'from-orange-100 to-orange-200',
            iconColor: 'text-orange-600',
            url: '/team/forum'
        },
        {
            name: 'Q&A',
            description: 'Questions and answers with customers and other resources',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            bgColor: 'from-red-100 to-red-200',
            iconColor: 'text-red-600',
            url: '/team/qa'
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Home
                </Link>

                <div className="mb-12">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Team Portal</h1>
                    <p className="text-slate-600">Local Information - Team and Instructors Only</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {teamResources.map((resource, idx) => (
                        <Link
                            key={idx}
                            href={resource.url}
                            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-green-300 transition-all flex items-center gap-4 group"
                        >
                            <div className={`w-14 h-14 bg-gradient-to-br ${resource.bgColor} rounded-xl flex items-center justify-center ${resource.iconColor} group-hover:scale-110 transition-transform`}>
                                {resource.icon}
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-slate-900 mb-1">{resource.name}</h4>
                                <p className="text-sm text-slate-500">{resource.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}