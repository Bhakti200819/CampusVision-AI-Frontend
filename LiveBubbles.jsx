
import "./LiveBubbles.css";

function LiveBubbles() {
  return (
    <div className="live-bubbles-container">
      {Array.from({ length: 38 }).map((_, i) => {
        const size = i % 9 === 0 ? 5 : 2 + (i % 3);

        return (
          <span
            key={i}
            className={`live-particle particle-${i % 4}`}
            style={{
              left: `${(i * 47 + 13) % 100}%`,
              "--size": `${size}px`,
              "--delay": `${-((i * 1.73) % 18)}s`,
              "--duration": `${12 + (i % 9) * 2}s`,
              "--drift": `${(i % 2 === 0 ? 1 : -1) * (12 + (i % 6) * 9)}px`,
            }}
          />
        );
      })}
    </div>
  );
}

export default LiveBubbles;
