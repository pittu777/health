
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-black min-h-screen pb-20 pl-20 pr-20 pt-10">
      {children}
    </div>
  );
}
