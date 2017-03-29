package songbook.song;

import com.google.gson.Gson;
import org.junit.Before;
import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import songbook.song.dto.SongWithLyricsDto;
import songbook.song.exceptions.ValidationException;

import java.util.List;

import static java.util.Arrays.asList;
import static java.util.Collections.emptyList;
import static java.util.Collections.singletonList;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.core.Is.is;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

public class ImportExportControllerTest {
    
    private Gson gson = new Gson();
    
    private List<Song> songs = asList(
            new Song(1L, "first", "first_text"),
            new Song(2L, "second", "second_text")
    );
    
    private MockMvc mockMvc;
    private SongService service;
    
    @Before
    public void setup() {
        service = mock(SongService.class);
        mockMvc = standaloneSetup(new ImportExportController(service))
                .setControllerAdvice(new ValidationExceptionHandlerController())
                .build();
    }
    
    @Test
    public void should_export_all_songs_with_lyrics() throws Exception {
        when(service.list()).thenReturn(songs);
        
        mockMvc.perform(get("/export"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].title", is("first")))
                .andExpect(jsonPath("$[0].text", is("first_text")))
                .andExpect(jsonPath("$[1].id", is(2)))
                .andExpect(jsonPath("$[1].title", is("second")))
                .andExpect(jsonPath("$[1].text", is("second_text")));
        
        verify(service, atLeastOnce()).list();
    }
    
    @Test
    public void should_import_valid_songs() throws Exception {
        when(service.list()).thenReturn(songs);
        
        List<SongWithLyricsDto> toImport = singletonList(new SongWithLyricsDto(null, "new", "new_text"));
        mockMvc.perform(
                post("/import")
                        .content(gson.toJson(toImport))
                        .contentType(MediaType.APPLICATION_JSON)
        )
                .andExpect(status().isOk());
        
        verify(service, times(1)).importSongs(toImport);
    }
    
    @Test
    public void should_refuse_to_import_invalid_songs() throws Exception {
        List<SongWithLyricsDto> toImport = emptyList();
        doThrow(ValidationException.builder().build()).when(service).importSongs(toImport);
        
        mockMvc.perform(
                post("/import")
                        .content(gson.toJson(toImport))
                        .contentType(MediaType.APPLICATION_JSON)
        )
                .andExpect(status().isBadRequest());
        
        verify(service, times(1)).importSongs(toImport);
    }
}
