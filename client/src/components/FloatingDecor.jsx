import { useEffect, useState } from 'react'
import { Heart, Sparkles, Star } from 'lucide-react'

const FloatingDecor = () => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Generate random floating particles
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
      size: 20 + Math.random() * 30,
      type: ['heart', 'sparkle', 'star', 'flower'][Math.floor(Math.random() * 4)]
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: 0.15
          }}
        >
          {particle.type === 'heart' && (
            <Heart className="w-full h-full text-pink-500 animate-pulse" />
          )}
          {particle.type === 'sparkle' && (
            <Sparkles className="w-full h-full text-purple-500 animate-spin-slow" />
          )}
          {particle.type === 'star' && (
            <Star className="w-full h-full text-amber-500 fill-current animate-pulse" />
          )}
          {particle.type === 'flower' && (
            <svg className="w-full h-full text-rose-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8-8c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zM4 12c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm13.07-6.93c.78-.78 2.05-.78 2.83 0s.78 2.05 0 2.83-2.05.78-2.83 0-.78-2.05 0-2.83zm-10.14 0c-.78-.78-.78-2.05 0-2.83s2.05-.78 2.83 0 .78 2.05 0 2.83-2.05.78-2.83 0zm0 10.14c-.78.78-2.05.78-2.83 0s-.78-2.05 0-2.83 2.05-.78 2.83 0 .78 2.05 0 2.83zm10.14 0c.78.78.78 2.05 0 2.83s-2.05.78-2.83 0-.78-2.05 0-2.83 2.05-.78 2.83 0z"/>
            </svg>
          )}
        </div>
      ))}

      {/* Floating confetti */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(90deg);
          }
          50% {
            transform: translateY(-40px) rotate(180deg);
          }
          75% {
            transform: translateY(-20px) rotate(270deg);
          }
        }

        .animate-float {
          animation: float infinite ease-in-out;
        }

        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

export default FloatingDecor
