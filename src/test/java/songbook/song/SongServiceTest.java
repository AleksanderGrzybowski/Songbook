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
    
    private List<Song> songs = asList(new Song("first", "first_text"), new Song("second", "second_text"));
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
        when(repository.findByTitleIgnoreCaseContaining("first")).thenReturn(singletonList(songs.get(0)));
        
        List<Song> result = service.filter("first");
        
        assertThat(result).isEqualTo(singletonList(songs.get(0)));
        verify(repository, atLeastOnce()).findByTitleIgnoreCaseContaining("first");
    }
    
    @Test
    public void should_find_song_by_id() {
        Song sampleSong = new Song("first", "first_text");
        sampleSong.setId(1L);
        
        when(repository.findById(1L)).thenReturn(Optional.of(sampleSong));
        
        Optional<Song> result = service.findById(1L);
        
        assertThat(result).isEqualTo(Optional.of(sampleSong));
        verify(repository, atLeastOnce()).findById(1L);
    }
    
}