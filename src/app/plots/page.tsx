import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingMobileBar } from '@/components/layout/FloatingMobileBar';
import { PlotDiscoveryView } from '@/components/plots/PlotDiscoveryView';
import { searchPlotsSmart } from '@/services/plots.service';

export const metadata: Metadata = {
  title: 'Find Your Dream Plot | Swarna Bhoomi Residential Township',
  description:
    'Search and match available residential plots at Swarna Bhoomi, Krishnapuram, Thiruvallur. Filter by size, budget, facing, and corner preferences with verified real inventory.',
};

export const dynamic = 'force-dynamic';

export default async function PlotsDiscoveryPage() {
  // Preload initial 5 available plots for instant server-rendered load
  const initialData = await searchPlotsSmart({
    page: 1,
    limit: 5,
    availability: 'Available',
    sortBy: 'price_asc',
  });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-brand-cream text-brand-dark pt-28 sm:pt-32 px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <PlotDiscoveryView
            initialPlots={initialData.plots}
            initialTotalMatches={initialData.totalMatches}
            initialTotalInventory={initialData.totalInventory}
          />
        </div>
      </main>
      <Footer />
      <FloatingMobileBar />
    </>
  );
}

