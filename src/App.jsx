import "./App.css";
import * as d3 from "d3";

function App() {
  const data = [
    { count: 6, name: "Hantavirus" },
    { count: 7, name: "Dengue" },
    { count: 7, name: "Tularemia" },
    { count: 9, name: "Ebola" },
    { count: 11, name: "E. coli" },
    { count: 15, name: "Tuberculosis" },
    { count: 17, name: "Salmonella" },
    { count: 18, name: "Vaccinia" },
    { count: 54, name: "Brucella" },
  ];

  const width = 800;
  const height = 500;

  const margin = {
    top: 40,
    right: 40,
    bottom: 0,
    left: 150,
  };

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const sortedData = [...data].sort((a, b) => b.count - a.count);

  const xScale = d3.scaleLinear().domain([0, 55]).range([0, innerWidth]);
  const yScale = d3
    .scaleBand()
    .domain(sortedData.map((d) => d.name))
    .range([0, innerHeight])
    .paddingInner(0.35)
    .paddingOuter(0.1);

  return (
    <div>
      <div className="chart-container">
        <div className="chart-header">
          <h1>Escape artists</h1>
          <p>Number of laboratory-acquired infections, 1970-2021</p>
        </div>

        <svg width={width} height={height}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            {xScale.ticks(11).map((tick) => (
              <line
                key={tick}
                x1={xScale(tick)}
                x2={xScale(tick)}
                y1={0}
                y2={innerHeight}
                stroke="#d9d9d9"
                strokeWidth={1}
              />
            ))}
            {xScale.ticks(11).map((tick) => (
              <text
                key={tick}
                x={xScale(tick)}
                y={-12}
                textAnchor="middle"
                fill="#808080"
                fontSize="12px"
              >
                {tick}
              </text>
            ))}
            {sortedData.map((d) => (
              <rect
                key={d.name}
                x={0}
                y={yScale(d.name)}
                width={xScale(d.count)}
                height={yScale.bandwidth()}
                fill="#076fa2"
              />
            ))}
            {/* Y-axis line */}
            <line
              x1={0}
              x2={0}
              y1={0}
              y2={innerHeight}
              stroke="black"
              strokeWidth={1}
            />
            {sortedData.map((d) => {
              const barWidth = xScale(d.count);
              const isSmall = barWidth < 90;

              return (
                <text
                  key={d.name}
                  x={isSmall ? barWidth + 8 : 8}
                  y={yScale(d.name) + yScale.bandwidth() / 2}
                  textAnchor="start"
                  dominantBaseline="central"
                  fill={isSmall ? "#076fa2" : "white"}
                  fontSize="14px"
                  opacity="0.9"
                >
                  {d.name}
                </text>
              );
            })}
          </g>
        </svg>
        <div className="chart-footer">
          <p>
            Sources: Laboratory-Acquired Infection Database; Americal Biological
            Safety Association
          </p>
          <p>The Economist</p>
        </div>
      </div>
    </div>
  );
}

export default App;
