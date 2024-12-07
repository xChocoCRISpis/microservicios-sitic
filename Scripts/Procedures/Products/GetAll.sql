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
		Id AS 'Id',
		[Name] AS 'Name',
		[Description] AS 'Description',
		Price AS 'Price',
		current_stock AS 'CurrentStock',
		Max_Stock AS 'MaxStock',
		Min_Stock AS 'MinStock',
		stock_status_id AS 'StockStatus',
		Image_Path AS 'ImagePath',
		Created_At AS 'CreatedAt',
		Update_At AS 'UpdatedAt'
	FROM Products
END;
GO
EXEC sp_recompile N'[Products].[GetAll]'
GO