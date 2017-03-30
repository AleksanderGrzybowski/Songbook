import i18n from 'i18next';

const polish = {
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
    newSong: 'Nowy utwór',
    importSongs: 'Import',
    selectImportFile: 'Wybierz plik',
    performImport: 'Zaimportuj',
    importFileSummary: 'Wielkość: {{size}}B, ilość utworów: {{count}}',
    importError: 'Błąd importu, sprawdź czy plik jest poprawny',
    importWarning: 'Zaimportowanie spowoduje całkowite zastąpienie istniejących danych!',
    fileNotRecognized: 'Plik nierozpoznany',
    areYouSure: 'Czy jesteś pewien?',
    confirmation: 'Potwierdź',
    goBack: 'Powrót'
};

export default i18n.init({lng: 'pl', resources: {pl: {translation: polish}}});
