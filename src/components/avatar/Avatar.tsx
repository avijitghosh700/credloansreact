import { useMemo } from 'react';
import type { TUser } from '../../shared/types/auth.type';

type AvatarProps = {
  user: TUser;
};

const Avatar = ({ user }: AvatarProps) => {
  // Generate a random color in hexadecimal format
  const randomColor = useMemo(
    () => Math.floor(Math.random() * 16777215).toString(16),
    [],
  );

  // Calculate text color based on background color brightness
  const textColor = useMemo(() => {
    // Extract RGB components from hex color
    const r = parseInt(randomColor.slice(0, 2), 16);
    const g = parseInt(randomColor.slice(2, 4), 16);
    const b = parseInt(randomColor.slice(4, 6), 16);
    
    // Calculate relative luminance using weighted RGB values
    // Formula: (0.299*R + 0.587*G + 0.114*B) / 255
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Choose black or white text based on luminance
    // If luminance > 0.5, background is light, use black text
    // If luminance <= 0.5, background is dark, use white text
    return luminance > 0.5 ? '#000000' : '#ffffff';
  }, [randomColor]);

  return (
    <div
      className="avatar h-8 w-8 rounded-full 
      border border-slate-700 border-spacing-1 
      grid place-content-center"
      style={{ backgroundColor: `#${randomColor}`, color: textColor }}
    >
      {(user.firstName ?? user.email).charAt(0).toUpperCase()}
    </div>
  );
};

export default Avatar;
