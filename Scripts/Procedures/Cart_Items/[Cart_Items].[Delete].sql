USE dbSitiCommerce;
GO

IF EXISTS(SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Cart_Items].[Delete]') AND type IN (N'P',N'PC'))
BEGIN
	DROP PROCEDURE [Cart_Items].[Delete];
END;
GO

CREATE PROCEDURE [Cart_Items].[Delete]
	@Id INT
WITH ENCRYPTION
AS
BEGIN
	DELETE Cart_Items WHERE id = @Id; 
END
GO
EXEC sp_recompile N'[Cart_Items].[Delete]';
GO
