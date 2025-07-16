import { Smooch_Sans } from "next/font/google";

export const smooch_sans = Smooch_Sans({
  subsets: ['latin'], // or ['latin-ext'] if needed
  weight: ['400', '500', '600', '700'], // Choose the weights you need
  display: 'swap',
  variable: '--font-smooch-sans' // optional, for Tailwind or CSS vars
})