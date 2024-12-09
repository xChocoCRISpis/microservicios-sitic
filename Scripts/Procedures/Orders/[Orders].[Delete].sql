USE dbSitiCommerce;
GO

IF EXISTS(SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Orders].[Delete]') AND type IN (N'P',N'PC'))
BEGIN
	DROP PROCEDURE [Orders].[Delete];
END;
GO

CREATE PROCEDURE [Orders].[Delete]
	@Id INT
WITH ENCRYPTION
AS
BEGIN
	DELETE Order_Items
	WHERE order_id = @Id;

	DELETE Orders
	WHERE id = @Id;
END
GO
EXEC sp_recompile N'[Orders].[Delete]';
GO
