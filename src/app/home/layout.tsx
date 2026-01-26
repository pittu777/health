import NavBar from "@/features/homeComponents/layout/NavBar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-white min-h-screen pb-20 pl-20 pr-20 pt-10">
      <NavBar />
      {children}
    </div>
  );
}
