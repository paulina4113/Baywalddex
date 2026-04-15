import { motion } from 'motion/react';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export function ProgressBar({ current, total, label }: ProgressBarProps) {
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-2 text-sm">
          <span>{label}</span>
          <span className="font-semibold">{current}/{total}</span>
        </div>
      )}
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
