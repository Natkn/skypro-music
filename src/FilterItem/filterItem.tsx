'use client';

import React, { useRef, useEffect } from 'react';
import styles from './filterItem.module.css';

interface FilterItemProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLDivElement>;
  filterType: string;
}

const FilterItem: React.FC<FilterItemProps> = ({
  children,
  isOpen,
  onClose,
  anchorRef,
  filterType,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, anchorRef]);

  return (
    isOpen && (
      <div
        className={styles.filter__dropdown}
        ref={dropdownRef}
        data-filter-type={filterType}
      >
        {children}
      </div>
    )
  );
};

export default FilterItem;
