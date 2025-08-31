import React from "react";
import { Link } from "react-router-dom";

const posts = [
  {
    id: 1,
    title: "CM Fixed Income: Exiting Banking & PSU to Add a New Gilt Fund",
    date: "Apr 18, 2024",
    excerpt: "We are increasing the duration of our Fixed Income portfolio to reflect the current macro conditions...",
    content:
      "Full content of CM Fixed Income article goes here. You can write as much detail as you want."
  },
  {
    id: 2,
    title: "Craftsman Automation: Poised for Growth Amid Temporary Headwinds",
    date: "Apr 05, 2024",
    excerpt:
      "Craftsman Automation excels in making precise parts for cars and machines. Looks resilient with a focus on growth...",
    content:
      "Full content of Craftsman Automation article goes here with more details."
  },
  {
    id: 3,
    title: "The Focused Way of Investing: Our Four-Quadrant Strategy and FY24 Review",
    date: "Apr 03, 2024",
    excerpt:
      "FY24 brought us a 42% gain in our Focused portfolio, gently outperforming the Nifty's 29%...",
    content:
      "Full content of The Focused Way of Investing article goes here with complete review."
  }
];

export default function Home() {
  return (
    <div className="container-default py-8">
      <h1 className="text-3xl font-semibold mb-6">Home</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((p) => (
          <article key={p.id} className="bg-white rounded-2xl shadow p-6">
            <div className="text-sm text-gray-500 mb-2">{p.date}</div>
            <h2 className="text-xl font-semibold mb-2">{p.title}</h2>
            <p className="text-gray-700">{p.excerpt}</p>
            <Link
              to={`/post/${p.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-xl">
                Read full post
              </button>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
