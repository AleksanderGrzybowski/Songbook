package songbook.song;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Song {
    
    @Id
    @GeneratedValue
    private Long id;
    
    private String title;
    
    @Column(length = 10000)
    private String text;
    
    @SuppressWarnings("unused")
    public Song() {
    }
    
    public Song(Long id, String title, String text) {
        this.id = id;
        this.title = title;
        this.text = text;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getText() {
        return text;
    }
    
    public void setText(String text) {
        this.text = text;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        
        Song song = (Song) o;
        
        return title.equals(song.title) && text.equals(song.text);
    }
    
    @Override
    public int hashCode() {
        int result = title.hashCode();
        result = 31 * result + text.hashCode();
        return result;
    }
}
