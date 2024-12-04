USE dbSitiCommerce;
GO

IF EXISTS(SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Products].[Delete]'))
BEGIN
	DROP PROCEDURE [Products].[Delete];
END;
GO

CREATE PROCEDURE [Products].[Delete]
	@Id INT
WITH ENCRYPTION
AS
BEGIN
	DELETE Products WHERE Id = @Id;
END;
GO
EXEC sp_recompile N'[Products].[Delete]'
GO