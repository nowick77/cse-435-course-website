'use client'
import Hero from "@/components/hero";
import Background from "@/components/background-cards";
import TeamSection from "@/components/team-section";
import Resources from "@/components/resources";
import ExternalResources from "@/components/external-resources";

export default function ProjectWebsite() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <Hero />
            <Background />
            <TeamSection />
            <Resources />
            <ExternalResources />
        </div>
    );
}