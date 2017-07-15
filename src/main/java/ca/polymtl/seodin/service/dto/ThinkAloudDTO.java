package ca.polymtl.seodin.service.dto;

import ca.polymtl.seodin.domain.ThinkAloud;

import java.time.LocalDate;

/**
 * A DTO representing a Study, with all its details.
 */
public class ThinkAloudDTO {

    private Long id;

    private String tag;

    private String description;

    public ThinkAloudDTO() {
        // Empty constructor needed for Jackson.
    }

    public ThinkAloudDTO(ThinkAloud thinkAloud) {
        this.id = thinkAloud.getId();
        this.tag = thinkAloud.getTag();
        this.description = thinkAloud.getDescription();
    }

    public Long getId() {
        return id;
    }

    public String getTag() {
        return tag;
    }

    public String getDescription() {
        return description;
    }
}
