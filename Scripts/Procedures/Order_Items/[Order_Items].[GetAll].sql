USE dbSitiCommerce;
GO

IF EXISTS(SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Order_Items].[GetAll]') AND type IN (N'P',N'PC'))
BEGIN
	DROP PROCEDURE [Order_Items].[GetAll];
END;
GO

CREATE PROCEDURE [Order_Items].[GetAll]
	
WITH ENCRYPTION
AS
BEGIN
	SELECT
		id Id,
		order_id Order_Id,
		product_id Product_Id,
		quantity Quatity,
		price Price,
		created_at Created_At,
		updated_at Updated_At
	FROM Order_Items; 
END
GO
EXEC sp_recompile N'[Order_Items].[GetAll]';
GO
