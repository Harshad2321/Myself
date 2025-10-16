import { Heart } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-cognite-purple to-purple-800 text-white py-8 mt-20">
      <div className="container mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-cognite-rose fill-current animate-pulse-soft" />
          <p className="text-lg font-semibold">COGNITE - Reminiscence With Us</p>
        </div>
        <p className="text-sm text-white/80 mb-2">
          A digital space that evokes memory, comfort, and calm.
        </p>
        <p className="text-xs text-white/60">
          © 2025 COGNITE Project. Design Thinking Initiative.
        </p>
        <p className="text-xs text-white/60 mt-2">
          Built with empathy for dementia care and memory therapy.
        </p>
      </div>
    </footer>
  )
}

export default Footer

