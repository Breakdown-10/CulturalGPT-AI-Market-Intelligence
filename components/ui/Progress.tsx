
import React from 'react';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(({ className, value, ...props }, ref) => {
    const safeValue = value ?? 0;
    return (
        <div
            ref={ref}
            className={`relative h-2 w-full overflow-hidden rounded-full bg-primary/20 ${className}`}
            {...props}
        >
            <div
                className="h-full w-full flex-1 bg-primary transition-all"
                style={{ transform: `translateX(-${100 - safeValue}%)` }}
            />
        </div>
    );
});
Progress.displayName = "Progress";

export default Progress;
