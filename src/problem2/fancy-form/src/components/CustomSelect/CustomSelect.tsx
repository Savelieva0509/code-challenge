import { FC, useState } from 'react';
import { CustomSelectProps } from '../../types';
import styles from './CustomSelect.module.scss';

const CustomSelect: FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === value);

  return (
    <div
      className={styles.customSelectContainer}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={styles.selectedOption}>
        {selectedOption ? (
          <>
            <img
              src={selectedOption.iconUrl}
              alt={selectedOption.label}
              className={styles.icon}
            />
            <span>{selectedOption.label}</span>
          </>
        ) : (
          <span>{placeholder}</span>
        )}
      </div>
      {isOpen && (
        <div className={styles.optionsList}>
          {options.map(option => (
            <div
              key={option.value}
              className={styles.option}
              onClick={() => handleSelect(option.value)}
            >
              <img
                src={option.iconUrl}
                alt={option.label}
                className={styles.icon}
              />
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
