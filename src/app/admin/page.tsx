'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plot, PlotAvailability, FacingDirection, Enquiry } from '@/types/plot';
import {
  getStoredPlots,
  addPlot,
  updatePlot,
  deletePlot,
  resetPlotsToSeed,
  importPlotsFromCSV,
  ImportResult,
} from '@/services/plots.service';
import { getStoredEnquiries } from '@/services/enquiries.service';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { formatINR } from '@/lib/formatters';
import {
  ShieldAlert,
  ShieldCheck,
  Plus,
  Trash2,
  Edit,
  Download,
  Upload,
  Search,
  Filter,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  FileText,
  Lock,
  LogOut,
  Users,
  Layers,
  ArrowLeft,
  X,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export default function AdminPage() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  // Active view tab
  const [activeTab, setActiveTab] = useState<'inventory' | 'import' | 'enquiries'>('inventory');

  // Plots data state
  const [plots, setPlots] = useState<Plot[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterPhase, setFilterPhase] = useState<number | 'All'>('All');
  const [filterAvailability, setFilterAvailability] = useState<PlotAvailability | 'All'>('All');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editingPlot, setEditingPlot] = useState<Plot | null>(null);
  const [actionError, setActionError] = useState<string>('');
  const [actionSuccess, setActionSuccess] = useState<string>('');

  // Form state for add / edit
  const [formPlotNumber, setFormPlotNumber] = useState<string>('');
  const [formPhaseNumber, setFormPhaseNumber] = useState<number>(1);
  const [formAreaSqft, setFormAreaSqft] = useState<string>('');
  const [formFacing, setFormFacing] = useState<FacingDirection>('East');
  const [formWidth, setFormWidth] = useState<string>('');
  const [formLength, setFormLength] = useState<string>('');
  const [formPrice, setFormPrice] = useState<string>('');
  const [formIsCorner, setFormIsCorner] = useState<boolean>(false);
  const [formRoadWidth, setFormRoadWidth] = useState<string>('30');
  const [formCornerPosition, setFormCornerPosition] = useState<string>('');
  const [formDescription, setFormDescription] = useState<string>('');
  const [formAvailability, setFormAvailability] = useState<PlotAvailability>('Available');
  const [formNotes, setFormNotes] = useState<string>('');

  // CSV Import state
  const [csvText, setCsvText] = useState<string>('');
  const [importSummary, setImportSummary] = useState<ImportResult | null>(null);

  // Enquiries list
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  // Load data on mount & refresh
  const refreshData = () => {
    setPlots(getStoredPlots());
    setEnquiries(getStoredEnquiries());
  };

  useEffect(() => {
    const authSession = sessionStorage.getItem('swarna_bhoomi_admin_auth');
    if (authSession === 'true') {
      setIsAuthenticated(true);
    }
    refreshData();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'swarna@admin2026' || passwordInput === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('swarna_bhoomi_admin_auth', 'true');
      setLoginError('');
      refreshData();
    } else {
      setLoginError('Invalid administrator passcode. (Default demo pass: admin or swarna@admin2026)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('swarna_bhoomi_admin_auth');
  };

  // Open Edit Modal
  const openEditModal = (plot: Plot) => {
    setEditingPlot(plot);
    setFormPlotNumber(plot.plotNumber);
    setFormPhaseNumber(plot.phaseNumber);
    setFormAreaSqft(plot.areaSqft.toString());
    setFormFacing(plot.facing || 'East');
    setFormWidth(plot.widthFeet ? plot.widthFeet.toString() : '');
    setFormLength(plot.lengthFeet ? plot.lengthFeet.toString() : '');
    setFormPrice(plot.price ? plot.price.toString() : '');
    setFormIsCorner(Boolean(plot.isCorner));
    setFormRoadWidth(plot.roadWidthFeet ? plot.roadWidthFeet.toString() : '30');
    setFormCornerPosition(plot.cornerPosition || '');
    setFormDescription(plot.description || '');
    setFormAvailability(plot.availability);
    setFormNotes(plot.notes || '');
    setActionError('');
  };

  // Open Add Modal
  const openAddModal = () => {
    setEditingPlot(null);
    setFormPlotNumber('');
    setFormPhaseNumber(1);
    setFormAreaSqft('');
    setFormFacing('East');
    setFormWidth('20');
    setFormLength('35');
    setFormPrice('');
    setFormIsCorner(false);
    setFormRoadWidth('30');
    setFormCornerPosition('');
    setFormDescription('');
    setFormAvailability('Available');
    setFormNotes('');
    setActionError('');
    setIsAddModalOpen(true);
  };

  // Auto calculate price helper
  const handleAutoCalcPrice = () => {
    const area = parseFloat(formAreaSqft);
    if (!isNaN(area) && area > 0) {
      const rate = formIsCorner ? 1200 : 1150;
      setFormPrice(Math.round(area * rate).toString());
    }
  };

  // Save Add or Edit
  const handleSavePlot = (e: React.FormEvent) => {
    e.preventDefault();
    setActionError('');

    const area = parseFloat(formAreaSqft);
    if (isNaN(area) || area <= 0) {
      setActionError('Plot area must be a valid positive number.');
      return;
    }

    const width = formWidth ? parseFloat(formWidth) : null;
    const length = formLength ? parseFloat(formLength) : null;
    const price = formPrice ? parseFloat(formPrice) : Math.round(area * (formIsCorner ? 1200 : 1150));
    const roadWidth = formRoadWidth ? parseFloat(formRoadWidth) : 30;

    if (editingPlot) {
      const res = updatePlot(editingPlot.id, {
        plotNumber: formPlotNumber.trim(),
        phaseNumber: formPhaseNumber,
        phaseName: `Phase ${formPhaseNumber}`,
        areaSqft: area,
        facing: formFacing,
        widthFeet: width,
        lengthFeet: length,
        price,
        isCorner: formIsCorner,
        roadWidthFeet: roadWidth,
        cornerPosition: formCornerPosition.trim() || null,
        description: formDescription.trim() || null,
        availability: formAvailability,
        notes: formNotes,
      });

      if (!res.success) {
        setActionError(res.error || 'Failed to update plot.');
        return;
      }
      setActionSuccess(`Plot #${formPlotNumber} updated successfully.`);
      setEditingPlot(null);
    } else {
      const res = addPlot({
        projectId: 'proj-swarna-bhoomi',
        phaseId: `phase-${formPhaseNumber}`,
        phaseNumber: formPhaseNumber,
        phaseName: `Phase ${formPhaseNumber}`,
        plotNumber: formPlotNumber.trim(),
        areaSqft: area,
        facing: formFacing,
        widthFeet: width,
        lengthFeet: length,
        price,
        isCorner: formIsCorner,
        roadWidthFeet: roadWidth,
        cornerPosition: formCornerPosition.trim() || null,
        description: formDescription.trim() || null,
        availability: formAvailability,
        notes: formNotes,
        layoutX: 100 + (plots.length % 12) * 60,
        layoutY: 100 + Math.floor(plots.length / 12) * 60,
        layoutWidth: 50,
        layoutHeight: 40,
      });

      if (!res.success) {
        setActionError(res.error || 'Failed to add plot.');
        return;
      }
      setActionSuccess(`Plot #${formPlotNumber} added to Phase ${formPhaseNumber}.`);
      setIsAddModalOpen(false);
    }

    refreshData();
  };

  // Delete Plot
  const handleDeletePlot = (plot: Plot) => {
    if (window.confirm(`Are you sure you want to delete Plot #${plot.plotNumber} from Phase ${plot.phaseNumber}?`)) {
      const res = deletePlot(plot.id);
      if (res.success) {
        setActionSuccess(`Plot #${plot.plotNumber} deleted.`);
        refreshData();
      } else {
        setActionError(res.error || 'Failed to delete.');
      }
    }
  };

  // Quick toggle availability directly from table
  const handleToggleStatus = (plot: Plot, newStatus: PlotAvailability) => {
    updatePlot(plot.id, { availability: newStatus });
    refreshData();
  };

  // CSV Import handler
  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setImportSummary(null);
    if (!csvText.trim()) return;

    const res = importPlotsFromCSV(csvText);
    setImportSummary(res);
    refreshData();
    if (res.importedCount > 0) {
      setActionSuccess(`Successfully imported ${res.importedCount} new plot records.`);
    }
  };

  // Export CSV download
  const handleExportCSV = () => {
    const current = getStoredPlots();
    const headers = 'plot_number,phase,area_sqft,facing,width_ft,length_ft,price_inr,is_corner,status,notes\n';
    const rows = current
      .map(
        (p) =>
          `${p.plotNumber},${p.phaseNumber},${p.areaSqft},${p.facing || ''},${p.widthFeet || ''},${p.lengthFeet || ''},${p.price || ''},${p.isCorner ? 'true' : 'false'},${p.availability},"${p.notes || ''}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `swarna_bhoomi_plots_export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  // Filtered plots
  const filteredPlots = plots.filter((p) => {
    if (filterPhase !== 'All' && p.phaseNumber !== filterPhase) return false;
    if (filterAvailability !== 'All' && p.availability !== filterAvailability) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchNum = p.plotNumber.toLowerCase().includes(q);
      const matchArea = p.areaSqft.toString().includes(q);
      const matchFacing = p.facing?.toLowerCase().includes(q);
      if (!matchNum && !matchArea && !matchFacing) return false;
    }
    return true;
  });

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-brand-cream px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-brand-border bg-white p-8 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
              <Lock className="h-6 w-6 text-brand-gold-dark" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-brand-green">
              Swarna Bhoomi Admin
            </h1>
            <p className="text-xs text-brand-dark-muted">
              Inventory management and lead administration console
            </p>
          </div>

          {loginError && (
            <div className="rounded-lg bg-red-50 p-3 text-xs font-semibold text-red-700 border border-red-200">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="admin-pass" className="block text-xs font-bold uppercase tracking-wider text-brand-dark">
                Admin Passcode
              </label>
              <input
                id="admin-pass"
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter passcode (admin)"
                className="w-full rounded-xl border border-brand-border px-3.5 py-2.5 text-sm focus:border-brand-gold focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-brand-green py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-brand-green-surface transition-colors cursor-pointer"
            >
              Sign In to Admin
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-brand-border/60 text-center">
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-brand-dark-muted hover:text-brand-green">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Public Website</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand-cream pb-16">
      {/* Admin Top Header */}
      <header className="border-b border-brand-border bg-white sticky top-0 z-30 shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-brand-dark-muted hover:text-brand-dark">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="font-serif text-lg font-bold text-brand-green sm:text-xl">
                Swarna Bhoomi — Admin Console
              </h1>
              <div className="flex items-center gap-2 text-xs text-brand-dark-muted">
                <span>Database Sync:</span>
                <span
                  className={`inline-flex items-center gap-1 font-medium ${
                    isSupabaseConfigured ? 'text-emerald-700' : 'text-amber-700'
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${isSupabaseConfigured ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  {isSupabaseConfigured ? 'Connected to Supabase PostgreSQL' : 'Local Storage Mode'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/plots"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-brand-green/30 bg-brand-green/5 px-3 py-1.5 text-xs font-semibold text-brand-green hover:bg-brand-green/15 transition-colors"
            >
              <span>View Public Discovery (/plots)</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-lg border border-brand-border px-3 py-1.5 text-xs font-semibold text-brand-dark hover:bg-brand-cream-surface transition-colors cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5 text-brand-dark-muted" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex gap-6 text-xs font-semibold uppercase tracking-wider border-t border-brand-border/40">
          <button
            type="button"
            onClick={() => setActiveTab('inventory')}
            className={`py-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'inventory'
                ? 'border-brand-green text-brand-green'
                : 'border-transparent text-brand-dark-muted hover:text-brand-dark'
            }`}
          >
            Plot Inventory ({plots.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('import')}
            className={`py-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'import'
                ? 'border-brand-green text-brand-green'
                : 'border-transparent text-brand-dark-muted hover:text-brand-dark'
            }`}
          >
            Data Import &amp; Export
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('enquiries')}
            className={`py-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'enquiries'
                ? 'border-brand-green text-brand-green'
                : 'border-transparent text-brand-dark-muted hover:text-brand-dark'
            }`}
          >
            Enquiries Received ({enquiries.length})
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Success / Error Alerts */}
        {actionSuccess && (
          <div className="mb-4 flex items-center justify-between rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-semibold text-emerald-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>{actionSuccess}</span>
            </div>
            <button type="button" onClick={() => setActionSuccess('')} className="cursor-pointer">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        {actionError && (
          <div className="mb-4 flex items-center justify-between rounded-xl bg-red-50 border border-red-200 p-4 text-xs font-semibold text-red-800">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span>{actionError}</span>
            </div>
            <button type="button" onClick={() => setActionError('')} className="cursor-pointer">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* TAB 1: PLOT INVENTORY */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-brand-border bg-white p-4 shadow-xs">
              <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative w-64">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search plot # or area..."
                    className="w-full rounded-lg border border-brand-border bg-brand-cream-surface/40 px-3 py-1.5 pl-8 text-xs focus:border-brand-gold focus:outline-hidden"
                  />
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-brand-dark-muted" />
                </div>

                {/* Filter Phase */}
                <select
                  value={filterPhase}
                  onChange={(e) =>
                    setFilterPhase(e.target.value === 'All' ? 'All' : parseInt(e.target.value, 10))
                  }
                  className="rounded-lg border border-brand-border bg-brand-cream-surface/40 px-3 py-1.5 text-xs font-medium text-brand-dark focus:border-brand-gold focus:outline-hidden"
                >
                  <option value="All">All Phases</option>
                  <option value={1}>Phase 1</option>
                  <option value={2}>Phase 2</option>
                  <option value={3}>Phase 3</option>
                </select>

                {/* Filter Status */}
                <select
                  value={filterAvailability}
                  onChange={(e) => setFilterAvailability(e.target.value as any)}
                  className="rounded-lg border border-brand-border bg-brand-cream-surface/40 px-3 py-1.5 text-xs font-medium text-brand-dark focus:border-brand-gold focus:outline-hidden"
                >
                  <option value="All">All Statuses</option>
                  <option value="Available">Available</option>
                  <option value="Reserved">Reserved</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset all plots back to audited seed data? Local changes will be replaced.')) {
                      resetPlotsToSeed();
                      refreshData();
                      setActionSuccess('Plots reset to initial audited seed.');
                    }
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-brand-border px-3 py-1.5 text-xs font-medium text-brand-dark-muted hover:text-brand-dark cursor-pointer"
                  title="Reset to audited seed"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset to Seed</span>
                </button>

                <button
                  type="button"
                  onClick={openAddModal}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-brand-green px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-brand-green-surface transition-colors cursor-pointer"
                >
                  <Plus className="h-4 w-4 text-brand-gold" />
                  <span>Add New Plot</span>
                </button>
              </div>
            </div>

            {/* Inventory Table */}
            <div className="overflow-hidden rounded-xl border border-brand-border bg-white shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-brand-border bg-brand-cream-surface/70 text-brand-dark font-semibold">
                      <th className="p-3">Plot #</th>
                      <th className="p-3">Phase</th>
                      <th className="p-3">Area</th>
                      <th className="p-3">Price (₹)</th>
                      <th className="p-3">Facing</th>
                      <th className="p-3">Dimensions</th>
                      <th className="p-3">Corner / Road</th>
                      <th className="p-3">Availability</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPlots.map((plot) => (
                      <tr
                        key={plot.id}
                        className="border-b border-brand-border/40 hover:bg-brand-cream/40 transition-colors"
                      >
                        <td className="p-3 font-bold text-brand-green">
                          <Link href={`/plots/${plot.id}`} className="hover:underline">
                            #{plot.plotNumber}
                          </Link>
                        </td>
                        <td className="p-3">{plot.phaseName}</td>
                        <td className="p-3 font-semibold">{plot.areaSqft} sq.ft.</td>
                        <td className="p-3 font-bold text-brand-green">
                          {formatINR(plot.price)}
                        </td>
                        <td className="p-3">{plot.facing || 'East'}</td>
                        <td className="p-3">
                          {plot.widthFeet && plot.lengthFeet
                            ? `${plot.widthFeet}' × ${plot.lengthFeet}'`
                            : '—'}
                        </td>
                        <td className="p-3">
                          {plot.isCorner ? (
                            <span className="inline-flex items-center gap-1 rounded bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-800 border border-amber-200">
                              <Sparkles className="h-2.5 w-2.5 text-amber-600" />
                              Corner ({plot.roadWidthFeet || 40}ft)
                            </span>
                          ) : (
                            <span className="text-brand-dark-muted">
                              Regular ({plot.roadWidthFeet || 30}ft)
                            </span>
                          )}
                        </td>
                        <td className="p-3">
                          <select
                            value={plot.availability}
                            onChange={(e) =>
                              handleToggleStatus(plot, e.target.value as PlotAvailability)
                            }
                            className={`rounded px-2 py-0.5 text-xs font-semibold border cursor-pointer ${
                              plot.availability === 'Available'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : plot.availability === 'Reserved'
                                ? 'bg-amber-50 text-amber-800 border-amber-300'
                                : 'bg-slate-100 text-slate-700 border-slate-300'
                            }`}
                          >
                            <option value="Available">Available</option>
                            <option value="Reserved">Reserved</option>
                            <option value="Sold">Sold</option>
                          </select>
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <Link
                            href={`/plots/${plot.id}`}
                            className="p-1 text-brand-dark-muted hover:text-brand-green inline-block"
                            title="View Public Details"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => openEditModal(plot)}
                            className="p-1 text-brand-dark-muted hover:text-brand-green cursor-pointer"
                            title="Edit Plot"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeletePlot(plot)}
                            className="p-1 text-brand-dark-muted hover:text-red-700 cursor-pointer"
                            title="Delete Plot"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DATA IMPORT & EXPORT */}
        {activeTab === 'import' && (
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8 space-y-6">
              <div className="rounded-xl border border-brand-border bg-white p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-brand-green">
                      CSV Plot Batch Import
                    </h3>
                    <p className="text-xs text-brand-dark-muted">
                      Paste CSV rows with headers: plot, phase, area, facing, price, status
                    </p>
                  </div>
                  <Upload className="h-5 w-5 text-brand-gold-dark" />
                </div>

                <form onSubmit={handleImportSubmit} className="space-y-4">
                  <textarea
                    rows={8}
                    value={csvText}
                    onChange={(e) => setCsvText(e.target.value)}
                    placeholder="plot_number,phase,area_sqft,facing,price_inr,status&#10;101,1,600,North,690000,Available&#10;102,1,800,East,920000,Available"
                    className="w-full rounded-lg border border-brand-border font-mono text-xs p-3 focus:border-brand-gold focus:outline-hidden"
                  />

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="rounded-lg bg-brand-green px-4 py-2 text-xs font-semibold text-white hover:bg-brand-green-surface transition-colors cursor-pointer"
                    >
                      Import Rows
                    </button>
                  </div>
                </form>

                {importSummary && (
                  <div className="rounded-lg bg-brand-cream-surface p-4 text-xs space-y-2">
                    <div className="font-semibold text-brand-dark">
                      Imported: {importSummary.importedCount} | Skipped: {importSummary.skippedCount}
                    </div>
                    {importSummary.errors.length > 0 && (
                      <ul className="list-disc pl-4 text-red-700 space-y-1">
                        {importSummary.errors.map((err, i) => (
                          <li key={i}>{err}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-xl border border-brand-border bg-white p-6 shadow-xs space-y-4">
                <h3 className="font-serif text-lg font-bold text-brand-green">
                  Export Dataset
                </h3>
                <p className="text-xs text-brand-dark-muted leading-relaxed">
                  Export the current working inventory as a structured CSV file for auditing or external backups.
                </p>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-brand-border bg-brand-cream-surface px-4 py-2.5 text-xs font-semibold text-brand-dark hover:border-brand-green hover:text-brand-green transition-colors cursor-pointer"
                >
                  <Download className="h-4 w-4 text-brand-gold-dark" />
                  <span>Download Inventory CSV</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div className="rounded-xl border border-brand-border bg-white shadow-xs overflow-hidden">
            <div className="p-4 border-b border-brand-border/60 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-brand-green">
                  Customer Enquiries Received
                </h3>
                <p className="text-xs text-brand-dark-muted">
                  Log of leads submitted through website enquiry forms &amp; WhatsApp click channels
                </p>
              </div>
              <span className="text-xs font-semibold text-brand-dark-muted">
                Total: {enquiries.length}
              </span>
            </div>

            {enquiries.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-brand-border bg-brand-cream-surface/70 text-brand-dark font-semibold">
                      <th className="p-3">Date</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Topic / Subject</th>
                      <th className="p-3">Plot #</th>
                      <th className="p-3">Size Req.</th>
                      <th className="p-3">Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map((enq) => (
                      <tr key={enq.id} className="border-b border-brand-border/40 hover:bg-brand-cream/40">
                        <td className="p-3 text-brand-dark-muted">
                          {new Date(enq.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                        <td className="p-3 font-semibold text-brand-dark">{enq.customerName}</td>
                        <td className="p-3">
                          <a href={`tel:${enq.phone}`} className="font-medium text-brand-green hover:underline">
                            {enq.phone}
                          </a>
                        </td>
                        <td className="p-3">{enq.enquiryTopic}</td>
                        <td className="p-3 font-semibold text-brand-gold-dark">
                          {enq.plotNumber ? `#${enq.plotNumber}` : '—'}
                        </td>
                        <td className="p-3">{enq.preferredPlotSize || '—'}</td>
                        <td className="p-3">
                          <span className="rounded bg-brand-cream-surface px-2 py-0.5 text-[10px] font-semibold text-brand-dark-muted">
                            {enq.source}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center text-xs text-brand-dark-muted">
                No customer enquiry records registered yet. New web form submissions will appear here.
              </div>
            )}
          </div>
        )}
      </div>

      {/* ADD / EDIT PLOT MODAL */}
      {(isAddModalOpen || editingPlot) && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
        >
          <div className="w-full max-w-xl rounded-2xl border border-brand-border bg-white p-6 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <h3 className="font-serif text-lg font-bold text-brand-green">
                {editingPlot ? `Edit Plot #${editingPlot.plotNumber}` : 'Add New Residential Plot'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingPlot(null);
                }}
                className="text-brand-dark-muted hover:text-brand-dark cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {actionError && (
              <div className="rounded-lg bg-red-50 p-3 text-xs font-semibold text-red-700 border border-red-200">
                {actionError}
              </div>
            )}

            <form onSubmit={handleSavePlot} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="modal-plot-num" className="block font-semibold text-brand-dark">
                    Plot Number *
                  </label>
                  <input
                    id="modal-plot-num"
                    type="text"
                    required
                    value={formPlotNumber}
                    onChange={(e) => setFormPlotNumber(e.target.value)}
                    placeholder="e.g. 42"
                    className="w-full rounded-lg border border-brand-border px-3 py-2 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="modal-phase" className="block font-semibold text-brand-dark">
                    Phase *
                  </label>
                  <select
                    id="modal-phase"
                    value={formPhaseNumber}
                    onChange={(e) => setFormPhaseNumber(parseInt(e.target.value, 10))}
                    className="w-full rounded-lg border border-brand-border px-3 py-2 text-sm"
                  >
                    <option value={1}>Phase 1</option>
                    <option value={2}>Phase 2</option>
                    <option value={3}>Phase 3</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="modal-area" className="block font-semibold text-brand-dark">
                    Area (Sq.Ft.) *
                  </label>
                  <input
                    id="modal-area"
                    type="number"
                    step="1"
                    required
                    value={formAreaSqft}
                    onChange={(e) => setFormAreaSqft(e.target.value)}
                    placeholder="e.g. 700"
                    className="w-full rounded-lg border border-brand-border px-3 py-2 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="modal-facing" className="block font-semibold text-brand-dark">
                    Facing
                  </label>
                  <select
                    id="modal-facing"
                    value={formFacing}
                    onChange={(e) => setFormFacing(e.target.value as any)}
                    className="w-full rounded-lg border border-brand-border px-3 py-2 text-sm"
                  >
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="East">East</option>
                    <option value="West">West</option>
                    <option value="North-East">North-East</option>
                    <option value="North-West">North-West</option>
                    <option value="South-East">South-East</option>
                    <option value="South-West">South-West</option>
                  </select>
                </div>
              </div>

              {/* Price Field */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="modal-price" className="block font-semibold text-brand-dark">
                    Total Price (INR &bull; ₹) *
                  </label>
                  <button
                    type="button"
                    onClick={handleAutoCalcPrice}
                    className="text-[11px] font-semibold text-brand-green hover:underline cursor-pointer"
                  >
                    Auto-calc from Sq.Ft.
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-brand-dark-muted">
                    ₹
                  </span>
                  <input
                    id="modal-price"
                    type="number"
                    step="5000"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="e.g. 805000"
                    className="w-full rounded-lg border border-brand-border pl-7 pr-3 py-2 text-sm font-semibold"
                  />
                </div>
              </div>

              {/* Corner Plot & Road Width */}
              <div className="grid grid-cols-2 gap-3 items-center rounded-xl bg-brand-cream/60 p-3 border border-brand-border/60">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsCorner}
                    onChange={(e) => setFormIsCorner(e.target.checked)}
                    className="h-4 w-4 rounded border-brand-border text-brand-green focus:ring-brand-gold"
                  />
                  <span className="font-semibold text-brand-dark">Corner Plot</span>
                </label>

                <div className="space-y-1">
                  <label htmlFor="modal-road" className="block text-[11px] font-semibold text-brand-dark">
                    Road Width (Feet)
                  </label>
                  <input
                    id="modal-road"
                    type="number"
                    value={formRoadWidth}
                    onChange={(e) => setFormRoadWidth(e.target.value)}
                    placeholder="30 or 40"
                    className="w-full rounded-lg border border-brand-border px-3 py-1.5 bg-white text-xs"
                  />
                </div>
              </div>

              {/* Corner Position if applicable */}
              {formIsCorner && (
                <div className="space-y-1">
                  <label htmlFor="modal-corner-pos" className="block font-semibold text-brand-dark">
                    Corner Position / Adjoining Roads
                  </label>
                  <input
                    id="modal-corner-pos"
                    type="text"
                    value={formCornerPosition}
                    onChange={(e) => setFormCornerPosition(e.target.value)}
                    placeholder="e.g. Adjoining 40ft Main Spine Avenue & 30ft Sector Cross Road"
                    className="w-full rounded-lg border border-brand-border px-3 py-2"
                  />
                </div>
              )}

              {/* Dimensions & Availability */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label htmlFor="modal-width" className="block font-semibold text-brand-dark">
                    Width (Ft)
                  </label>
                  <input
                    id="modal-width"
                    type="number"
                    value={formWidth}
                    onChange={(e) => setFormWidth(e.target.value)}
                    placeholder="e.g. 20"
                    className="w-full rounded-lg border border-brand-border px-3 py-2"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="modal-length" className="block font-semibold text-brand-dark">
                    Length (Ft)
                  </label>
                  <input
                    id="modal-length"
                    type="number"
                    value={formLength}
                    onChange={(e) => setFormLength(e.target.value)}
                    placeholder="e.g. 35"
                    className="w-full rounded-lg border border-brand-border px-3 py-2"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="modal-avail" className="block font-semibold text-brand-dark">
                    Availability
                  </label>
                  <select
                    id="modal-avail"
                    value={formAvailability}
                    onChange={(e) => setFormAvailability(e.target.value as any)}
                    className="w-full rounded-lg border border-brand-border px-3 py-2"
                  >
                    <option value="Available">Available</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>
              </div>

              {/* Public Description */}
              <div className="space-y-1">
                <label htmlFor="modal-desc" className="block font-semibold text-brand-dark">
                  Public Description
                </label>
                <textarea
                  id="modal-desc"
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Custom highlights for this plot on the public website..."
                  className="w-full rounded-lg border border-brand-border px-3 py-2"
                />
              </div>

              {/* Notes */}
              <div className="space-y-1">
                <label htmlFor="modal-notes" className="block font-semibold text-brand-dark">
                  Internal Notes / Boundary Marker
                </label>
                <input
                  id="modal-notes"
                  type="text"
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="e.g. Near park boundary stone 85"
                  className="w-full rounded-lg border border-brand-border px-3 py-2"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-brand-border">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingPlot(null);
                  }}
                  className="rounded-lg border border-brand-border px-4 py-2 font-medium text-brand-dark cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-brand-green px-5 py-2 font-semibold text-white hover:bg-brand-green-surface cursor-pointer"
                >
                  Save Plot Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
