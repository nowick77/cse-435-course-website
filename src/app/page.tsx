'use client'
import { useState } from 'react';
import Header from "@/components/header";
import Hero from "@/components/hero";
import Background from "@/components/background-cards";
import TeamSection from "@/components/team-section";
import Resources from "@/components/resources";
import ExternalResources from "@/components/external-resources";
import Footer from "@/components/footer";

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