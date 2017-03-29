package songbook.song;

import org.junit.Before;
import org.junit.Test;
import songbook.song.dto.SongWithLyricsDto;
import songbook.song.exceptions.SongNotFoundException;
import songbook.song.exceptions.ValidationException;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

public class SongServiceTest {
    
    private List<Song> songs = asList(
            new Song(1L, "first", "first_text"),
            new Song(2L, "second", "second_text")
    );
    
    private SongService service;
    private SongRepository repository;
    
    @Before
    public void setup() {
        repository = mock(SongRepository.class);
        service = new SongService(repository);
    }
    
    @Test
    public void should_list_all_songs() {
        when(repository.findAll()).thenReturn(songs);
        
        List<Song> result = service.list();
        
        assertThat(result).isEqualTo(songs);
        verify(repository, atLeastOnce()).findAll();
    }
    
    @Test
    public void should_find_songs_by_part_of_title() {
        when(repository.findByTitleOrTextContaining("%first%")).thenReturn(singletonList(songs.get(0)));
        
        List<Song> result = service.filter("first");
        
        assertThat(result).isEqualTo(singletonList(songs.get(0)));
        verify(repository, atLeastOnce()).findByTitleOrTextContaining("%first%");
    }
    
    @Test
    public void should_find_song_by_id() {
        when(repository.findById(1L)).thenReturn(Optional.of(songs.get(0)));
        
        Optional<Song> result = service.findById(1L);
        
        assertThat(result).isEqualTo(Optional.of(songs.get(0)));
        verify(repository, atLeastOnce()).findById(1L);
    }
    
    @Test
    public void should_create_and_save_new_song() {
        Song newSong = new Song(null, "new", "new_text");
        when(repository.save(newSong)).thenReturn(newSong);
        
        Song saved = service.create("new", "new_text");
        
        assertThat(saved.getTitle()).isEqualTo("new");
        assertThat(saved.getText()).isEqualTo("new_text");
        
        verify(repository, atLeastOnce()).save(newSong);
    }
    
    @Test(expected = ValidationException.class)
    public void should_not_allow_null_title() {
        service.create(null, "new_text");
    }
    
    @Test(expected = ValidationException.class)
    public void should_not_allow_empty_title() {
        service.create("", "new_text");
    }
    
    @Test(expected = ValidationException.class)
    public void should_not_allow_title_longer_than_100_chars() {
        service.create(createStringOfLength(101), "new_text");
    }
    
    @Test(expected = ValidationException.class)
    public void should_not_allow_null_text() {
        service.create("new", null);
    }
    
    @Test(expected = ValidationException.class)
    public void should_not_allow_empty_text() {
        service.create("new", "");
    }
    
    @Test(expected = ValidationException.class)
    public void should_not_allow_text_longer_than_1000_chars() {
        service.create("new", createStringOfLength(1001));
    }
    
    @Test
    public void should_update_existing_song() {
        Song newSong = new Song(null, "old", "old_text");
        when(repository.findById(1L)).thenReturn(Optional.of(newSong));
        when(repository.save(newSong)).thenReturn(newSong);
        
        Song updated = service.update(1L, "new", "new_text");
        
        assertThat(updated.getTitle()).isEqualTo("new");
        assertThat(updated.getText()).isEqualTo("new_text");
        
        verify(repository, atLeastOnce()).save(newSong);
    }
    
    @Test(expected = SongNotFoundException.class)
    public void should_refuse_to_update_nonexistent_song() {
        when(repository.findById(1L)).thenReturn(Optional.empty());
        
        service.update(1L, "new", "new_text");
    }
    
    @Test
    public void should_delete_song() {
        Song toDelete = new Song(null, "title", "text");
        when(repository.findById(1L)).thenReturn(Optional.of(toDelete));
        service.delete(1L);
        
        verify(repository, atLeastOnce()).delete(1L);
    }
    
    @Test(expected = SongNotFoundException.class)
    public void should_fail_to_delete_nonexistent_song() {
        when(repository.findById(1L)).thenReturn(Optional.empty());
        service.delete(1L);
    }
    
    @Test()
    public void should_remove_all_songs_if_asked_to_import_no_songs() {
        when(repository.findAll()).thenReturn(songs);
        
        service.importSongs(Collections.emptyList());
        
        verify(repository, times(1)).delete(1L);
        verify(repository, times(1)).delete(2L);
    }
    
    @Test()
    public void should_replace_existing_songs_with_the_imported_ones() {
        when(repository.findAll()).thenReturn(songs);
        
        service.importSongs(asList(
                new SongWithLyricsDto(null, "import1", "import1_text"),
                new SongWithLyricsDto(null, "import2", "import2_text"))
        );
        
        verify(repository, times(1)).delete(1L);
        verify(repository, times(1)).delete(2L);
        verify(repository, times(1)).save(new Song(null, "import1", "import1_text"));
        verify(repository, times(1)).save(new Song(null, "import2", "import2_text"));
    }
    
    @Test(expected = ValidationException.class)
    public void should_refuse_to_import_songs_with_errors() {
        service.importSongs(singletonList(new SongWithLyricsDto(null, null, null)));
    }
    
    private String createStringOfLength(int length) {
        return new String(new char[length]).replace('\0', 'X');
    }
}