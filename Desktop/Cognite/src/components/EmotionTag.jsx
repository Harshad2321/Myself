import { emotionColors } from '../data/samplePatients'

const EmotionTag = ({ emotion }) => {
  const color = emotionColors[emotion] || '#C1A3FF'
  
  return (
    <span 
      className="px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
      style={{ 
        backgroundColor: color + '40',
        color: '#301934',
        border: `1.5px solid ${color}`
      }}
    >
      {emotion}
    </span>
  )
}

export default EmotionTag

