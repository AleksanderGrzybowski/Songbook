package songbook;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import songbook.song.Song;
import songbook.song.SongRepository;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
public class LoadSampleSongsOnStartup implements ApplicationListener<ApplicationReadyEvent> {
    
    private final SongRepository repository;
    
    @Autowired
    public LoadSampleSongsOnStartup(SongRepository repository) {
        this.repository = repository;
    }
    
    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        Arrays.stream(Objects.requireNonNull(
                new File(System.getProperty("user.dir") + "/songs").listFiles()
        )).map(file -> {
            try {
                return new Song(
                        null,
                        FilenameUtils.getBaseName(file.getName()),
                        Files.readAllLines(file.toPath()).stream().collect(Collectors.joining("\n")));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }).forEach(repository::save);
    }
}