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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <Header />
            <main className="max-w-7xl mx-auto px-6 py-12">
                <Hero />
                <Background />
                <TeamSection />
                <Resources />
                <ExternalResources />
            </main>
            <Footer />
        </div>
    );
}