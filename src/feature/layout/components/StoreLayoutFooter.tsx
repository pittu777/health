import { Facebook, Instagram, Twitter } from "lucide-react";

export default function StoreLayoutFooter() {
    return (
        <footer className="bg-[#0a326d] px-4 py-4 text-white sm:px-8">
            <div className="grid gap-8 md:grid-cols-3">
                <div>
                    <h2 className="text-[1.7rem] font-semibold">Filters</h2>
                    <div className="mt-5 flex flex-wrap gap-4 text-sm text-blue-100">
                        <span>All</span>
                        <span>ElecEtronk</span>
                    </div>
                    <p className="mt-8 text-sm text-blue-100">© 2024 American</p>
                </div>

                <div>
                    <h2 className="text-[1.7rem] font-semibold">About Us</h2>
                    <div className="mt-5 space-y-3 text-sm text-blue-100">
                        <p>About Us</p>
                        <p>Contact</p>
                    </div>
                </div>

                <div>
                    <h2 className="text-[1.7rem] font-semibold">Follow Us</h2>
                    <div className="mt-5 flex items-center gap-3">
                        {[Facebook, Twitter, Instagram].map((Icon, index) => (
                            <span
                                key={index}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0d57a7]"
                            >
                                <Icon className="h-4 w-4" />
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
