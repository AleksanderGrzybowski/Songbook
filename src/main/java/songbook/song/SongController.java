package songbook.song;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
    
    static class SongDto {
        public final String title;
        
        public final Long id;
        
        public SongDto(String title, Long id) {
            this.title = title;
            this.id = id;
        }
    }
    
}
