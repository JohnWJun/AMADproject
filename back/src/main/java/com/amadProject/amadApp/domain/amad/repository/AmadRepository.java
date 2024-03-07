package com.amadProject.amadApp.domain.amad.repository;

import com.amadProject.amadApp.domain.amad.entity.Amad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.Optional;

public interface AmadRepository extends JpaRepository<Amad,Long> {
    @Query(value = "SELECT a FROM Amad a where a.member.id = :memberId AND a.publishedDate = :writtenDate")
    Optional<Amad> findByDateNMemberId(LocalDate writtenDate, long memberId);
}
