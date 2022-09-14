import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import './AutoComplete.css';

export type Data = {
  id: number;
  name: string;
};

export type AutoCompleteProps<T extends Data> = {
  id: string;
  label?: string;
  data: T[];
  onSelect?: (selectedItem: T) => void;
  onSearch: (query: string) => void;
};

export const AutoCompleteField = <T extends Data>(
  props: AutoCompleteProps<T>
) => {
  const [inputValue, setInputValue] = useState('');
  const [displayedValue, setDisplayedValue] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<T | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const debouncedInputValue = useDebounce(inputValue);

  const { id, label, data, onSearch, onSelect } = props;

  useEffect(() => {
    onSearch(debouncedInputValue);
  }, [debouncedInputValue]);

  useEffect(() => {
    const handleOnClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOnClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleOnClickOutside);
    };
  }, []);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (selectedValue && event.target.value !== selectedValue.name) {
      setSelectedValue(null);
    }
    setDisplayedValue(event.target.value);
  };

  const handleOnFocus = () => {
    const query = selectedValue ? selectedValue.name : inputValue;
    onSearch(query);
    setOpen(true);
  };

  const handleOnSelect = (selecttedItem: T) => {
    setSelectedValue(selecttedItem);
    setDisplayedValue(selecttedItem.name);
    setOpen(false);

    if (typeof onSelect === 'function') {
      onSelect(selecttedItem);
    }
  };

  const highlightMatchingText = (orginalText: string) => {
    if (displayedValue) {
      const chars = orginalText.split(new RegExp(`(${displayedValue})`, 'gi'));

      return (
        <>
          {chars.map((ch, i) => (
            <span key={i}>
              {ch.toLocaleLowerCase() === displayedValue.toLocaleLowerCase() ? (
                <mark>{ch}</mark>
              ) : (
                ch
              )}
            </span>
          ))}
        </>
      );
    }
    return <span>{orginalText}</span>;
  };

  return (
    <div className="autocompleteContainer" ref={containerRef}>
      <div className="inputContainer">
        {label && <label htmlFor={id}>{label}</label>}
        <input
          id={id}
          onChange={handleOnChange}
          value={displayedValue}
          onFocus={handleOnFocus}
          className="inputField"
        />

        {open && data.length > 0 && (
          <div className="dropDownContainer">
            <ul>
              {data.map((item) => (
                <li
                  key={item.id}
                  role="button"
                  onClick={() => handleOnSelect(item)}
                  className={`listItem ${
                    selectedValue?.id === item.id ? 'active' : ''
                  }`}
                >
                  {highlightMatchingText(item.name)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
