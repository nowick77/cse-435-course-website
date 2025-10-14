export default function TeamSection() {
    const teamMembers = [
        { name: 'Jack Nowicki', role: 'Project Manager and Domain Expert', photo: '/team/jackpfp.jpg', link: 'https://www.linkedin.com/in/jack-nowicki' },
        { name: 'Trevor Burkis', role: 'Project Facilitator', photo: '/team/trevorpfp.jpg', link: 'https://www.linkedin.com/in/trevorburkis/' },
        { name: 'Cole Current', role: 'Artifacts Manager', photo: '/team/colepfp.jpg', link: 'https://www.linkedin.com/in/colecurrent/' },
        { name: 'Yigit Gunduc', role: 'Security Manager', photo: '/team/yigitpfp.jpg', link: 'https://www.linkedin.com/in/gunduc/' },
    ];
    return (
        <section className="mb-16">
            <h3 className="text-3xl font-bold text-slate-900 mb-8">Our Team</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member, idx) => (
                    <a
                        key={idx}
                        href={member.link}
                        className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-green-300 transition-all group"
                    >
                        <div className="rounded-full overflow-hidden w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center text-4xl mb-4 mx-auto group-hover:scale-105 transition-transform">
                            <img
                                src={member.photo}
                                alt={member.name}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <h4 className="text-lg font-semibold text-slate-900 text-center mb-1">
                            {member.name}
                        </h4>
                        <p className="text-sm text-slate-500 text-center">{member.role}</p>
                    </a>
                ))}
            </div>
        </section>
    )
}