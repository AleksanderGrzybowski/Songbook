package songbook.song;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import songbook.song.dto.SongWithLyricsDto;

import java.util.List;

import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping("/")
public class ImportExportController {
    private final SongService service;
    
    @Autowired
    public ImportExportController(SongService service) {
        this.service = service;
    }
    
    @RequestMapping(value = "/export", method = RequestMethod.GET)
    public List<SongWithLyricsDto> export() {
        return service.list()
                .stream()
                .map(song -> new SongWithLyricsDto(song.getId(), song.getTitle(), song.getText()))
                .collect(toList());
    }
    
    @RequestMapping(value = "/import", method = RequestMethod.POST)
    public ResponseEntity<Void> importSongs(@RequestBody List<SongWithLyricsDto> toImport) {
        service.importSongs(toImport);
        
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
