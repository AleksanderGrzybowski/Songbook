package songbook;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import songbook.song.Song;
import songbook.song.SongRepository;

import static java.util.Arrays.asList;

@Component
public class ApplicationStartup implements ApplicationListener<ApplicationReadyEvent> {
    
    private final SongRepository repository;
    
    @Autowired
    public ApplicationStartup(SongRepository repository) {
        this.repository = repository;
    }
    
    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        asList(
                "My mamy wizję",
                "Alleluja chwalcie Pana",
                "Chcemy Ciebie wielbić",
                "Choć, to czas by wielbić",
                "Łaska Twoja",
                "Nie mam nic",
                "Stwórz serce czyste"
        ).forEach(title -> repository.save(new Song(title, title + "_text")));
    }
}