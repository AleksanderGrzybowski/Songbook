package songbook;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import songbook.song.Song;
import songbook.song.SongRepository;

import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.stream.IntStream;

@Component
public class ApplicationStartup implements ApplicationListener<ApplicationReadyEvent> {
    
    private final SongRepository repository;
    
    @Autowired
    public ApplicationStartup(SongRepository repository) {
        this.repository = repository;
    }
    
    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        SecureRandom random = new SecureRandom();
        
        IntStream.rangeClosed(1, 10).forEach(i ->
                repository.save(new Song("" + i + "_" + new BigInteger(130, random).toString(32)))
        );
    }
}