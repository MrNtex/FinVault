package com.finvault.backend.repository;

import com.finvault.backend.model.FlaggedTransaction;
import com.finvault.backend.model.FlaggedStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface FlaggedTransactionRepository extends JpaRepository<FlaggedTransaction, Long> {
    
    // Find by ID - this is already available through JpaRepository.findById()
    
    // Get methods
    List<FlaggedTransaction> findByStatus(FlaggedStatus status);
    List<FlaggedTransaction> findByFlaggedAtBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    // Update methods
    @Modifying
    @Query("UPDATE FlaggedTransaction ft SET ft.status = :status, ft.resolutionNotes = :resolutionNotes WHERE ft.id = :id")
    int updateStatusAndResolution(@Param("id") Long id, @Param("status") FlaggedStatus status, @Param("resolutionNotes") String resolutionNotes);

} 