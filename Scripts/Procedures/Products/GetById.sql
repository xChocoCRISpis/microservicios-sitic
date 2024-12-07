USE dbSitiCommerce;
GO

IF EXISTS(SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Products].[GetById]'))
BEGIN
	DROP PROCEDURE [Products].[GetById];
END;
GO

CREATE PROCEDURE [Products].[GetById]
	@Id INT
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
	WHERE Products.Id = @Id;
END;
GO
EXEC sp_recompile N'[Products].[GetById]'
GO