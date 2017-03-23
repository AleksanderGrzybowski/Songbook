package songbook.song;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SongRepository extends JpaRepository<Song, Long> {
    List<Song> findByTitleIgnoreCaseContaining(String query);
    
    @Query("select s from Song s order by s.title asc")
    List<Song> findAll();
    
    Optional<Song> findById(Long id);
}
