package songbook.song;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SongRepository extends JpaRepository<Song, Long> {
    
    @Query("select s from Song s where lower(s.title) like lower(:query) or lower(s.text) like lower(:query)")
    List<Song> findByTitleOrTextContaining(@Param("query") String query);
    
    @Query("select s from Song s order by s.title asc")
    List<Song> findAll();
    
    Optional<Song> findById(Long id);
}
