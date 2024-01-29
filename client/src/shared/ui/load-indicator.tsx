// Basics
import { Loader2 } from 'lucide-react';

// Spinning loading indicator
export const LoadIndicator = ({ ...props }) => <Loader2 {...props} className={`h-6 w-6 animate-spin ${props.className}`} />
