'use client'
import { motion } from 'framer-motion'

interface CharacterStaggerProps {
  text: string
  className?: string
  inView?: boolean
}

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1]

const containerVariants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.06 }
  }
}

const letterVariants = {
  initial: { y: 80, opacity: 0, rotateX: -90 },
  animate: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: { duration: 0.6, ease: EASE }
  }
}

export function CharacterStagger({ text, className, inView = false }: CharacterStaggerProps) {
  const viewProps = inView
    ? { whileInView: 'animate' as const, viewport: { once: false, amount: 0.1 } }
    : { animate: 'animate' as const }

  return (
    <div className="char-wrapper" style={{ display: 'inline-block', perspective: '800px' }}>
      <motion.span
        variants={containerVariants}
        initial="initial"
        {...viewProps}
        className={className}
        style={{ display: 'inline-block' }}
      >
        {text.split('').map((char, i) => (
          <motion.span
            key={i}
            variants={letterVariants}
            style={{ display: 'inline-block', transformOrigin: 'top center' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.span>
    </div>
  )
}
