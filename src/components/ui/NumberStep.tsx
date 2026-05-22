interface NumberStepProps {
  n: number;
  className?: string;
}

export function NumberStep({ n, className }: NumberStepProps) {
  return (
    <div className={['text-display-l text-laudok-500/60 font-display tabular-nums leading-none', className].filter(Boolean).join(' ')}>
      {n.toString().padStart(2, '0')}
    </div>
  );
}
