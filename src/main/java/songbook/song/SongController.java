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
        
        return ((query == null) ? service.list() : service.filter(query))
                .stream()
                .map(song -> new SongDto(song.getTitle(), song.getId()))
                .collect(toList());
    }
    
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<SongWithLyricsDto> listByIdWithLyrics(@PathVariable("id") Long id) {
        Optional<Song> optional = service.findById(id);
        
        if (optional.isPresent()) {
            Song song = optional.get();
            return new ResponseEntity<>(
                    new SongWithLyricsDto(song.getId(), song.getTitle(), song.getText()),
                    HttpStatus.OK
            );
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<SongWithLyricsDto> create(@RequestBody SongWithLyricsDto dto) {
        Song created = service.create(dto.title, dto.text);
        
        return new ResponseEntity<>(
                new SongWithLyricsDto(created.getId(), created.getTitle(), created.getText()),
                HttpStatus.CREATED
        );
    }
    
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<SongWithLyricsDto> update(@PathVariable("id") Long id, @RequestBody SongWithLyricsDto dto) {
        try {
            Song updated = service.update(id, dto.title, dto.text);
            return new ResponseEntity<>(
                    new SongWithLyricsDto(updated.getId(), updated.getTitle(), updated.getText()),
                    HttpStatus.OK
            );
        } catch (SongNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<SongWithLyricsDto> delete(@PathVariable("id") Long id) {
        try {
            service.delete(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (SongNotFoundException e) {
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
        
        public SongWithLyricsDto() {
            super(null, null);
            this.text = null;
        }
    }
    
}
