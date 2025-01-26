interface TracedChessKingProps {
  className?: string
}

export function TracedChessKing({ className = "" }: TracedChessKingProps) {
  return (
    <div className="relative group">
      {/* Glow effect */}
      <div className="absolute inset-0 blur-2xl bg-white/20 rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/output-onlinepngtools-2zFsmi5dLwgxuOfUuIySr6b8TAL5dH.png"
        alt="Chess King"
        className={`relative ${className} transition-transform duration-700 group-hover:scale-105`}
      />
    </div>
  )
}

