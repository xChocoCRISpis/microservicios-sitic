USE dbSitiCommerce;
GO

SELECT * FROM Stock_Status;
SELECT * FROM vwStockStatus;

IF NOT EXISTS(SELECT 1 FROM Stock_Status WHERE [Key] = 'LOW_STOCK')
BEGIN
	INSERT INTO Stock_Status(Status_Name, [Key])
	VALUES('Low Stock', 'LOW_STOCK');
END;
GO


IF NOT EXISTS(SELECT 1 FROM Stock_Status WHERE [Key]='OUT_OF_STOCK')
BEGIN
	INSERT INTO Stock_Status(status_name,[key])
	VALUES('Out of Stock','OUT_OF_STOCK');
END;
GO

IF NOT EXISTS(SELECT 1 FROM Stock_Status WHERE [Key]='IN_STOCK')
BEGIN
	INSERT INTO Stock_Status(status_name,[key])
	VALUES('In Stock','IN_STOCK');
END;
GO

/*
SELECT * FROM Stock_Status;
ALTER TABLE [dbo].Stock_Status 
*/