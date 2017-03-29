package songbook.song;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import songbook.song.dto.SongWithLyricsDto;

import java.util.List;

import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping("/export")
public class ExportController {
    private final SongService service;
    
    @Autowired
    public ExportController(SongService service) {
        this.service = service;
    }
    
    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<SongWithLyricsDto> export() {
        
        return service.list()
                .stream()
                .map(song -> new SongWithLyricsDto(song.getId(), song.getTitle(), song.getText()))
                .collect(toList());
    }
}
