"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import type { BlockMeta } from "../data/Blocks";

export default function BlockCard({ block }: { block: BlockMeta }) {
  return (

      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
            className="cursor-pointer"
      >
        <h1>{block.title}</h1>
      </motion.div>
  );
}
