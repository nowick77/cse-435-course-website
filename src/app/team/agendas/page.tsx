import Link from "next/link";

type MeetingRecord = {
    id: number;
    title: string;
    time: string;
    attendance: string[];
    absent?: string[];
    agenda?: string[];
    notes?: string;
};

const meetings: MeetingRecord[] = [
    {
        id: 1,
        title: "Meeting 1",
        time: "October 12, 2025 - 2:00 PM to 2:40 PM",
        attendance: ["Trevor", "Yigit", "Jack", "Cole"],
        absent: ["Alex"],
        agenda: [
            "Review individual and shared requirements",
            "Consolidate requirements into a single document (Jack)",
            "Review the project website status",
        ],
    },
    {
        id: 2,
        title: "Meeting 2",
        time: "October 28, 2025 - 6:00 PM to 9:30 PM",
        attendance: ["Trevor", "Yigit", "Jack", "Cole"],
        agenda: [
            "Review feedback on the SRS document",
            "Create use case diagrams",
            "Create the class diagram",
            "Update the SRS based on the received feedback",
            "Submit the revised document and open questions",
        ],
    },
    {
        id: 3,
        title: "Meeting 3",
        time: "November 3, 2025 - 6:00 PM to 10:00 PM",
        attendance: ["Trevor", "Yigit", "Jack", "Cole"],
        agenda: [
            "Complete all sequence and state diagrams",
            "Revise the domain diagram",
            "Start the prototype implementation",
        ],
    },
    {
        id: 4,
        title: "Meeting 4",
        time: "November 4, 2025 - 6:00 PM to 10:00 PM",
        attendance: ["Trevor", "Yigit", "Jack", "Cole"],
        agenda: ["Finish the prototype implementation"],
    },
    {
        id: 5,
        title: "Meeting 5",
        time: "November 11, 2025 - 6:00 PM to 10:00 PM",
        attendance: ["Trevor", "Yigit", "Jack", "Cole"],
        agenda: [
            "Split up the remaining SRS sections",
            "Complete SRS version 1",
        ],
    },
    {
        id: 6,
        title: "Meeting 6",
        time: "November 24, 2025 - 6:00 PM to 9:00 PM",
        attendance: ["Trevor", "Yigit", "Jack", "Cole"],
        notes: "",
    },
];

export default function AgendasPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-5xl mx-auto px-6 py-8">

                <div className="space-y-6">
                    {meetings.map((meeting) => (
                        <article
                            key={meeting.id}
                            className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6"
                        >
                            <div>
                                <p className="text-xs uppercase tracking-wide text-green-600 font-semibold">
                                    {meeting.title}
                                </p>
                                <h2 className="text-xl font-semibold text-slate-900 mt-1">{meeting.time}</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mt-6">
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-2">
                                        Attendance
                                    </h3>
                                    <p className="text-slate-700">{meeting.attendance.join(", ")}</p>
                                    {meeting.absent && (
                                        <p className="text-sm text-slate-500 mt-2">
                                            Absent: <span className="text-slate-600">{meeting.absent.join(", ")}</span>
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-2">
                                        Agenda & Minutes
                                    </h3>
                                    {meeting.agenda && meeting.agenda.length > 0 ? (
                                        <ul className="list-disc pl-5 text-slate-700 space-y-1">
                                            {meeting.agenda.map((item, idx) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-slate-500 italic">
                                            {meeting.notes}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
