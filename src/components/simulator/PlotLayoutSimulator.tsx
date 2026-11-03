'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Plot } from '@/types/plot';
import { generateWhatsAppEnquiryUrl } from '@/lib/whatsapp';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Compass,
  MessageCircle,
  X,
  Layers,
  Sparkles,
  CheckCircle2,
  ListFilter,
  Eye,
  Maximize2
} from 'lucide-react';

interface PlotLayoutSimulatorProps {
  plots: Plot[];
  selectedPlot: Plot | null;
  onSelectPlot: (plot: Plot | null) => void;
  className?: string;
}

export function PlotLayoutSimulator({
  plots,
  selectedPlot,
  onSelectPlot,
  className = '',
}: PlotLayoutSimulatorProps) {
  // SVG viewport dimensions
  const viewBoxWidth = 1000;
  const viewBoxHeight = 580;

  // Zoom & Pan state
  const [scale, setScale] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activePhaseFilter, setActivePhaseFilter] = useState<'All' | 1 | 2 | 3>('All');
  const [viewMode, setViewMode] = useState<'svg' | 'accessible_table'>('svg');

  const svgContainerRef = useRef<HTMLDivElement>(null);

  // Auto-center on selected plot if provided
  useEffect(() => {
    if (selectedPlot && selectedPlot.layoutX && selectedPlot.layoutY) {
      // Calculate target pan to center the plot in 1000x580 viewport
      const targetX = viewBoxWidth / 2 - (selectedPlot.layoutX + (selectedPlot.layoutWidth || 50) / 2);
      const targetY = viewBoxHeight / 2 - (selectedPlot.layoutY + (selectedPlot.layoutHeight || 40) / 2);
      setPan({ x: targetX * 0.5, y: targetY * 0.5 });
      setScale(1.25);
    }
  }, [selectedPlot]);

  // Zoom controls
  const handleZoomIn = () => setScale((prev) => Math.min(2.5, prev + 0.25));
  const handleZoomOut = () => setScale((prev) => Math.max(0.75, prev - 0.25));
  const handleReset = () => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  };

  // Mouse & Touch Pan events
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Touch handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPan({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => setIsDragging(false);

  const filteredPlots = plots.filter((p) => {
    if (activePhaseFilter !== 'All' && p.phaseNumber !== activePhaseFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className={`relative flex flex-col rounded-2xl border border-brand-border bg-white shadow-sm overflow-hidden ${className}`}>
      {/* Simulator Toolbar Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-border/60 bg-brand-cream-surface/70 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-green text-brand-gold">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-brand-green sm:text-base">
              Interactive Township Master Plan
            </h3>
            <p className="text-xs text-brand-dark-muted hidden sm:block">
              Schematic layout: Phase 1, Phase 2, &amp; Phase 3 with NH 716 road access
            </p>
          </div>
        </div>

        {/* Phase Filter & View Toggle */}
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-lg border border-brand-border bg-white p-0.5 text-xs">
            {(['All', 1, 2, 3] as const).map((phase) => (
              <button
                key={phase}
                type="button"
                onClick={() => setActivePhaseFilter(phase)}
                className={`rounded-md px-2.5 py-1 font-medium transition-all ${
                  activePhaseFilter === phase
                    ? 'bg-brand-green text-white shadow-xs'
                    : 'text-brand-dark-muted hover:text-brand-green'
                }`}
              >
                {phase === 'All' ? 'All Phases' : `Phase ${phase}`}
              </button>
            ))}
          </div>

          {/* Toggle Accessible Table View */}
          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'svg' ? 'accessible_table' : 'svg')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-brand-border bg-white px-2.5 py-1 text-xs font-medium text-brand-dark hover:border-brand-gold hover:text-brand-green transition-colors"
            title="Toggle between Interactive Canvas and Accessible Table"
          >
            {viewMode === 'svg' ? (
              <>
                <ListFilter className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Table View</span>
              </>
            ) : (
              <>
                <Eye className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Map View</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas or Accessible Table */}
      {viewMode === 'accessible_table' ? (
        <div className="p-4 sm:p-6 overflow-x-auto max-h-[500px]">
          <div className="mb-3 text-xs text-brand-dark-muted">
            Accessible plot index for screen readers and compact browsing. Select any row to view details and launch WhatsApp enquiry.
          </div>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-brand-border bg-brand-cream-surface/60 text-brand-dark font-semibold">
                <th className="p-2.5">Plot No.</th>
                <th className="p-2.5">Phase</th>
                <th className="p-2.5">Area (Sq.Ft.)</th>
                <th className="p-2.5">Facing</th>
                <th className="p-2.5">Dimensions</th>
                <th className="p-2.5">Status</th>
                <th className="p-2.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlots.map((plot) => (
                <tr
                  key={plot.id}
                  onClick={() => onSelectPlot(plot)}
                  className={`border-b border-brand-border/40 hover:bg-brand-cream/60 cursor-pointer transition-colors ${
                    selectedPlot?.id === plot.id ? 'bg-brand-gold/10 font-medium' : ''
                  }`}
                >
                  <td className="p-2.5 font-bold text-brand-green">#{plot.plotNumber}</td>
                  <td className="p-2.5">{plot.phaseName}</td>
                  <td className="p-2.5">{plot.areaSqft} sq.ft.</td>
                  <td className="p-2.5">{plot.facing || 'Not specified'}</td>
                  <td className="p-2.5">
                    {plot.widthFeet && plot.lengthFeet
                      ? `${plot.widthFeet}' × ${plot.lengthFeet}'`
                      : '—'}
                  </td>
                  <td className="p-2.5">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium ${
                        plot.availability === 'Available'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : plot.availability === 'Reserved'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {plot.availability}
                    </span>
                  </td>
                  <td className="p-2.5 text-right">
                    <a
                      href={generateWhatsAppEnquiryUrl(plot)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-xs text-brand-green hover:text-brand-gold font-medium"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      Enquire
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div
          ref={svgContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`relative h-[380px] sm:h-[480px] w-full bg-[#f8f6f0] select-none overflow-hidden cursor-${
            isDragging ? 'grabbing' : 'grab'
          }`}
          style={{ touchAction: 'none' }}
          role="region"
          aria-label="Swarna Bhoomi Interactive Township Layout Plan"
        >
          {/* North Direction Compass Badge */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-lg border border-brand-border/80 bg-white/90 px-2.5 py-1.5 text-xs font-semibold text-brand-green shadow-xs backdrop-blur-xs pointer-events-none">
            <Compass className="h-4 w-4 text-brand-gold animate-spin-slow" />
            <span>N</span>
          </div>

          {/* Canvas Floating Controls */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-1.5 rounded-lg border border-brand-border/80 bg-white/90 p-1 shadow-xs backdrop-blur-xs">
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1.5 text-brand-dark-muted hover:text-brand-green hover:bg-brand-cream-surface rounded transition-colors"
              title="Zoom In"
              aria-label="Zoom In"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1.5 text-brand-dark-muted hover:text-brand-green hover:bg-brand-cream-surface rounded transition-colors"
              title="Zoom Out"
              aria-label="Zoom Out"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 text-brand-dark-muted hover:text-brand-green hover:bg-brand-cream-surface rounded transition-colors"
              title="Reset View"
              aria-label="Reset View"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          {/* Availability Legend */}
          <div className="absolute bottom-4 left-4 z-10 flex flex-wrap items-center gap-3 rounded-lg border border-brand-border/80 bg-white/95 px-3 py-1.5 text-[11px] font-medium text-brand-dark-muted shadow-xs backdrop-blur-xs">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded border border-emerald-600 bg-emerald-100" />
              <span>Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded border border-amber-600 bg-amber-100" />
              <span>Reserved</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded border border-slate-400 bg-slate-200" />
              <span>Sold</span>
            </div>
            <div className="flex items-center gap-1.5 border-l border-brand-border pl-2.5">
              <span className="h-3 w-3 rounded border-2 border-brand-gold bg-brand-gold/30" />
              <span>Selected</span>
            </div>
          </div>

          {/* SVG Map Canvas */}
          <svg
            viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
            className="w-full h-full transform-gpu transition-transform duration-75"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
              transformOrigin: 'center center',
            }}
          >
            {/* Background Grid & Pattern */}
            <defs>
              <pattern id="layoutGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ebe7dc" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width={viewBoxWidth} height={viewBoxHeight} fill="#faf9f4" />
            <rect width={viewBoxWidth} height={viewBoxHeight} fill="url(#layoutGrid)" />

            {/* Township Boundary Fence */}
            <rect
              x="60"
              y="60"
              width="890"
              height="470"
              rx="12"
              fill="none"
              stroke="#04331e"
              strokeWidth="2.5"
              strokeDasharray="6,4"
            />
            <text x="75" y="80" fontSize="11" fill="#04331e" fontWeight="600" letterSpacing="1">
              SWARNA BHOOMI — APPROVED TOWNSHIP DEMARCATION BOUNDARY
            </text>

            {/* National Highway 716 Frontage (Top Edge) */}
            <rect x="60" y="20" width="890" height="36" rx="4" fill="#2d3748" />
            <line x1="60" y1="38" x2="950" y2="38" stroke="#f6e05e" strokeWidth="2" strokeDasharray="16,12" />
            <text x="500" y="42" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" letterSpacing="1.5">
              CHENNAI – TIRUPATI NATIONAL HIGHWAY (NH 716) FRONTAGE
            </text>

            {/* Entrance Arch / Gate */}
            <rect x="440" y="56" width="120" height="16" fill="#d9a721" rx="2" />
            <text x="500" y="68" fill="#04331e" fontSize="9" fontWeight="bold" textAnchor="middle">
              GRAND ENTRANCE ARCH
            </text>

            {/* Central 40-Foot Main Spine Road */}
            <rect x="470" y="72" width="60" height="458" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="500" y1="72" x2="500" y2="530" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="8,6" />
            <text
              x="500"
              y="320"
              fill="#64748b"
              fontSize="10"
              fontWeight="bold"
              textAnchor="middle"
              transform="rotate(-90, 500, 320)"
              letterSpacing="2"
            >
              MAIN 40 FT CENTRAL AVENUE
            </text>

            {/* Internal 30-Foot Cross Roads */}
            {/* Upper Cross Road (Separating row 1 and row 2) */}
            <rect x="70" y="175" width="870" height="45" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
            <line x1="70" y1="197" x2="940" y2="197" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="6,4" />
            <text x="250" y="201" fill="#94a3b8" fontSize="9" fontWeight="600">
              30 FT INTERNAL RESIDENTIAL ROAD
            </text>
            <text x="730" y="201" fill="#94a3b8" fontSize="9" fontWeight="600">
              30 FT INTERNAL RESIDENTIAL ROAD
            </text>

            {/* Middle Amenities & Park Zone */}
            <rect x="70" y="275" width="870" height="85" fill="#ecfdf5" rx="8" stroke="#a7f3d0" strokeWidth="1.5" />
            {/* Swimming Pool & Club House Graphic */}
            <rect x="110" y="290" width="120" height="55" rx="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5" />
            <text x="170" y="315" fill="#1e40af" fontSize="10" fontWeight="bold" textAnchor="middle">
              SWIMMING POOL
            </text>
            <text x="170" y="330" fill="#3b82f6" fontSize="8" textAnchor="middle">
              &amp; Sun Deck
            </text>

            <rect x="250" y="290" width="140" height="55" rx="6" fill="#fef3c7" stroke="#fde68a" strokeWidth="1.5" />
            <text x="320" y="315" fill="#92400e" fontSize="10" fontWeight="bold" textAnchor="middle">
              COMMUNITY CLUBHOUSE
            </text>
            <text x="320" y="330" fill="#b45309" fontSize="8" textAnchor="middle">
              Indoor Games &amp; Lounge
            </text>

            <rect x="550" y="290" width="160" height="55" rx="6" fill="#dcfce7" stroke="#86efac" strokeWidth="1.5" />
            <text x="630" y="315" fill="#166534" fontSize="10" fontWeight="bold" textAnchor="middle">
              CENTRAL PARK &amp; LAWN
            </text>
            <text x="630" y="330" fill="#15803d" fontSize="8" textAnchor="middle">
              Children Play Area
            </text>

            <rect x="730" y="290" width="180" height="55" rx="6" fill="#fef9c3" stroke="#fef08a" strokeWidth="1.5" />
            <text x="820" y="315" fill="#854d0e" fontSize="10" fontWeight="bold" textAnchor="middle">
              OPEN AIR STAGE
            </text>
            <text x="820" y="330" fill="#a16207" fontSize="8" textAnchor="middle">
              Community Amphitheater
            </text>

            {/* Phase Identification Zone Labels */}
            <text x="120" y="115" fill="#04331e" fontSize="13" fontWeight="bold" letterSpacing="0.5">
              PHASE 1 (ROYAL ENCLAVE)
            </text>
            <text x="520" y="115" fill="#04331e" fontSize="13" fontWeight="bold" letterSpacing="0.5">
              PHASE 2 (GOLDEN MEADOWS)
            </text>
            <text x="120" y="440" fill="#04331e" fontSize="13" fontWeight="bold" letterSpacing="0.5">
              PHASE 3 (EMERALD GREENS — SURVEY STONE 85 ZONE)
            </text>

            {/* Render Plots as SVG Interactive Polygons */}
            {filteredPlots.map((plot) => {
              const x = plot.layoutX ?? 100;
              const y = plot.layoutY ?? 100;
              const w = plot.layoutWidth ?? 50;
              const h = plot.layoutHeight ?? 40;
              const isSelected = selectedPlot?.id === plot.id;

              // Color styles based on availability
              let fillColor = '#dcfce7'; // Available (emerald)
              let strokeColor = '#15803d';
              let textColor = '#065f46';

              if (plot.availability === 'Reserved') {
                fillColor = '#fef3c7'; // Amber
                strokeColor = '#d97706';
                textColor = '#92400e';
              } else if (plot.availability === 'Sold') {
                fillColor = '#f1f5f9'; // Slate
                strokeColor = '#94a3b8';
                textColor = '#64748b';
              }

              if (isSelected) {
                fillColor = '#fef08a';
                strokeColor = '#b45309';
                textColor = '#78350f';
              }

              return (
                <g
                  key={plot.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPlot(plot);
                  }}
                  className="cursor-pointer group"
                  tabIndex={0}
                  role="button"
                  aria-label={`Plot ${plot.plotNumber}, Phase ${plot.phaseNumber}, ${plot.areaSqft} square feet, ${plot.facing || ''} facing, ${plot.availability}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectPlot(plot);
                    }
                  }}
                >
                  {/* Outer selection ring if active */}
                  {isSelected && (
                    <rect
                      x={x - 4}
                      y={y - 4}
                      width={w + 8}
                      height={h + 8}
                      rx={6}
                      fill="none"
                      stroke="#d9a721"
                      strokeWidth={3}
                      strokeDasharray="4,2"
                      className="animate-pulse"
                    />
                  )}

                  {/* Main Plot Rectangle */}
                  <rect
                    x={x}
                    y={y}
                    width={w}
                    height={h}
                    rx={3}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={isSelected ? 2.5 : 1.2}
                    className="transition-all duration-150 group-hover:brightness-95"
                  />

                  {/* Corner indicator */}
                  {plot.isCorner && (
                    <polygon
                      points={`${x},${y} ${x + 8},${y} ${x},${y + 8}`}
                      fill="#d9a721"
                    />
                  )}

                  {/* Plot Number */}
                  <text
                    x={x + w / 2}
                    y={y + h / 2 - 2}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={w > 60 ? '11' : '10'}
                    fontWeight="bold"
                    fill={textColor}
                    className="pointer-events-none"
                  >
                    #{plot.plotNumber}
                  </text>

                  {/* Area label */}
                  <text
                    x={x + w / 2}
                    y={y + h / 2 + 10}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="7.5"
                    fontWeight="600"
                    fill={textColor}
                    className="pointer-events-none opacity-85"
                  >
                    {plot.areaSqft}sft
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      )}

      {/* Selected Plot Detail Floating Card / Panel */}
      {selectedPlot && (
        <div className="border-t border-brand-border bg-white p-4 sm:p-5 transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold text-brand-green sm:text-xl">
                  Plot No. {selectedPlot.plotNumber}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-xs font-semibold ${
                    selectedPlot.availability === 'Available'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : selectedPlot.availability === 'Reserved'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-slate-100 text-slate-700 border border-slate-300'
                  }`}
                >
                  {selectedPlot.availability}
                </span>
                <span className="text-xs text-brand-dark-muted font-medium">
                  • {selectedPlot.phaseName}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-brand-dark-muted sm:text-sm">
                <span>
                  <strong className="text-brand-dark">Area:</strong> {selectedPlot.areaSqft} Sq.Ft.
                </span>
                <span>
                  <strong className="text-brand-dark">Facing:</strong>{' '}
                  {selectedPlot.facing ? `${selectedPlot.facing} Facing` : 'On Layout'}
                </span>
                <span>
                  <strong className="text-brand-dark">Dimensions:</strong>{' '}
                  {selectedPlot.widthFeet && selectedPlot.lengthFeet
                    ? `${selectedPlot.widthFeet} ft × ${selectedPlot.lengthFeet} ft`
                    : 'On layout'}
                </span>
                {selectedPlot.isCorner && (
                  <span className="inline-flex items-center gap-1 text-amber-800 font-medium">
                    <Sparkles className="h-3.5 w-3.5 text-amber-600" /> Corner Plot
                  </span>
                )}
              </div>
              {selectedPlot.notes && (
                <p className="text-xs text-brand-dark-muted/90 italic">
                  Note: {selectedPlot.notes}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={generateWhatsAppEnquiryUrl(selectedPlot)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#04331e] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-[#0a4d2e] transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-brand-gold" />
                <span>Enquire on WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() => onSelectPlot(null)}
                className="rounded-lg border border-brand-border p-2 text-brand-dark-muted hover:text-brand-dark hover:bg-brand-cream-surface transition-colors"
                title="Deselect plot"
                aria-label="Deselect plot"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
