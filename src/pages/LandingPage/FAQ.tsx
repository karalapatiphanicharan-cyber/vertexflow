import React from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

const faqData = [
  {
    q: "Is VertexFlow free to use?",
    a: "Yes, VertexFlow is a 100% open-source educational platform designed for students and developers to master graph algorithms."
  },
  {
    q: "Can I use it for interview preparation?",
    a: "Absolutely! Our LeetCode Visualization mode is specifically designed to help you understand common graph-based interview problems."
  },
  {
    q: "Do I need a backend to run this?",
    a: "No. VertexFlow is a pure frontend application built with React and Vite, making it extremely fast and easy to deploy."
  },
  {
    q: "Can I export my graphs?",
    a: "Yes, you can export your custom graphs as JSON, PNG, or SVG directly from the Playground."
  }
];

export const FAQ: React.FC = () => {
  return (
    <section className="py-24 px-8 bg-gray-50 border-t-4 border-black">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <HelpCircle size={48} className="text-primary-blue" />
          <h2 className="text-5xl font-black uppercase tracking-tighter">Common Questions</h2>
        </div>

        <div className="space-y-6">
          {faqData.map((item, i) => (
            <div key={i} className="border-4 border-black bg-white p-6 shadow-brutal">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-black uppercase tracking-tight">{item.q}</h3>
                <ChevronDown size={20} />
              </div>
              <p className="font-bold text-gray-600 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
