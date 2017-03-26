package songbook.song;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SongService {
    private final SongRepository repository;
    
    @Autowired
    public SongService(SongRepository repository) {
        this.repository = repository;
    }
    
    public List<Song> list() {
        return repository.findAll();
    }
    
    // there seems to be no other way than adding '%'-s here
    public List<Song> filter(String query) {
        return repository.findByTitleOrTextContaining("%" + query + "%");
    }
    
    public Optional<Song> findById(long id) {
        return repository.findById(id);
    }
    
    public Song create(String title, String text) {
        return repository.save(new Song(null, title, text));
    }
    
    public void delete(long id) {
        Optional<Song> toDelete = repository.findById(id);
        if (toDelete.isPresent()) {
            repository.delete(id);
        } else {
            throw new SongNotFoundException();
        }
    }
}
