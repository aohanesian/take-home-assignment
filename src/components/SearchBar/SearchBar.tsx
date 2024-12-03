import React, { ChangeEvent, FormEvent, memo, useCallback, useState } from "react";
import styles from './SearchBar.module.css'
import { SearchBarProps } from "../../types";

const SearchBar: React.FC<SearchBarProps> = ({
    onSearch,
    loading,
    ariaLabel = 'Characters'
}) => {
    const minLength = 2

    const [inputValue, setInputValue] = useState<string>('');

    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmedTerm = inputValue.trim();
        if (trimmedTerm) {
            onSearch(trimmedTerm);
        }
    }, [inputValue, onSearch]);

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }, []);

    return (
        <div className={styles.search_container}>
            <form onSubmit={handleSubmit} role="search">
                <label htmlFor="searchBar" className={styles.visually_hidden}>
                    {ariaLabel}
                </label>
                <input
                    type="search"
                    id="searchBar"
                    name="searchBar"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder='Enter character name'
                    aria-label='Search Rick and Morty characters'
                    minLength={minLength}
                    maxLength={50}
                    required
                    autoComplete="off"
                />
                <button
                    type="submit"
                    className={styles.search_button}
                    aria-label="Submit search"
                    disabled={inputValue.trim().length < minLength || loading}
                >
                    Search
                </button>
            </form>
        </div>
    );
};

export default memo(SearchBar);