package songbook.song;

import com.google.gson.Gson;
import org.junit.Before;
import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import songbook.song.dto.SongWithLyricsDto;
import songbook.song.exceptions.SongNotFoundException;
import songbook.song.exceptions.ValidationException;

import java.util.List;
import java.util.Optional;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.core.Is.is;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
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
    private Gson gson = new Gson();
    
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
    
    @Test
    public void should_create_valid_song() throws Exception {
        Song newSong = new Song(1L, "new", "new_text");
        when(service.create("new", "new_text")).thenReturn(newSong);
        
        SongWithLyricsDto dto = new SongWithLyricsDto(null, "new", "new_text");
        mockMvc.perform(
                post("/songs")
                        .content(gson.toJson(dto))
                        .contentType(MediaType.APPLICATION_JSON)
        )
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title", is("new")))
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.text", is("new_text")));
        
        verify(service, atLeastOnce()).create("new", "new_text");
    }
    
    @Test
    public void should_update_existing_song() throws Exception {
        Song newSong = new Song(1L, "new", "new_text");
        when(service.update(1L, "new", "new_text")).thenReturn(newSong);
        
        SongWithLyricsDto dto = new SongWithLyricsDto(null, "new", "new_text");
        mockMvc.perform(
                put("/songs/1")
                        .content(gson.toJson(dto))
                        .contentType(MediaType.APPLICATION_JSON)
        )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title", is("new")))
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.text", is("new_text")));
        
        verify(service, atLeastOnce()).update(1L, "new", "new_text");
    }
    
    @Test
    public void should_refuse_to_update_nonexistent_song() throws Exception {
        doThrow(new SongNotFoundException()).when(service).update(1L, "new", "new_text");
        SongWithLyricsDto dto = new SongWithLyricsDto(1L, "new", "new_text");
        mockMvc.perform(
                put("/songs/1")
                        .content(gson.toJson(dto))
                        .contentType(MediaType.APPLICATION_JSON)
        )
                .andExpect(status().isNotFound());
        
        verify(service, atLeastOnce()).update(1L, "new", "new_text");
    }
    
    @Test
    public void should_delete_existing_song() throws Exception {
        mockMvc.perform(delete("/songs/1"))
                .andExpect(status().isNoContent());
        
        verify(service, atLeastOnce()).delete(1L);
    }
    
    @Test
    public void should_refuse_to_delete_nonexistent_song() throws Exception {
        doThrow(new SongNotFoundException()).when(service).delete(1L);
        mockMvc.perform(delete("/songs/1"))
                .andExpect(status().isNotFound());
        
        verify(service, atLeastOnce()).delete(1L);
    }
    
    @Test
    public void should_return_BAD_REQUEST_when_validation_exception_is_thrown() throws Exception {
        when(service.list()).thenThrow(ValidationException.builder()
                .add("someField1", "some message 1")
                .add("someField2", "some message 2")
                .build()
        );
        
        mockMvc.perform(get("/songs"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors", hasSize(2)))
                .andExpect(jsonPath("$.errors[0].field", is("someField1")))
                .andExpect(jsonPath("$.errors[0].message", is("some message 1")))
                .andExpect(jsonPath("$.errors[1].field", is("someField2")))
                .andExpect(jsonPath("$.errors[1].message", is("some message 2")));
    }
}