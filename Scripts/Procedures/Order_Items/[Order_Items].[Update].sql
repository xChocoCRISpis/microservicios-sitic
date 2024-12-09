USE dbSitiCommerce;
GO

IF EXISTS(SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Order_Items].[Update]') AND type IN (N'P',N'PC'))
BEGIN
	DROP PROCEDURE [Order_Items].[Update];
END;
GO

CREATE PROCEDURE [Order_Items].[Update]
	@Id INT,
	@Quantity INT
WITH ENCRYPTION
AS
BEGIN
	UPDATE Order_Items SET
		quantity = @Quantity,
		price = (SELECT p.price*quantity FROM Products p Join Order_Items oi ON oi.product_id = p.id WHERE oi.id = @Id)
	WHERE id = @Id;
END
GO
EXEC sp_recompile N'[Order_Items].[Update]';
GO