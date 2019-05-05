CREATE DEFINER=`root`@`localhost` PROCEDURE `createGuest`(IN guestID varchar(20), IN guestFName varchar(20), IN guestLName varchar(20), IN guestPhoneNumber char(10), IN guestPassword varchar(72))
BEGIN
INSERT INTO Guest (guestID, guestFname, guestLName, guestPhoneNumber, guestPassword) VALUES (guestID, guestFName, guestLName, guestPhoneNumber, guestPassword);
END;

CREATE DEFINER=`root`@`localhost` PROCEDURE `getGuestPassword`(IN guest_id VARCHAR(20))
BEGIN
	SELECT guestPassword From Guest WHERE guestID = guest_id;
END;

CREATE DEFINER=`root`@`localhost` PROCEDURE `createEmployee`(IN employeeID INT, IN employeeSSN CHAR(9), IN employeeFName VARCHAR(20), IN employeeLName VARCHAR(20), IN employeeDOB VARCHAR(20), IN employeeSalary INT, IN employeePassword VARCHAR(72), IN dno INT)
BEGIN
	INSERT INTO Employee (employeeID, employeeSSN, employeeFName, employeeLName, employeeDOB, employeeSalary, employeePassword, dno) VALUES (employeeID, employeeSSN, employeeFName, employeeLName, employeeDOB, employeeSalary, employeePassword, dno);
END;

CREATE DEFINER=`root`@`localhost` PROCEDURE `getEmployeePassword`(IN employee_ID INT)
BEGIN
	SELECT employeePassword FROM Employee WHERE employeeID = employee_ID;
END;

