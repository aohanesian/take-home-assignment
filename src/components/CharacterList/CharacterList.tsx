import React from 'react';
import styles from './CharacterList.module.css'
import cn from "classnames";
import { Character, CharacterListProps } from '../../types';


const CharacterCard: React.FC<{ character: Character }> = ({ character }) => {

    const badgeStyle = cn(styles.status_text, {
        [styles.bg_red]: character.status.toLowerCase() === "dead",
        [styles.bg_green]: character.status.toLowerCase() === "alive",
        [styles.bg_gray]: character.status.toLowerCase() !== "dead" && character.status.toLowerCase() !== "alive",
    });

    return (
        <div className={styles.character_card} key={character.id}>
            <img
                src={character.image}
                alt={`${character.name} from Rick and Morty`}
                loading="lazy"
                className={styles.character_image}
            />
            <p className={badgeStyle}>{character.status}</p>
            <div className={styles.character_info}>
                <h2>{character.name}</h2>
                <p>Last Location</p>
                <p>{character.location.name}</p>
            </div>
        </div>
    );
};

const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
    return (
        <div className={styles.character_grid}>
            {characters.map(character => (
                <CharacterCard key={character.id} character={character} />
            ))}
        </div>
    );
};

export default CharacterList;