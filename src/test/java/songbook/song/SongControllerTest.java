package songbook.song;

import org.junit.Before;
import org.junit.Test;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.List;

import static java.util.Collections.singletonList;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.core.Is.is;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

public class SongControllerTest {
    
    private List<Song> songs = new ArrayList<>();
    private MockMvc mockMvc;
    private SongService service;
    
    public SongControllerTest() {
        Song song = new Song("first");
        song.setId(1L);
        songs.add(song);
        
        song = new Song("second");
        song.setId(2L);
        songs.add(song);
    }
    
    @Before
    public void setup() {
        service = mock(SongService.class);
        mockMvc = standaloneSetup(new SongController(service)).build();
    }
    
    @Test
    public void should_list_all_songs() throws Exception {
        when(service.list()).thenReturn(songs);
        
        mockMvc.perform(MockMvcRequestBuilders.get("/songs"))
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
        
        mockMvc.perform(MockMvcRequestBuilders.get("/songs").param("query", "first"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].title", is("first")))
                .andExpect(jsonPath("$[0].id", is(1)));
        
        verify(service, atLeastOnce()).filter("first");
    }
    
}