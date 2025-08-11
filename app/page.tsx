import { Hero201 } from "@/components/hero201"
// import { TestEmail } from "@/components/test-email"
import Navbar from "@/components/navbar"
export default function Home() {
  return (
    <div>
      <p className="fixed top-0 left-0 right-0 z-50 flex">
        <Navbar href="/about" nom="A propos"/>
        <Navbar href="/contact" nom="Contact"/>
      </p>
      
      <Hero201 />
      {/* <div className="container mx-auto py-8">
         <TestEmail /> 
      </div> */}
    </div>
  );
}
