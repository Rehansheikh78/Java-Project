package com.ihub.www.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ihub.www.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long>
{

}
