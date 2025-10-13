package com.backend.printmedianenterprise.Repository;

import com.backend.printmedianenterprise.Entity.MasterSetting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SettingRepository extends JpaRepository<MasterSetting, Long> {
}
