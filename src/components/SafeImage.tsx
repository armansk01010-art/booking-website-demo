import React, { useState, useEffect, useRef } from 'react';

interface PictureSource {
  media: string;
  srcSet: string;
}

export interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  aspectRatio?: string;
  width?: number | string;
  height?: number | string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  fetchPriority?: 'high' | 'auto' | 'low';
  sizes?: string;
  srcSet?: string;
  pictureSources?: PictureSource[];
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  aspectRatio,
  width,
  height,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority = 'auto',
  sizes,
  srcSet,
  pictureSources,
  onClick,
  style,
}) => {
  const isEager = loading === 'eager';
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(isEager);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [activeSrc, setActiveSrc] = useState(src);

  // Check if image is already complete in browser cache on mount or src change
  useEffect(() => {
    setActiveSrc(src);
    setHasError(false);
    if (isEager || (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0)) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
    setRetryCount(0);
  }, [src, isEager]);

  const handleError = () => {
    if (retryCount < 1) {
      // Retry once after a brief 400ms pause with cache-bust or reload
      setTimeout(() => {
        setRetryCount((prev) => prev + 1);
        setActiveSrc(`${src}${src.includes('?') ? '&' : '?'}retry=${Date.now()}`);
      }, 400);
    } else {
      setHasError(true);
      setIsLoaded(true); // stop skeleton
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Eager images are displayed immediately at full opacity without transition lag
  const imgClasses = `w-full h-full object-cover ${
    isEager
      ? 'opacity-100'
      : `transition-opacity duration-300 ${isLoaded && !hasError ? 'opacity-100' : 'opacity-0'}`
  } ${className}`;

  return (
    <div
      className={`relative overflow-hidden bg-[#EAE4D7] ${aspectRatio || ''} ${wrapperClassName}`}
      style={style}
      onClick={onClick}
    >
      {/* Soft skeleton placeholder with warm shimmer for lazy images while loading */}
      {!isLoaded && !isEager && (
        <div
          className="absolute inset-0 z-0 bg-[#EAE4D7] animate-pulse"
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(245,242,234,0.3) 0%, rgba(173,152,112,0.15) 50%, rgba(245,242,234,0.3) 100%)',
            backgroundSize: '200% 100%',
          }}
          aria-hidden="true"
        />
      )}

      {/* Elegant Fallback Placeholder if image fails after retry */}
      {hasError ? (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#EAE4D7] border border-[#AD9870]/25 z-10 select-none"
          role="img"
          aria-label={alt}
        >
          {/* Subtle stylized resort emblem */}
          <div className="w-10 h-10 rounded-full border border-[#AD9870]/50 flex items-center justify-center mb-2.5 bg-[#F5F2EA]/60">
            <svg
              className="w-5 h-5 text-[#263D32]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
              <path d="M4.14 15h15.72" />
            </svg>
          </div>
          <span className="font-serif text-sm font-medium tracking-wide text-[#263D32] line-clamp-1">
            {alt || 'Vaana Sanctuary'}
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#AD9870] mt-0.5">
            Vaana Retreat
          </span>
        </div>
      ) : pictureSources && pictureSources.length > 0 ? (
        <picture className="w-full h-full block">
          {pictureSources.map((source, idx) => (
            <source key={idx} media={source.media} srcSet={source.srcSet} />
          ))}
          <img
            ref={imgRef}
            src={activeSrc}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            decoding={decoding}
            fetchPriority={fetchPriority}
            sizes={sizes}
            srcSet={srcSet}
            onLoad={handleLoad}
            onError={handleError}
            className={imgClasses}
          />
        </picture>
      ) : (
        <img
          ref={imgRef}
          src={activeSrc}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          decoding={decoding}
          fetchPriority={fetchPriority}
          sizes={sizes}
          srcSet={srcSet}
          onLoad={handleLoad}
          onError={handleError}
          className={imgClasses}
        />
      )}
    </div>
  );
};
