USE dbSitiCommerce;
GO

IF EXISTS(SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Orders].[GetAll]') AND type IN (N'P',N'PC'))
BEGIN
	DROP PROCEDURE [Orders].[GetAll];
END;
GO

CREATE PROCEDURE [Orders].[GetAll]
WITH ENCRYPTION
AS
BEGIN
	SELECT 
		o.id AS Id,
		o.total_price AS Total_Price,
		o.[status] AS Status,
		o.created_at AS Created_At,
		o.updated_at AS Updated_At
	FROM Orders o;
END
GO
EXEC sp_recompile N'[Orders].[GetAll]';
GO