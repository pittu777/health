// HomePage.tsx

import Hero from "./Hero";
import { NavBar } from "../layout/NavBar";
export default function HomePage() {
  return (
    <div className="text-white">
      <div>
        <NavBar />
        
        <Hero />
      </div>
    </div>
  );
}
