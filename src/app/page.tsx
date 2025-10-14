'use client'
import Hero from "@/components/hero";
import Background from "@/components/background-cards";
import TeamSection from "@/components/team-section";
import Resources from "@/components/resources";
import ExternalResources from "@/components/external-resources";

export default function ProjectWebsite() {
    return (
        <>
            <Hero />
            <Background />
            <TeamSection />
            <Resources />
            <ExternalResources />
        </>
    );
}