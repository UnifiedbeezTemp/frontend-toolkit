import { motion } from 'framer-motion';
import HeroContent from './HeroContent';
import HeroImageSection from './HeroImageSection';
import { containerVariants } from './animations';
import { useSupabaseImages } from '../../../lib/supabase/useSupabase';

export default function HeroSection() {
  const supabaseImages = useSupabaseImages();

  return (
    <motion.div
      className="bg-gradient-yellow-2 rounded-[2.4rem] flex flex-col md:flex-row justify-between lg:p-[1rem] xl:pr-[5rem] gap-[5rem] h-[57rem] sm:h-[66.7rem] md:h-[30rem] xl:h-[50rem] 2xl:h-[46rem] overflow-hidden border border-input-stroke"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <HeroContent />
      <HeroImageSection supabaseImages={supabaseImages} />
    </motion.div>
  );
}