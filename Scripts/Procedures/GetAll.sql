USE dbSitiCommerce;
GO

IF EXISTS(SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Products].[GetAll]'))
BEGIN
	DROP PROCEDURE [Products].[GetAll];
END;
GO

CREATE PROCEDURE [Products].[GetAll]
WITH ENCRYPTION
AS
BEGIN
	SELECT 
		[Name] AS 'Name',
		[Description] AS 'Description',
		Price AS 'Price',
		Max_Stock AS 'MaxStock',
		Mix_Stock AS 'MinStock',
		Stock_Status AS 'StockStatus',
		Image_Path AS 'ImagePath',
		Created_At AS 'CreatedAt',
		Update_At AS 'Update_At'
	FROM Products
END;
GO
EXEC sp_recompile N'[Products].[GetAll]'
GO