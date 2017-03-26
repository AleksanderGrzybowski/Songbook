package songbook.song;

import org.junit.Before;
import org.junit.Test;

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
}