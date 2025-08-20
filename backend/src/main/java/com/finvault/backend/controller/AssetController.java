package com.finvault.backend.controller;

import com.finvault.backend.model.Asset;
import com.finvault.backend.service.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/assets")
@CrossOrigin(origins = "http://localhost:4200")
public class AssetController {

    @Autowired
    private AssetService assetService;

    @GetMapping
    public ResponseEntity<List<Asset>> getAllAssets() {
        List<Asset> assets = assetService.getAllAssets();
        return ResponseEntity.ok(assets);
    }

    @GetMapping("/{assetId}")
    public ResponseEntity<Asset> getAssetById(@PathVariable String assetId) {
        Asset asset = assetService.getAssetById(assetId);
        return ResponseEntity.ok(asset);
    }

    @PostMapping
    public ResponseEntity<Asset> createAsset(@RequestBody Asset asset) {
        Asset createdAsset = assetService.createAsset(asset);
        return ResponseEntity.ok(createdAsset);
    }

    @PutMapping("/{assetId}")
    public ResponseEntity<Asset> updateAsset(
            @PathVariable String assetId,
            @RequestBody Asset assetDetails) {
        Asset updatedAsset = assetService.updateAsset(assetId, assetDetails);
        return ResponseEntity.ok(updatedAsset);
    }

    @DeleteMapping("/{assetId}")
    public ResponseEntity<Void> deleteAsset(@PathVariable String assetId) {
        assetService.deleteAsset(assetId);
        return ResponseEntity.noContent().build();
    }
} 