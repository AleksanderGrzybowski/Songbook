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
    
    public List<Song> filter(String query) {
        return repository.findByTitleIgnoreCaseContaining(query);
    }
    
    public Optional<Song> findById(long id) {
        return repository.findById(id);
    }
}
