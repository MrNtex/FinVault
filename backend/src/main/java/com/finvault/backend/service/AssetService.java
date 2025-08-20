package com.finvault.backend.service;

import com.finvault.backend.model.Asset;
import com.finvault.backend.repository.AssetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class AssetService {

    @Autowired
    private AssetRepository assetRepository;

    public List<Asset> getAllAssets() {
        return assetRepository.findAll();
    }

    public Asset getAssetById(String assetId) {
        return assetRepository.findById(assetId)
                .orElseThrow(() -> new RuntimeException("Asset not found with id: " + assetId));
    }

    public Asset createAsset(Asset asset) {
        asset.setLastUpdated(java.time.LocalDateTime.now());
        return assetRepository.save(asset);
    }

    public Asset updateAsset(String assetId, Asset assetDetails) {
        Asset asset = getAssetById(assetId);
        
        // Update fields
        asset.setType(assetDetails.getType());
        asset.setQuantityKg(assetDetails.getQuantityKg());
        asset.setQuantity(assetDetails.getQuantity());
        asset.setPricePerKgUSD(assetDetails.getPricePerKgUSD());
        asset.setPricePerUnitUSD(assetDetails.getPricePerUnitUSD());
        asset.setTotalValueUSD(assetDetails.getTotalValueUSD());
        asset.setLocation(assetDetails.getLocation());
        asset.setWalletAddress(assetDetails.getWalletAddress());
        asset.setSymbol(assetDetails.getSymbol());
        asset.setExchange(assetDetails.getExchange());
        asset.setIssuer(assetDetails.getIssuer());
        asset.setFaceValueUSD(assetDetails.getFaceValueUSD());
        asset.setInterestRate(assetDetails.getInterestRate());
        asset.setMaturityDate(assetDetails.getMaturityDate());
        asset.setPurchaseDate(assetDetails.getPurchaseDate());
        asset.setAddress(assetDetails.getAddress());
        asset.setEstimatedValueUSD(assetDetails.getEstimatedValueUSD());
        asset.setAcquiredDate(assetDetails.getAcquiredDate());
        asset.setLastUpdated(java.time.LocalDateTime.now());
        
        return assetRepository.save(asset);
    }

    public void deleteAsset(String assetId) {
        Asset asset = getAssetById(assetId);
        assetRepository.delete(asset);
    }
} 