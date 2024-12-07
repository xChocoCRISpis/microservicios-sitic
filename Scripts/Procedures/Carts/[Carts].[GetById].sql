USE dbSitiCommerce;
GO

IF EXISTS(SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Carts].[GetById]') AND type IN (N'P',N'PC'))
BEGIN
	DROP PROCEDURE [Carts].[GetById];
END;
GO

CREATE PROCEDURE [Carts].[GetById]
	@Id INT
WITH ENCRYPTION
AS
BEGIN
	SELECT 
		c.id AS Id,
		c.created_at AS Created_At,
		c.updated_at AS Updated_At
	FROM Carts c
	WHERE c.id = @Id;
END
GO
EXEC sp_recompile N'[Carts].[GetById]';
GO
