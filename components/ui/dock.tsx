'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { cn } from '../../lib/cn';

const DEFAULT_SIZE = 72;
const DEFAULT_MAGNIFICATION = 132;
const DEFAULT_DISTANCE = 180;

export type DockProps = {
  className?: string;
  children: React.ReactNode;
  iconSize?: number;
  iconMagnification?: number;
  iconDistance?: number;
  direction?: 'top' | 'middle' | 'bottom';
};

export type DockIconProps = {
  size?: number;
  magnification?: number;
  distance?: number;
  mouseX?: MotionValue<number>;
  className?: string;
  children?: React.ReactNode;
  title?: string;
  index?: number;
};

function DockIcon({
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  children,
  title,
  index = 0,
}: DockIconProps) {
  const ref = useRef<HTMLDivElement>(null);
  const padding = Math.max(8, size * 0.18);
  const defaultMouseX = useMotionValue(Infinity);

  const distanceCalc = useTransform(mouseX ?? defaultMouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, magnification, size]
  );

  const scaleSize = useSpring(sizeTransform, {
    mass: 0.12,
    stiffness: 140,
    damping: 14,
  });

  return (
    <div
      className="group/icon relative flex items-end justify-center"
      style={{ height: magnification }}
    >
      {title ? (
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-[calc(100%+0.4rem)] left-1/2 z-20 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-full bg-background/95 px-3 py-1 text-[11px] font-semibold tracking-wide text-foreground opacity-0 shadow-lg backdrop-blur-sm transition-all duration-200 group-hover/icon:translate-y-0 group-hover/icon:opacity-100 md:text-xs"
        >
          {title}
        </span>
      ) : null}
      <motion.div
        ref={ref}
        aria-label={title}
        initial={{ opacity: 0, y: 28, scale: 0.75 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{
          duration: 0.55,
          delay: index * 0.07,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ width: scaleSize, height: scaleSize, padding }}
        className={cn(
          'flex aspect-square max-w-full cursor-default items-center justify-center rounded-[1rem] shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-md transition-shadow duration-300 group-hover/icon:shadow-[0_18px_50px_rgba(0,163,255,0.22)] md:rounded-[1.75rem]',
          className
        )}
      >
        <div className="flex size-full items-center justify-center [&>svg]:size-[62%]">{children}</div>
      </motion.div>
    </div>
  );
}

function Dock({
  className,
  children,
  iconSize = DEFAULT_SIZE,
  iconMagnification = DEFAULT_MAGNIFICATION,
  iconDistance = DEFAULT_DISTANCE,
  direction = 'middle',
  ...props
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const dockHeight = iconMagnification + (iconMagnification > 100 ? 48 : 28);

  return (
    <div
      onMouseMove={(event) => mouseX.set(event.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      style={{ minHeight: dockHeight }}
      className={cn(
        'flex w-full max-w-full min-w-0 items-end gap-3 overflow-hidden rounded-[1.25rem] bg-pill/75 px-2 pb-2 pt-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:overflow-visible md:gap-4 md:rounded-[2rem] md:px-5 md:pb-4 md:pt-10 lg:gap-5',
        direction === 'top' && 'items-start pt-4',
        direction === 'middle' && 'items-end py-3 md:py-4',
        className
      )}
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement<DockIconProps>(child)) {
          return child;
        }

        return React.cloneElement(child, {
          ...child.props,
          mouseX,
          size: iconSize,
          magnification: iconMagnification,
          distance: iconDistance,
          index,
        });
      })}
    </div>
  );
}

export { Dock, DockIcon };
