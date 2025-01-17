import React from "react";
import { HeroIconName, HeroIconsOutline } from "@/types/heroicons-name.model";

interface DynamicIconProps {
  iconName: HeroIconName;
  className?: string;
}

export const DynamicHeroIcons: React.FC<DynamicIconProps> = ({
  iconName,
  className = "size-6 text-white",
}) => {
  const IconComponent = HeroIconsOutline[iconName];

  if (!IconComponent) {
    return <span>Icon not found</span>;
  }

  return <IconComponent aria-hidden="true" className={className} />;
};
