'use client';
import Image from 'next/image';

interface SkillIconProps {
  name: string;
}

const SkillIcon = ({ name }: SkillIconProps) => {
  const getIconPath = (skillName: string): string => {
    const normalizedName = skillName.toLowerCase();
    const iconMap: { [key: string]: string } = {
      'react': '/icons/react.svg',
      'next.js': '/icons/nextjs.svg',
      'typescript': '/icons/typescript.svg',
      'node.js': '/icons/nodejs.svg',
      'react native': '/icons/react.svg',
      'mysql': '/icons/mysql.svg',
      'firebase': '/icons/firebase.svg',
      'figma': '/icons/figma.svg'
    };

    return iconMap[normalizedName] || '/icons/default.svg';
  };

  return (
    <div className="absolute top-3 right-3 w-8 h-8">
      <Image
        src={getIconPath(name)}
        alt={`${name} icon`}
        width={32}
        height={32}
        className="pixelated"
      />
    </div>
  );
};

export default SkillIcon;
