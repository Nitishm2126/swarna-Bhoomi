import { NextRequest, NextResponse } from 'next/server';
import {
  searchPlotsSmart,
  addPlot,
  getStoredPlots,
} from '@/services/plots.service';
import { SmartPlotPreferences, FacingDirection, CornerPreference, PlotAvailability } from '@/types/plot';

export const dynamic = 'force-dynamic';

/**
 * GET /api/plots
 * Query parameters:
 * - minArea, maxArea (numbers)
 * - minBudget, maxBudget (numbers)
 * - facing (North, South, East, West, All)
 * - cornerPreference (any, corner_only, non_corner)
 * - phase (1, 2, 3, All)
 * - availability (Available, Reserved, Sold, All)
 * - sortBy (price_asc, price_desc, area_asc, area_desc, plot_asc)
 * - page (default: 1)
 * - limit (default: 5)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const minAreaParam = searchParams.get('minArea');
    const maxAreaParam = searchParams.get('maxArea');
    const minBudgetParam = searchParams.get('minBudget');
    const maxBudgetParam = searchParams.get('maxBudget');
    const facingParam = searchParams.get('facing');
    const cornerParam = searchParams.get('cornerPreference');
    const phaseParam = searchParams.get('phase');
    const availParam = searchParams.get('availability');
    const sortByParam = searchParams.get('sortBy');
    const pageParam = searchParams.get('page');
    const limitParam = searchParams.get('limit');

    const preferences: SmartPlotPreferences = {
      minArea: minAreaParam ? parseFloat(minAreaParam) : null,
      maxArea: maxAreaParam ? parseFloat(maxAreaParam) : null,
      minBudget: minBudgetParam ? parseFloat(minBudgetParam) : null,
      maxBudget: maxBudgetParam ? parseFloat(maxBudgetParam) : null,
      facing: (facingParam as FacingDirection | 'All') || 'All',
      cornerPreference: (cornerParam as CornerPreference) || 'any',
      phase: phaseParam && phaseParam !== 'All' ? parseInt(phaseParam, 10) : 'All',
      availability: (availParam as PlotAvailability | 'All') || 'Available',
      sortBy: (sortByParam as any) || 'price_asc',
      page: pageParam ? Math.max(1, parseInt(pageParam, 10)) : 1,
      limit: limitParam ? Math.max(1, parseInt(limitParam, 10)) : 5,
    };

    const response = await searchPlotsSmart(preferences);

    return NextResponse.json(response, { status: 200 });
  } catch (err: any) {
    console.error('Error in GET /api/plots:', err);
    return NextResponse.json(
      { error: 'Failed to search plots', details: err?.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/plots
 * Administrative plot creation
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.plotNumber || !body.areaSqft || body.areaSqft <= 0) {
      return NextResponse.json(
        { error: 'Valid plotNumber and positive areaSqft are required.' },
        { status: 400 }
      );
    }

    const result = addPlot({
      projectId: body.projectId || 'proj-swarna-bhoomi',
      phaseId: body.phaseId || `phase-${body.phaseNumber || 1}`,
      phaseNumber: body.phaseNumber ? parseInt(body.phaseNumber, 10) : 1,
      phaseName: body.phaseName || `Phase ${body.phaseNumber || 1}`,
      plotNumber: String(body.plotNumber).trim(),
      areaSqft: parseFloat(body.areaSqft),
      facing: body.facing || 'East',
      widthFeet: body.widthFeet ? parseFloat(body.widthFeet) : null,
      lengthFeet: body.lengthFeet ? parseFloat(body.lengthFeet) : null,
      availability: body.availability || 'Available',
      price: body.price ? parseFloat(body.price) : undefined,
      isCorner: Boolean(body.isCorner),
      roadWidthFeet: body.roadWidthFeet ? parseFloat(body.roadWidthFeet) : 30,
      notes: body.notes || null,
      description: body.description || null,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(
      { success: true, plot: result.plot },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('Error in POST /api/plots:', err);
    return NextResponse.json(
      { error: 'Failed to create plot', details: err?.message },
      { status: 500 }
    );
  }
}

