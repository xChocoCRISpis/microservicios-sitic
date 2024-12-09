USE dbSitiCommerce;
GO

IF EXISTS(SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Order_Items].[Delete]') AND type IN (N'P',N'PC'))
BEGIN
	DROP PROCEDURE [Order_Items].[Delete];
END;
GO

CREATE PROCEDURE [Order_Items].[Delete]
	@Id INT
WITH ENCRYPTION
AS
BEGIN

	UPDATE Orders SET total_price = total_price-(SELECT price FROM Order_Items WHERE @Id = id);
	DELETE Order_Items WHERE id = @Id;

END
GO
EXEC sp_recompile N'[Order_Items].[Delete]';
GO