// Small site interactions and Chart.js setup
document.getElementById('year').textContent = new Date().getFullYear();

// Generate synthetic stock-like data (random walk)
function generateSeries(points = 60, start = 100) {
  const data = [];
  let v = start;
  for (let i = 0; i < points; i++) {
    const change = (Math.random() - 0.48) * (i < 10 ? 1.5 : 2.5);
    v = Math.max(10, v + change);
    data.push(Number(v.toFixed(2)));
  }
  return data;
}

const labels = Array.from({length:60}, (_,i)=>{
  const d = new Date(); d.setDate(d.getDate() - (59-i));
  return d.toLocaleDateString(undefined,{month:'short',day:'numeric'});
});

const series = generateSeries(60, 120);

const ctx = document.getElementById('marketChart').getContext('2d');
const gradient = ctx.createLinearGradient(0,0,0,220);
gradient.addColorStop(0, 'rgba(91,140,255,0.28)');
gradient.addColorStop(1, 'rgba(91,140,255,0.02)');

new Chart(ctx, {
  type: 'line',
  data: {
    labels,
    datasets: [{
      label: 'Price (CAD)',
      data: series,
      borderColor: '#8fb0ff',
      backgroundColor: gradient,
      tension: 0.28,
      pointRadius: 0,
      fill: true,
      borderWidth: 2
    }]
  },
  options: {
    maintainAspectRatio: false,
    plugins: {
      legend: {display:false},
      tooltip: {mode:'index',intersect:false}
    },
    scales: {
      x: {display:false},
      y: {display:false}
    }
  }
});
