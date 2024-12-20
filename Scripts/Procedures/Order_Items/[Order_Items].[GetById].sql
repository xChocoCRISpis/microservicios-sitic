USE dbSitiCommerce;
GO

IF EXISTS(SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Order_Items].[GetById]') AND type IN (N'P',N'PC'))
BEGIN
	DROP PROCEDURE [Order_Items].[GetById];
END;
GO

CREATE PROCEDURE [Order_Items].[GetById]
	@Id INT
WITH ENCRYPTION
AS
BEGIN
	SELECT
		id Id,
		order_id Order_Id,
		product_id Product_Id,
		quantity Quantity,
		price Price,
		created_at Created_At,
		updated_at Updated_At
	FROM Order_Items
	WHERE id = @Id; 
END
GO
EXEC sp_recompile N'[Order_Items].[GetById]';
GO