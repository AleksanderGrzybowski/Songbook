package songbook.song;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping("/songs")
public class SongController {
    private final SongService service;
    
    @Autowired
    public SongController(SongService service) {
        this.service = service;
    }
    
    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<SongDto> list(@RequestParam(value = "query", required = false) String query) {
        List<Song> songs = (query == null) ? service.list() : service.filter(query);
        
        return songs.stream().map(song -> new SongDto(song.getTitle(), song.getId())).collect(toList());
    }
    
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<SongWithLyricsDto> listByIdWithLyrics(@PathVariable("id") Long id) {
        Optional<Song> song = service.findById(id);
        if (song.isPresent()) {
            return new ResponseEntity<>(
                    new SongWithLyricsDto(song.get().getId(), song.get().getTitle(), song.get().getText()),
                    HttpStatus.OK
            );
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    static class SongDto {
        public final String title;
        
        public final Long id;
        
        public SongDto(String title, Long id) {
            this.title = title;
            this.id = id;
        }
    }
    
    static class SongWithLyricsDto extends SongDto {
        
        public final String text;
        
        public SongWithLyricsDto(Long id, String title, String text) {
            super(title, id);
            this.text = text;
        }
    }
    
}
