package com.app.ecommerce.models;

import java.util.*;

import jakarta.persistence.*;

//baseEntity nền móng cho những model khác.
@MappedSuperclass
public abstract class BaseEntity {

    @Id
    @Column(name = "id", length = 11, nullable = false)
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;

    @Column(name = "created_at")
    @Temporal(TemporalType.DATE) // @Temporal use to get extremely date and time
    private Date created_at;

    @Column(name = "modified_at")
    @Temporal(TemporalType.DATE) // @Temporal use to get extremely date and time
    private Date modified_at;
    @Column(name = "deleted_at")
    @Temporal(TemporalType.DATE)
    private Date deleted_at;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getCreatedAt() {
        return created_at;
    }

    public void setCreatedAt(Date createdAt) {
        this.created_at = createdAt;
    }

    public Date getModified_at() {
        return modified_at;
    }

    public void setModifiedAt(Date modifiedAt) {
        modified_at = modifiedAt;
    }

    public Date getDeletedAt() {
        return deleted_at;
    }

    public void setDeletedAt(Date deletedAt) {
        deleted_at = deletedAt;
    }

    @PrePersist
    protected void onCreate() {
        created_at = new java.util.Date();
    }

    @PreUpdate
    protected void onUpdate() {
        modified_at = new java.util.Date();
    }
}
