package songbook.song;

import org.junit.Before;
import org.junit.Test;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;

import static java.util.Arrays.asList;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.core.Is.is;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

public class SongControllerTest {
    
    private MockMvc mockMvc;
    private SongService service;
    
    @Before
    public void setup() {
        service = mock(SongService.class);
        mockMvc = standaloneSetup(new SongController(service)).build();
    }
    
    @Test
    public void should_list_all_songs() throws Exception {
        List<Song> songs = asList(new Song("first"), new Song("second"));
        when(service.list()).thenReturn(songs);
        
        mockMvc.perform(MockMvcRequestBuilders.get("/songs"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].title", is("first")))
                .andExpect(jsonPath("$[1].title", is("second")));
        
        verify(service, atLeastOnce()).list();
    }
    
}