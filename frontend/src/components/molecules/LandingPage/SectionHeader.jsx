import React from 'react';
import { motion } from 'framer-motion';
import { leftSideVariants, rightSideVariants } from '../../../shared/constants/motion';
function SectionHeader({ title, link }) {
  return (
    <div className="flex items-center justify-between gap-8 flex-wrap">

      <motion.h2
        variants={leftSideVariants}

        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative section-title-after text-h2 text-gray-10"
      >
        {
          title
        }
      </motion.h2>
      {/* <motion.a
      variants={rightSideVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{once:true}}
      href={link} className='link text-xl'>
        See All
      </motion.a> */}
    </div>
  );
}

export default SectionHeader;
