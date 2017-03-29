import i18n from 'i18next';

const resources = {
    pl: {
        translation: {
            songTitle: 'Tytuł utworu',
            songLyrics: 'Treść utworu',
            createNewSong: 'Utwórz nowy utwór',
            editSong: 'Edytuj utwór',
            save: 'Zapisz',
            search: 'Wyszukaj',
            noResults: 'Brak wyników',
            edit: 'Edytuj',
            'delete': 'Usuń',
            pickSongOrSearch: 'Wybierz z listy lub wyszukaj',
            newSong: 'Nowy utwór'
        }
    }
};
export default i18n.init({
        lng: 'pl',
        // fallbackLng: "en",
        debug: true,
        resources: resources
    }
);
