package com.ihub.www.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ihub.www.model.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long>
{

}
