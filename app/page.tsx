import Link from 'next/link';
import RsvpForm from './components/RsvpForm';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-blue-50">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">Pack 131 Ice Cream Social!</h1>
        <div className="mb-6 bg-yellow-100 p-4 rounded-lg border-2 border-yellow-300">
          <h2 className="text-xl font-semibold text-blue-800">Friday, June 20th, 2025</h2>
          <p className="text-gray-700">6:00 PM - 8:00 PM</p>
          <p className="text-gray-700">Field south of St. Jude Catholic Church</p>
          <p className="text-gray-700">1515 N Greenville Ave, Allen, TX 75002</p>
        </div>
        
        <div className="mb-6">
          <p className="text-lg">Join us for a fun evening of ice cream and games!</p>
          <p className="text-md mt-2">The Pack will provide ice cream cups for all cubs and siblings.</p>
        </div>
        
        <RsvpForm />
        
        <div className="mt-8 text-sm text-gray-500 text-center">
          <Link href="/admin" className="text-blue-500 hover:underline">Admin Access</Link>
        </div>
      </div>
    </main>
  );
}