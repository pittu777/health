// app/movies/[id]/page.tsx
import MovieDetailFeature from "@/feature/movies/[id]/page";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    // Await the params to get the actual ID value
    const resolvedParams = await params;

    return <MovieDetailFeature params={resolvedParams} />;
}