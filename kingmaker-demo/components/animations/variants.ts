export const fadeUp = {
  initial: { y: 40 },
  animate: {
    y: 0,
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
  }
}

export const container = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.1 }
  }
}

export const child = {
  initial: { y: 30 },
  animate: {
    y: 0,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
  }
}

export const cardHover = {
  scale: 1.05,
  boxShadow: '0 0 25px rgba(234, 179, 8, 0.4)',
  borderColor: 'rgba(234, 179, 8, 0.8)'
}

export const buttonHover = {
  scale: 1.03,
  boxShadow: '0 0 30px rgba(234, 179, 8, 0.8), 0 0 60px rgba(234, 179, 8, 0.4)'
}

export const pillHover = {
  scale: 1.08,
  boxShadow: '0 0 20px rgba(234, 179, 8, 0.6)'
}
