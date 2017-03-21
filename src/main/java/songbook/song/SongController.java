package songbook.song;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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
    public List<SongDto> list() {
        return service.list().stream().map(song -> new SongDto(song.getTitle())).collect(toList());
    }
    
    static class SongDto {
        public final String title;
        
        public SongDto(String title) {
            this.title = title;
        }
    }
    
}
