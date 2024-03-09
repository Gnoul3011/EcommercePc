package com.app.ecommerce.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
@Data
@EqualsAndHashCode(callSuper=false)
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "order_information")
public class OrderInformation extends BaseEntity {

    @Column(name = "username", length = 20, nullable = false)
    private String username;

    @Column(name = "fullname", length = 100, nullable = false)
    private String fullname;

    @Column(name = "address", length = 100, nullable = false)
    private String address;

    @Column(name = "note", length = 100, nullable = false)
    private String note;

    @Column(name = "email", length = 60, nullable = false)
    private String email;

    @Column(name = "phone_number", length = 20, nullable = false)
    private String phoneNumber;

    // Mapping
    @OneToOne(optional = false, fetch=FetchType.LAZY)
    @MapsId
    @JsonBackReference
    private AccountOrder accountOrder;
}