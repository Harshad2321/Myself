import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const ChartMock = ({ data, title }) => {
  const mockData = data || [
    { day: 'Mon', engagement: 65 },
    { day: 'Tue', engagement: 72 },
    { day: 'Wed', engagement: 68 },
    { day: 'Thu', engagement: 80 },
    { day: 'Fri', engagement: 85 },
    { day: 'Sat', engagement: 78 },
    { day: 'Sun', engagement: 88 }
  ]

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title || "Weekly Engagement"}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={mockData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="day" stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '2px solid #C1A3FF',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="engagement" 
            stroke="#301934" 
            strokeWidth={3}
            dot={{ fill: '#C1A3FF', r: 6 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ChartMock

