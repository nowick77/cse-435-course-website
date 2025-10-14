'use client'
import { useState } from 'react';

export default function ProjectWebsite() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const teamMembers = [
        { name: 'Team Member 1', role: 'Project Lead', photo: '👤', link: '/member1' },
        { name: 'Team Member 2', role: 'Developer', photo: '👤', link: '/member2' },
        { name: 'Team Member 3', role: 'Designer', photo: '👤', link: '/member3' },
        { name: 'Team Member 4', role: 'Developer', photo: '👤', link: '/member4' },
    ];

    const publicLinks = [
        { name: 'Project Description', icon: '📄', url: '/docs/project-description.pdf' },
        { name: 'SRS Document', icon: '📋', url: '/docs/srs.pdf' },
        { name: 'Prototype', icon: '🎨', url: '/prototype' },
        { name: 'Bibliography', icon: '📚', url: '/docs/bibliography.pdf' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header */}
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
                    <button
                        onClick={() => setIsAuthenticated(!isAuthenticated)}
                        className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium"
                    >
                        {isAuthenticated ? 'Sign Out' : 'Team Login'}
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* Hero Section */}
                <section className="mb-16">
                    <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-12 text-white shadow-xl">
                        <h2 className="text-4xl font-bold mb-4">Project Name</h2>
                        <p className="text-green-50 text-lg max-w-3xl">
                            A brief, compelling description of what this project aims to accomplish and why it matters.
                        </p>
                    </div>
                </section>

                {/* Background & Description */}
                <section className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">🎯</span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900">Background</h3>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            Provide context about the problem space, industry needs, or research area this project addresses.
                            Explain why this project was initiated and what gap it fills.
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
                            Detail the core functionality and features of the project. Describe what the system does,
                            who the users are, and what value it provides to stakeholders.
                        </p>
                    </div>
                </section>

                {/* Team Composition */}
                <section className="mb-16">
                    <h3 className="text-3xl font-bold text-slate-900 mb-8">Our Team</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teamMembers.map((member, idx) => (
                            <a
                                key={idx}
                                href={member.link}
                                className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-green-300 transition-all group"
                            >
                                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center text-4xl mb-4 mx-auto group-hover:scale-105 transition-transform">
                                    {member.photo}
                                </div>
                                <h4 className="text-lg font-semibold text-slate-900 text-center mb-1">
                                    {member.name}
                                </h4>
                                <p className="text-sm text-slate-500 text-center">{member.role}</p>
                            </a>
                        ))}
                    </div>
                </section>

                {/* Public Resources */}
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

                {/* Team Portal (Authenticated) */}
                {isAuthenticated && (
                    <section className="mb-16">
                        <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-amber-500 rounded-xl p-6 mb-6">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">🔒</span>
                                <div>
                                    <h3 className="text-xl font-bold text-amber-900">Team Portal</h3>
                                    <p className="text-amber-700 text-sm">Access restricted to team members and instructors</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <a href="/portal/meetings" className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-amber-300 transition-all">
                                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-2xl mb-4">
                                    📅
                                </div>
                                <h4 className="text-lg font-semibold text-slate-900 mb-2">Meeting Notes</h4>
                                <p className="text-sm text-slate-600">Agendas and minutes from all team meetings</p>
                            </a>

                            <a href="/portal/milestones" className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-amber-300 transition-all">
                                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-2xl mb-4">
                                    🎯
                                </div>
                                <h4 className="text-lg font-semibold text-slate-900 mb-2">Milestones</h4>
                                <p className="text-sm text-slate-600">Track deadlines and project progress</p>
                            </a>

                            <a href="/portal/drafts" className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-amber-300 transition-all">
                                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-2xl mb-4">
                                    📝
                                </div>
                                <h4 className="text-lg font-semibold text-slate-900 mb-2">Draft Documents</h4>
                                <p className="text-sm text-slate-600">Access working versions of deliverables</p>
                            </a>

                            <a href="/portal/forum" className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-amber-300 transition-all">
                                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-2xl mb-4">
                                    💬
                                </div>
                                <h4 className="text-lg font-semibold text-slate-900 mb-2">Discussion Forum</h4>
                                <p className="text-sm text-slate-600">Team communication and collaboration</p>
                            </a>

                            <a href="/portal/qa" className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-amber-300 transition-all">
                                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-2xl mb-4">
                                    ❓
                                </div>
                                <h4 className="text-lg font-semibold text-slate-900 mb-2">Q&A Archive</h4>
                                <p className="text-sm text-slate-600">Questions and answers with stakeholders</p>
                            </a>

                            <a href="/portal/resources" className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-amber-300 transition-all">
                                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-2xl mb-4">
                                    📦
                                </div>
                                <h4 className="text-lg font-semibold text-slate-900 mb-2">Team Resources</h4>
                                <p className="text-sm text-slate-600">Shared files and internal documentation</p>
                            </a>
                        </div>
                    </section>
                )}

                {/* Course Links */}
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
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-400 py-8 mt-16">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-sm">
                        CSE 435 - Software Engineering | Michigan State University
                    </p>
                    <p className="text-xs mt-2 text-slate-500">
                        © {new Date().getFullYear()} Project Team. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}