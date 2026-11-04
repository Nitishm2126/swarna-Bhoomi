import { NextRequest, NextResponse } from 'next/server';
import { getPlotById, updatePlot, deletePlot } from '@/services/plots.service';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: {
    plotId: string;
  };
}

/**
 * GET /api/plots/[plotId]
 * Fetch individual plot details by ID or plotNumber
 */
export async function GET(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { plotId } = params;
    if (!plotId) {
      return NextResponse.json({ error: 'Plot ID parameter missing' }, { status: 400 });
    }

    const plot = getPlotById(plotId);
    if (!plot) {
      return NextResponse.json(
        { error: `Plot with ID "${plotId}" not found in inventory` },
        { status: 404 }
      );
    }

    return NextResponse.json({ plot }, { status: 200 });
  } catch (err: any) {
    console.error(`Error in GET /api/plots/${params.plotId}:`, err);
    return NextResponse.json(
      { error: 'Failed to fetch plot details', details: err?.message },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/plots/[plotId]
 * Update plot details (Admin)
 */
export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { plotId } = params;
    const body = await request.json();

    const existing = getPlotById(plotId);
    if (!existing) {
      return NextResponse.json(
        { error: `Plot with ID "${plotId}" not found in inventory` },
        { status: 404 }
      );
    }

    const result = updatePlot(existing.id, {
      ...body,
      areaSqft: body.areaSqft !== undefined ? parseFloat(body.areaSqft) : undefined,
      price: body.price !== undefined ? parseFloat(body.price) : undefined,
      widthFeet: body.widthFeet !== undefined ? parseFloat(body.widthFeet) : undefined,
      lengthFeet: body.lengthFeet !== undefined ? parseFloat(body.lengthFeet) : undefined,
      phaseNumber: body.phaseNumber !== undefined ? parseInt(body.phaseNumber, 10) : undefined,
      roadWidthFeet: body.roadWidthFeet !== undefined ? parseFloat(body.roadWidthFeet) : undefined,
      isCorner: body.isCorner !== undefined ? Boolean(body.isCorner) : undefined,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, plot: result.plot }, { status: 200 });
  } catch (err: any) {
    console.error(`Error in PATCH /api/plots/${params.plotId}:`, err);
    return NextResponse.json(
      { error: 'Failed to update plot', details: err?.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/plots/[plotId]
 * Delete plot record (Admin)
 */
export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { plotId } = params;
    const existing = getPlotById(plotId);
    if (!existing) {
      return NextResponse.json(
        { error: `Plot with ID "${plotId}" not found in inventory` },
        { status: 404 }
      );
    }

    const result = deletePlot(existing.id);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Plot removed successfully' }, { status: 200 });
  } catch (err: any) {
    console.error(`Error in DELETE /api/plots/${params.plotId}:`, err);
    return NextResponse.json(
      { error: 'Failed to delete plot', details: err?.message },
      { status: 500 }
    );
  }
}

