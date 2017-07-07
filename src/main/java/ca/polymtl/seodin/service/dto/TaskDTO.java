package ca.polymtl.seodin.service.dto;

import ca.polymtl.seodin.domain.Task;

/**
 * A DTO representing a Study, with all its details.
 */
public class TaskDTO {

    private Long id;

    private String tag;

    public TaskDTO() {
        // Empty constructor needed for Jackson.
    }

    public TaskDTO(Task task) {
        this.id= task.getId();
        this.tag = task.getTag();
    }

    public Long getId() {
        return id;
    }

    public String getTag() {
        return tag;
    }
}
