USE dbSitiCommerce;
GO

IF EXISTS(SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Orders].[GetItems]') AND type IN (N'P',N'PC'))
BEGIN
	DROP PROCEDURE [Orders].[GetItems];
END;
GO

CREATE PROCEDURE [Orders].[GetItems]
	@Id INT
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
	FROM Order_Items oi
	WHERE oi.order_id = @Id;
END
GO
EXEC sp_recompile N'[Orders].[GetItems]';
GO