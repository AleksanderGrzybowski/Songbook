package songbook.song;

import org.junit.Before;
import org.junit.Test;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.core.Is.is;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

public class SongControllerTest {
    
    private List<Song> songs = asList(
            new Song(1L, "first", "first_text"),
            new Song(2L, "second", "second_text")
    );
    
    private MockMvc mockMvc;
    private SongService service;
    
    @Before
    public void setup() {
        service = mock(SongService.class);
        mockMvc = standaloneSetup(new SongController(service)).build();
    }
    
    @Test
    public void should_list_all_songs() throws Exception {
        when(service.list()).thenReturn(songs);
        
        mockMvc.perform(get("/songs"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].title", is("first")))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[1].title", is("second")))
                .andExpect(jsonPath("$[1].id", is(2)));
        
        verify(service, atLeastOnce()).list();
    }
    
    @Test
    public void should_find_songs_by_part_of_title() throws Exception {
        when(service.filter("first")).thenReturn(singletonList(songs.get(0)));
        
        mockMvc.perform(get("/songs").param("query", "first"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].title", is("first")))
                .andExpect(jsonPath("$[0].id", is(1)));
        
        verify(service, atLeastOnce()).filter("first");
    }
    
    @Test
    public void should_find_and_list_song_with_its_lyrics() throws Exception {
        when(service.findById(1L)).thenReturn(Optional.of(songs.get(0)));
        
        mockMvc.perform(get("/songs/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title", is("first")))
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.text", is("first_text")));
        
        verify(service, atLeastOnce()).findById(1L);
    }
    
    @Test
    public void should_404_if_song_was_not_found() throws Exception {
        when(service.findById(1L)).thenReturn(Optional.empty());
        
        mockMvc.perform(get("/songs/1"))
                .andExpect(status().isNotFound());
        
        verify(service, atLeastOnce()).findById(1L);
    }
}