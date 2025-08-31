import React, { useState } from "react";
import { useParams } from "react-router-dom";


const posts = [
  {
    id: 1,
    title: "CM Fixed Income: Exiting Banking & PSU to Add a New Gilt Fund",
    date: "Apr 18, 2024",
    content:
      `
We are increasing the duration of our Fixed Income portfolio to reflect the current macro conditions. Over the past few quarters, interest rate cycles have been closely watched by market participants, with central banks globally signaling a gradual shift from tightening to a more accommodative stance. In such an environment, extending portfolio duration allows us to better capture the potential upside from falling yields, while still maintaining a prudent approach to credit risk. Our conviction is supported by inflation prints that are trending downward, a resilient currency, and liquidity conditions that remain favorable for longer-tenor instruments.

From a sectoral standpoint, we are selectively exiting Banking & PSU funds, which have largely delivered steady but moderate returns in the recent past. While these instruments served as a stabilizer during the rate hike cycle, the opportunity cost of holding them has now increased. By reallocating towards gilt securities and other longer-dated instruments, we seek to align with the evolving interest rate environment. This repositioning is not only a tactical response to near-term market signals but also part of a broader structural view on maintaining a diversified yield curve exposure.

At the same time, we remain mindful of the risks inherent in duration strategies. Volatility in global markets, unexpected inflationary pressures, or changes in fiscal policy could impact yields in the short run. To mitigate such risks, our allocation framework emphasizes staggered entry, robust credit quality filters, and periodic reviews of macroeconomic developments. This disciplined approach ensures that while we extend duration, we do not compromise on the overall safety and stability of the portfolio.

Looking ahead, we believe that patient investors who can withstand interim volatility stand to benefit significantly from the current shift. As the economy normalizes and central bank policies gradually pivot, duration-focused strategies are well positioned to generate superior risk-adjusted returns. Our decision reflects not only a tactical call but also confidence in the long-term resilience of India’s fixed income markets. We remain committed to actively monitoring developments and fine-tuning allocations, with the goal of delivering consistent outcomes for our investors.
    `
  },
  {
    id: 2,
    title: "Craftsman Automation: Poised for Growth Amid Temporary Headwinds",
    date: "Apr 05, 2024",
    content:
      `
Craftsman Automation excels in making precise parts for cars and machines, and its ability to deliver high-quality components has made it a trusted partner for leading automobile and industrial companies. The company has built its reputation by combining cutting-edge technology with a strong focus on engineering excellence. Even as the industry faces cyclical slowdowns and temporary headwinds, Craftsman has demonstrated resilience by leveraging its scale, efficient processes, and diverse customer base.

In recent quarters, the automotive sector has faced supply chain challenges, fluctuating raw material costs, and demand moderation in certain segments. Despite these pressures, Craftsman has maintained stable margins through cost optimization initiatives and disciplined capacity utilization. Its strong relationships with OEMs, coupled with a steady order book, provide visibility into sustained demand once the current softness in the market eases. This disciplined execution reinforces investor confidence in the company's ability to navigate short-term turbulence.

Beyond its automotive base, Craftsman has strategically expanded into industrial and engineering solutions, diversifying its revenue streams. This broader presence not only reduces dependence on the auto cycle but also positions the company to capture opportunities in infrastructure development, industrial machinery, and precision manufacturing. With continued investments in automation and technology, Craftsman is well aligned with the long-term structural growth of India’s manufacturing ecosystem.

Looking forward, Craftsman Automation appears poised for a strong recovery once industry conditions normalize. The combination of operational efficiency, technological edge, and diversified exposure provides a platform for sustainable growth. While near-term headwinds may persist, the company’s fundamentals remain robust, and its strategic initiatives are likely to deliver significant shareholder value over the medium to long term.
    `
  },
  {
    id: 3,
    title: "The Focused Way of Investing: Our Four-Quadrant Strategy and FY24 Review",
    date: "Apr 03, 2024",
    content:
      `
FY24 brought us a 42% gain in our Focused portfolio, gently outperforming the Nifty's 29% and reinforcing the strength of our investment approach. This achievement was not accidental but the outcome of a disciplined, research-driven framework that combines growth, value, quality, and risk management into a cohesive whole. By adhering to our four-quadrant strategy, we ensured that the portfolio captured opportunities across market cycles while limiting downside risk.

One of the key drivers of this outperformance was our commitment to identifying quality businesses with durable competitive advantages. Rather than chasing short-term momentum, we prioritized companies with strong fundamentals, robust cash flows, and clear growth visibility. This selective approach allowed us to stay invested in leaders across sectors such as financial services, technology, and manufacturing, which not only outperformed peers but also delivered compounding value for our investors.

Another important factor was the discipline embedded in our quadrant-based framework. By balancing allocations across growth-oriented bets, stable compounders, undervalued opportunities, and defensive plays, the portfolio remained resilient even during bouts of volatility. This diversified yet focused stance helped us avoid concentration risks and ensured that no single theme dominated performance. It also gave us the flexibility to adapt as macro conditions shifted, capturing upside without overexposing to risk.

As we look ahead, we remain confident that the four-quadrant strategy provides a durable roadmap for wealth creation. While short-term market movements are often unpredictable, our framework emphasizes consistency, balance, and conviction. FY24’s results validate this approach, and we continue to believe that a steady, disciplined application of the strategy will generate superior risk-adjusted returns over the long term. For investors seeking both growth and stability, the focused way of investing remains a proven path forward.
    `
  }
];

export default function PostPage() {
  const { id } = useParams();
  const post = posts.find((p) => p.id === Number(id));

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  if (!post) return <div className="p-6">Post not found</div>;

  const handleComment = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  return (
    <div className="container-default py-8">
      <h1 className="text-3xl font-semibold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{post.date}</p>
      <p className="text-lg text-gray-800 mb-6">{post.content}</p>

      {/* Like / Dislike */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setLikes(likes + 1)}
          className="px-4 py-2 bg-green-500 text-white rounded-xl"
        >
          👍 Like ({likes})
        </button>
        <button
          onClick={() => setDislikes(dislikes + 1)}
          className="px-4 py-2 bg-red-500 text-white rounded-xl"
        >
          👎 Dislike ({dislikes})
        </button>
      </div>

      {/* Comment section */}
      <div className="bg-gray-100 p-4 rounded-xl">
        <h2 className="text-lg font-semibold mb-2">Comments</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-xl"
            placeholder="Write a comment..."
          />
          <button
            onClick={handleComment}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl"
          >
            Post
          </button>
        </div>
        <ul className="space-y-2">
          {comments.map((c, idx) => (
            <li
              key={idx}
              className="bg-white p-2 rounded-xl shadow text-gray-800"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
