USE dbSitiCommerce;
GO

IF EXISTS(SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Carts].[GetAll]') AND type IN (N'P',N'PC'))
BEGIN
	DROP PROCEDURE [Carts].[GetAll];
END;
GO

CREATE PROCEDURE [Carts].[GetAll]

WITH ENCRYPTION
AS
BEGIN
	SELECT 
		c.id AS Id,
		c.created_at AS Created_At,
		c.updated_at AS Updated_At
	FROM Carts c
END
GO
EXEC sp_recompile N'[Carts].[GetAll]';
GO
