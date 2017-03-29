package songbook.song;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import songbook.song.exceptions.SongNotFoundException;
import songbook.song.exceptions.ValidationException;

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
        validateTitleAndText(title, text);
        
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
    
    public Song update(long id, String newTitle, String newText) {
        validateTitleAndText(newTitle, newText);
        
        Optional<Song> optionalSong = repository.findById(id);
        
        if (optionalSong.isPresent()) {
            Song song = optionalSong.get();
            song.setTitle(newTitle);
            song.setText(newText);
            return repository.save(song);
        } else {
            throw new SongNotFoundException();
        }
    }
    
    private void validateTitleAndText(String title, String text) {
        ValidationException.builder()
                .add(title != null && !title.isEmpty() && title.length() <= 100,
                        "title", "Title is required (max 100 characters)")
                .add(text != null && !text.isEmpty() && text.length() <= 1000,
                        "text", "Text is required (max 1000 characters)")
                .throwIfErrors();
    }
}
