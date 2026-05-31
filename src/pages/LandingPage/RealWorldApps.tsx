import React from 'react';
import { Globe, MapPin, Share2, Network } from 'lucide-react';

const apps = [
  { icon: <MapPin />, title: "GPS Routing", description: "Google Maps uses Dijkstra to find the fastest route to your destination." },
  { icon: <Share2 />, title: "Social Networks", description: "Facebook uses BFS to determine degrees of separation between users." },
  { icon: <Network />, title: "Network Routing", description: "The OSPF protocol uses Link State Routing to manage data packets." },
  { icon: <Globe />, title: "Web Crawling", description: "Search engines use graph traversals to index the vast network of the web." }
];

export const RealWorldApps: React.FC = () => {
  return (
    <section className="py-24 px-8 border-t-4 border-black bg-primary-blue text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-black uppercase tracking-tighter mb-16 text-center">Real-World Scale</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {apps.map((app, i) => (
            <div key={i} className="text-center group">
              <div className="w-20 h-20 border-4 border-white bg-black text-primary-yellow flex items-center justify-center mx-auto mb-6 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
                {app.icon}
              </div>
              <h3 className="text-2xl font-black uppercase mb-4">{app.title}</h3>
              <p className="font-bold opacity-80">{app.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
